import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

export const TransactionSchema = z.object( {
  id: z.string(),
  operationId: z.string(),
  type: z.enum( [ 'CREDIT', 'DEBIT' ], 'Type has invalid value' ),
  medication: z.object( {
    id: z.string(),
    name: z.string()
  } ),
  medicationId: z.string(),
  amount: z.number(),
  createdAt: z.string(),
  createdById: z.string()
} );

export type Transaction = z.infer<typeof TransactionSchema>;

export type PaginatedTransaction = PaginatedResponse<Transaction>
