import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class OperationService {

  #operationRepository;

  constructor( operationRepository ) {
    this.#operationRepository = operationRepository;
  };

  async createOperation( body ) {
    return await this.#operationRepository.create( body );
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
