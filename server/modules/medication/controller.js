export class MedicationController {

  #medicationService;

  constructor( medicationService ) {
    this.#medicationService = medicationService;
  };

  async createMedication( req, res, next ) {
    try {
      const document = await this.#medicationService.createMedication( { ...req.body, createdBy: req.user.employeeId } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async deleteMedication( req, res, next ) {
    try {
      const document = await this.#medicationService.deleteMedication( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getMedications( req, res, next ) {
    try {
      const document = await this.#medicationService.getMedications( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async getMedicationById( req, res, next ) {
    try {
      const document = await this.#medicationService.getMedicationById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  async updateMedicationById( req, res, next ) {
    try {
      const document = await this.#medicationService.updateMedicationById( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};
