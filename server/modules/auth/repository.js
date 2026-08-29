export class AuthRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async create( data, tx = this.#prisma ) {
    return await tx.user.create( { data } );
  };

  async find( tx = this.#prisma ) {
    return await tx.user.findMany();
  };

  async findById( id, tx = this.#prisma ) {
    return await tx.user.findUnique( { where: { id } } );
  };

  async findByEmail( email, tx = this.#prisma ) {
    return await tx.user.findUnique( { where: { email } } );
  };

  async findByToken( refreshToken, tx = this.#prisma ) {
    return await tx.user.findFirst( { where: { refreshToken } } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.user.update( { where, data } );
  };

}
