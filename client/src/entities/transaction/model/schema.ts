import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

const TransactionSchema = z.object( {
  id: z.string(),
  operationId: z.string(),
  type: z.enum( [ 'CREDIT', 'DEBIT' ], 'Type has invalid value' ),
  medication: z.object( {
    id: z.string(),
    name: z.string()
  } ),
  medicationId: z.string(),
  amount: z.number().min( 1 ),
  createdAt: z.string(),
  createdById: z.string()
} );

export const CreateTransactionFormSchema = z.object( {
  medication: z.object( { id: z.string() } ),
  amount: z.string()
} );

export const CreateTransactionSchema = TransactionSchema.omit( { id: true, operationId: true, medication: true, type: true, createdAt: true, createdById: true } );

export const UpdateTransactionSchema = TransactionSchema.omit( { id: true, operationId: true, medication: true, type: true, createdAt: true, createdById: true } );

export type Transaction = z.infer<typeof TransactionSchema>;

export type CreateTransactionFormDTO = z.infer<typeof CreateTransactionFormSchema>;

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;

export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionSchema>;

export type PaginatedTransaction = PaginatedResponse<Transaction>
