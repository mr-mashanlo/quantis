import crypto from 'node:crypto';

import { Prisma } from '../../prisma/generated/client.ts';

export class BalanceRepository {

  #prisma;

  constructor( prisma ) {
    this.#prisma = prisma;
  };

  async count( where, tx = this.#prisma ) {
    return await tx.balance.count( { where } );
  };

  async create( data, tx = this.#prisma ) {
    const valuesToInsert = data.map( d => {
      const id = crypto.randomUUID();
      return Prisma.sql`(${id}, ${d.operationId}, ${d.departmentId}, ${d.medicationId}, ${d.amount})`;
    } );
    return await tx.$executeRaw`
        INSERT INTO "Balance" ("id", "operationId", "departmentId", "medicationId", "amount")
        VALUES ${Prisma.join( valuesToInsert )}
        ON CONFLICT ("departmentId", "medicationId")
        DO UPDATE SET "amount" = "Balance"."amount" + EXCLUDED."amount", "operationId" = EXCLUDED."operationId";
      `;
  };

  async find( { filters = {}, sort = { 'id': 'desc' }, pagination = { skip: 0, limit: 10 } }, tx = this.#prisma ) {
    return await tx.balance.findMany( {
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
    return await tx.balance.findUnique( { where: { id } } );
  };

  async update( where, data, tx = this.#prisma ) {
    return await tx.balance.update( { where, data } );
  };

}
