export class OperationController {

  #operationService;

  constructor( operationService ) {
    this.#operationService = operationService;
  };

  async createOperation( req, res, next ) {
    try {
      const document = await this.#operationService.createOperation( { ...req.body, createdById: req.user.employeeId } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getOperations( req, res, next ) {
    try {
      const document = await this.#operationService.getOperations( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getOperationById( req, res, next ) {
    try {
      const document = await this.#operationService.getOperationById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async updateOperationById( req, res, next ) {
    try {
      const document = await this.#operationService.updateOperationById( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
