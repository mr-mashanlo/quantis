import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class DepartmentService {

  #departmentRepository;

  constructor( departmentRepository ) {
    this.#departmentRepository = departmentRepository;
  };

  async createDepartment( body ) {
    return await this.#departmentRepository.create( body );
  };

  async deleteDepartment( query ) {
    await this.#departmentRepository.delete( query );
  };

  async getDepartments( query = {} ) {
    const { search, ...filters } = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#departmentRepository.find( {
      filters: { ...filters, ...search },
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#departmentRepository.count( filters );
    return { data, total, ...pagination };
  };

  async getDepartmentById( id ) {
    return await this.#departmentRepository.findById( id );
  };

  async updateDepartmentById( id, body ) {
    return await this.#departmentRepository.update( { id }, body );
  };

};
