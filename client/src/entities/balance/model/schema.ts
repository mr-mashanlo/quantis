import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

export const BalanceSchema = z.object( {
  id: z.string(),
  medication: z.object( {
    id: z.string(),
    name: z.string(),
    unit: z.string()
  } ),
  medicationId: z.string(),
  amount: z.number()
} );

export type Balance = z.infer<typeof BalanceSchema>;

export type PaginatedBalance = PaginatedResponse<Balance>
