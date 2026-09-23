export class DepartmentController {

  #departmentService;

  constructor( departmentService ) {
    this.#departmentService = departmentService;
  };

  async createDepartment( req, res, next ) {
    try {
      const document = await this.#departmentService.createDepartment( { ...req.body, createdById: req.user.employeeId } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async deleteDepartment( req, res, next ) {
    try {
      const document = await this.#departmentService.deleteDepartment( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getDepartments( req, res, next ) {
    try {
      const document = await this.#departmentService.getDepartments( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getDepartmentById( req, res, next ) {
    try {
      const document = await this.#departmentService.getDepartmentById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async updateDepartmentById( req, res, next ) {
    try {
      const document = await this.#departmentService.updateDepartmentById( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
