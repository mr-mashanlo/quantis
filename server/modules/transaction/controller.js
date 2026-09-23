export class TransactionController {

  #transactionService;

  constructor( transactionService ) {
    this.#transactionService = transactionService;
  };

  async createTransaction( req, res, next ) {
    try {
      const document = await this.#transactionService.createTransaction( { ...req.body, operationId: req.params.id, createdById: req.user.employeeId } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async deleteTransaction( req, res, next ) {
    try {
      const document = await this.#transactionService.deleteTransaction( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getTransactions( req, res, next ) {
    try {
      const document = await this.#transactionService.getTransactions( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getTransactionById( req, res, next ) {
    try {
      const document = await this.#transactionService.getTransactionById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async updateTransactionById( req, res, next ) {
    try {
      const document = await this.#transactionService.updateTransactionById( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
