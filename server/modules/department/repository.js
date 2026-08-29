export class DepartmentRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async count( where, tx = this.#prisma ) {
    return await tx.department.count( { where } );
  };

  async create( data, tx = this.#prisma ) {
    return await tx.department.create( { data } );
  };

  async delete( where, tx = this.#prisma ) {
    return await tx.department.delete( { where } );
  };

  async find( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) {
    return await tx.department.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  async findById( id, tx = this.#prisma ) {
    return await tx.department.findUnique( { where: { id } } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.department.update( { where, data } );
  };

}
