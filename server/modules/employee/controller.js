export class EmployeeController {

  #employeeService;

  constructor( employeeService ) {
    this.#employeeService = employeeService;
  };

  async createEmployee( req, res, next ) {
    try {
      const document = await this.#employeeService.createEmployee( req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async deleteEmployee( req, res, next ) {
    try {
      const document = await this.#employeeService.deleteEmployee( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getEmployees( req, res, next ) {
    try {
      const document = await this.#employeeService.getEmployees( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getEmployeeById( req, res, next ) {
    try {
      const document = await this.#employeeService.getEmployeeById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async updateEmployeeById( req, res, next ) {
    try {
      const document = await this.#employeeService.updateEmployeeById( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
