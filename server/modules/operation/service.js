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

  async createOperation( { transactions, createdById, ...body } ) {
    return await this.#prisma.$transaction( async tx => {
      const createdAt = new Date();
      const operation = await this.#operationRepository.create( { createdAt, createdById, ...body }, tx );

      const credit = transactions.map( transaction => ( { ...transaction, type: 'CREDIT', operationId: operation.id, createdAt, createdById } ) );
      const debit = transactions.map( transaction => ( { ...transaction, type: 'DEBIT', operationId: operation.id, createdAt, createdById } ) );

      await this.#transactionRepository.create( credit, tx );
      await this.#transactionRepository.create( debit, tx );

      const fromValues = transactions.map( transaction => ( {
        operationId: operation.id,
        departmentId: body.fromDepartmentId,
        medicationId: transaction.medicationId,
        amount: -transaction.amount
      } ) );

      const toValues = transactions.map( transaction => ( {
        operationId: operation.id,
        departmentId: body.toDepartmentId,
        medicationId: transaction.medicationId,
        amount: transaction.amount
      } ) );

      await this.#balanceRepository.create( fromValues, tx );
      body.toDepartmentId ? await this.#balanceRepository.create( toValues, tx ) : null;
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
    return await this.#operationRepository.update( { id }, body );
  };

};
