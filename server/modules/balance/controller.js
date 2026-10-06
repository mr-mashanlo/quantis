export class BalanceController {

  #balanceService;

  constructor( balanceService ) {
    this.#balanceService = balanceService;
  };

  async getBalances( req, res, next ) {
    try {
      const document = await this.#balanceService.getBalances( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
