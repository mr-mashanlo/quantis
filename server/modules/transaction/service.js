import crypto from 'node:crypto';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class TransactionService {

  #prisma;
  #transactionRepository;

  constructor( prisma, transactionRepository ) {
    this.#prisma = prisma;
    this.#transactionRepository = transactionRepository;
  };

  async createTransaction( { amount, medicationId, fromDepartmentId, toDepartmentId, toPatientId, createdBy } ) {
    return await this.#prisma.$transaction( async tx => {
      const toFuckId = toDepartmentId ? { toDepartmentId } : { toPatientId };
      const operationId = crypto.randomUUID( { version: 7 } );
      const credit = await this.#transactionRepository.create( { operationId, amount: amount / -1, medicationId, departmentId: fromDepartmentId, type: 'CREDIT', createdBy }, tx );
      const debit = await this.#transactionRepository.create( { operationId, amount, medicationId, type: 'DEBIT', createdBy, ...toFuckId }, tx );
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
