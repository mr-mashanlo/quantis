import { kyInstance } from '@/shared/libs';

import { type CreateOperationDTO, type Operation, type PaginatedOperation, type UpdateOperationDTO } from '../model/schema';

class OperationService {

  createOperation = ( data: CreateOperationDTO ): Promise<Operation> => {
    return kyInstance.post( 'operations', { json: data } ).json();
  };

  deleteOperation = ( id: string ): Promise<Operation> => {
    return kyInstance.delete( `operations/${id}` ).json();
  };

  getOperations = ( searchParams?: Record<string, string> ): Promise<PaginatedOperation> => {
    return kyInstance.get( 'operations', { searchParams } ).json();
  };

  getOperationById = ( id: string ): Promise<Operation> => {
    return kyInstance.get( `operations/${id}` ).json();
  };

  updateOperation = ( id: string, data: UpdateOperationDTO ): Promise<Operation> => {
    return kyInstance.put( `operations/${id}`, { json: data } ).json();
  };

}

export const operationService = new OperationService();
