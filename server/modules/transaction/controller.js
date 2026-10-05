export class TransactionController {

  #transactionService;

  constructor( transactionService ) {
    this.#transactionService = transactionService;
  };

  async getTransactions( req, res, next ) {
    try {
      const document = await this.#transactionService.getTransactions( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
