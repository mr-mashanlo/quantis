export class TransactionRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async count( where, tx = this.#prisma ) {
    return await tx.transaction.count( { where } );
  };

  async create( data, tx = this.#prisma ) {
    return await tx.transaction.create( { data } );
  };

  async delete( where, tx = this.#prisma ) {
    return await tx.transaction.delete( { where } );
  };

  async find( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) {
    return await tx.transaction.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip,
      include: {
        medication: true
      }
    } );
  };

  async findById( id, tx = this.#prisma ) {
    return await tx.transaction.findUnique( { where: { id } } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.transaction.update( { where, data } );
  };

}
