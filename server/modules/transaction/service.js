import crypto from 'node:crypto';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class TransactionService {

  #prisma;
  #transactionRepository;

  constructor( prisma, transactionRepository ) {
    this.#prisma = prisma;
    this.#transactionRepository = transactionRepository;
  };

  async createTransaction( body ) {
    return await this.#prisma.$transaction( async tx => {
      const operationId = crypto.randomUUID( { version: 7 } );
      const createdAt = new Date();
      const credits = body.map( ( { createdBy, amount, medicationId, fromDepartmentId } ) => ( { operationId, createdAt, createdBy, amount, medicationId, type: 'DEBIT', departmentId: fromDepartmentId } ) );
      const debits = body.map( ( { createdBy, amount, medicationId, toDepartmentId, toPatientId } ) => ( { operationId, createdAt, createdBy, amount, medicationId, type: 'CREDIT', departmentId: toDepartmentId, patientId: toPatientId } ) );
      const credit = await this.#transactionRepository.create( credits, tx );
      const debit = await this.#transactionRepository.create( debits, tx );
      return { credit, debit };
    } );
  };

  async deleteTransaction( query ) {
    await this.#transactionRepository.delete( query );
  };

  async getTransactions( query = {} ) {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#transactionRepository.find( {
      filters,
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#transactionRepository.count( filters );
    return { data, total, ...pagination };
  };

  async getTransactionById( id ) {
    return await this.#transactionRepository.findById( id );
  };

  async updateTransactionById( id, body ) {
    return await this.#transactionRepository.update( { id }, body );
  };

};
