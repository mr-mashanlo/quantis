export class PatientRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  count = async ( where, tx = this.#prisma ) => {
    return await tx.patient.count( { where } );
  };

  create = async ( data, tx = this.#prisma ) => {
    return await tx.patient.create( { data } );
  };

  delete = async ( where, tx = this.#prisma ) => {
    return await tx.patient.delete( { where } );
  };

  find = async ( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) => {
    return await tx.patient.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  findById = async ( id, tx = this.#prisma ) => {
    return await tx.patient.findUnique( { where: { id } } );
  };

  update = async ( where, data, tx = this.#prisma ) => {
    return await tx.patient.update( {
      where,
      data
    } );
  };

}
