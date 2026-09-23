import ky from 'ky';

export class UnauthorizedError extends Error {}

export const kyInstance = ky.create( {
  prefix: import.meta.env.VITE_BACK_URL,
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
} );

export const kyMediaInstance = ky.create( {
  prefix: import.meta.env.VITE_BACK_URL,
  credentials: 'include'
} );