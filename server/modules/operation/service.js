import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class OperationService {

  #prisma;
  #operationRepository;
  #transactionRepository;
  #balanceRepository;

  constructor( prisma, operationRepository, transactionRepository, balanceRepository ) {
    this.#prisma = prisma;
    this.#operationRepository = operationRepository;
    this.#transactionRepository = transactionRepository;
    this.#balanceRepository = balanceRepository;
  };

  async createOperation( { transactions: transactionsDto, createdById, ...body } ) {
    return await this.#prisma.$transaction( async tx => {
      const createdAt = new Date();
      const operation = await this.#operationRepository.create( { createdAt, createdById, ...body }, tx );

      const transactionEntities = transactionsDto.reduce( ( acc, transaction ) => {
        const base = {
          ...transaction,
          operationId: operation.id,
          createdAt, createdById
        };
        return [ ...acc, { ...base, type: 'DEBIT' }, { ...base, type: 'CREDIT' } ];
      }, [] );

      const transactions = await this.#transactionRepository.create( transactionEntities, tx );

      const balanceEntities = transactions.reduce( ( acc, transaction ) => {
        const base = {
          operationId: transaction.operationId,
          departmentId: transaction.type === 'DEBIT' ? operation.fromDepartmentId : operation.toDepartmentId,
          medicationId: transaction.medicationId,
          amount: transaction.type === 'DEBIT' ? -transaction.amount : transaction.amount
        };
        return transaction.type === 'DEBIT' ? [ ...acc, base ] : body.toDepartmentId ? [ ...acc, base ] : acc;
      }, [] );

      await this.#balanceRepository.create( balanceEntities, tx );

      return operation;
    } );
  };

  async getOperations( query = {} ) {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#operationRepository.find( {
      filters,
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#operationRepository.count( filters );
    return { data, total, ...pagination };
  };

  async getOperationById( id ) {
    return await this.#operationRepository.findById( id );
  };

  async updateOperationById( id, body ) {
    return await this.#prisma.$transaction( async tx => {
      const operation = await this.#operationRepository.update( { id }, body, tx );
      const transactions = await this.#transactionRepository.find( { filters: { operationId: id } }, tx );

      const balanceEntities = transactions.reduce( ( acc, transaction ) => {
        const base = {
          operationId: transaction.operationId,
          departmentId: transaction.type === 'DEBIT' ? operation.fromDepartmentId : operation.toDepartmentId,
          medicationId: transaction.medicationId,
          amount: body.status === 'COMPLETED' ? transaction.type === 'DEBIT' ? -transaction.amount : transaction.amount : transaction.type === 'DEBIT' ? transaction.amount : -transaction.amount
        };
        return transaction.type === 'DEBIT' ? [ ...acc, base ] : operation.toDepartmentId ? [ ...acc, base ] : acc;
      }, [] );

      await this.#balanceRepository.create( balanceEntities, tx );

      return operation;
    } );
  };

}
