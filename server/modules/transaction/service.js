import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class TransactionService {

  #transactionRepository;

  constructor( transactionRepository ) {
    this.#transactionRepository = transactionRepository;
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

};
