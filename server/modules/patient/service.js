import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class PatientService {

  #patientRepository;

  constructor( patientRepository ) {
    this.#patientRepository = patientRepository;
  };

  async createPatient( body ) {
    return await this.#patientRepository.create( body );
  };

  async deletePatient( query ) {
    await this.#patientRepository.delete( query );
  };

  async getPatients( query = {} ) {
    const { search, ...filters } = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#patientRepository.find( {
      filters: { ...filters, ...search },
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#patientRepository.count( filters );
    return { data, total, ...pagination };
  };

  async getPatientById( id ) {
    return await this.#patientRepository.findById( id );
  };

  async updatePatientById( id, body ) {
    return await this.#patientRepository.update( { id }, body );
  };

};
