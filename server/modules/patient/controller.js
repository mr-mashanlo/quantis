export class PatientController {

  #patientService;

  constructor( patientService ) {
    this.#patientService = patientService;
  };

  async createPatient( req, res, next ) {
    try {
      const document = await this.#patientService.createPatient( { ...req.body, createdBy: req.user.employeeId } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async deletePatient( req, res, next ) {
    try {
      const document = await this.#patientService.deletePatient( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getPatients( req, res, next ) {
    try {
      const document = await this.#patientService.getPatients( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getPatientById( req, res, next ) {
    try {
      const document = await this.#patientService.getPatientById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async updatePatientById( req, res, next ) {
    try {
      const document = await this.#patientService.updatePatientById( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
