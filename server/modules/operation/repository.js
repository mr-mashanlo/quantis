export class OperationRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async count( where, tx = this.#prisma ) {
    return await tx.operation.count( { where } );
  };

  async create( data, tx = this.#prisma ) {
    return await tx.operation.create( { data } );
  };

  async delete( where, tx = this.#prisma ) {
    return await tx.operation.delete( { where } );
  };

  async find( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) {
    return await tx.operation.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip,
      include: {
        fromDepartment: true,
        toDepartment: true,
        toPatient: true
      }
    } );
  };

  async findById( id, tx = this.#prisma ) {
    return await tx.operation.findUnique( {
      where: { id },
      include: {
        fromDepartment: true,
        toDepartment: true,
        toPatient: true
      }
    } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.operation.update( { where, data } );
  };

}
