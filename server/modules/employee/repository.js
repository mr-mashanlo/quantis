export class EmployeeRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async count( where, tx = this.#prisma ) {
    return await tx.employee.count( { where } );
  };

  async create( data, tx = this.#prisma ) {
    return await tx.employee.create( { data } );
  };

  async delete( where, tx = this.#prisma ) {
    return await tx.employee.delete( { where } );
  };

  async find( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) {
    return await tx.employee.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  async findById( id, tx = this.#prisma ) {
    return await tx.employee.findUnique( { where: { id } } );
  };

  async findByUserId( id, tx = this.#prisma ) {
    return await tx.employee.findUnique( { where: { userId: id } } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.employee.update( {
      where,
      data
    } );
  };

}
