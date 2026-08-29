export class MedicationRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async count( where, tx = this.#prisma ) {
    return await tx.medication.count( { where } );
  };

  async create( data, tx = this.#prisma ) {
    return await tx.medication.create( { data } );
  };

  async delete( where, tx = this.#prisma ) {
    return await tx.medication.delete( { where } );
  };

  async find( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) {
    return await tx.medication.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  async findById( id, tx = this.#prisma ) {
    return await tx.medication.findUnique( { where: { id } } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.medication.update( {
      where,
      data
    } );
  };

}
