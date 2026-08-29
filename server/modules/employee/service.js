import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class EmployeeService {

  #employeeRepository;

  constructor( employeeRepository ) {
    this.#employeeRepository = employeeRepository;
  };

  async createEmployee( body ) {
    return await this.#employeeRepository.create( body );
  };

  async deleteEmployee( query ) {
    await this.#employeeRepository.delete( query );
  };

  async getEmployees( query = {} ) {
    const { search, ...filters } = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#employeeRepository.find( {
      filters: { ...filters, ...search },
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#employeeRepository.count( filters );
    return { data, total, ...pagination };
  };

  async getEmployeeById( id ) {
    return await this.#employeeRepository.findById( id );
  };

  async updateEmployeeById( id, body ) {
    return await this.#employeeRepository.update( { id }, body );
  };

};
