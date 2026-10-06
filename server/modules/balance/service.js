import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class BalanceService {

  #balanceRepository;

  constructor( balanceRepository ) {
    this.#balanceRepository = balanceRepository;
  };

  async getBalances( query = {} ) {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#balanceRepository.find( {
      filters,
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#balanceRepository.count( filters );
    return { data, total, ...pagination };
  };

};
