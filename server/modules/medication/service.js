import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class MedicationService {

  #medicationRepository;

  constructor( medicationRepository ) {
    this.#medicationRepository = medicationRepository;
  };

  async createMedication( body ) {
    return await this.#medicationRepository.create( body );
  };

  async deleteMedication( query ) {
    await this.#medicationRepository.delete( query );
  };

  async getMedications( query = {} ) {
    const { search, ...filters } = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.#medicationRepository.find( {
      filters: { ...filters, ...search },
      sort: { [sort.sort]: sort.order },
      pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit }
    } );
    const total = await this.#medicationRepository.count( filters );
    return { data, total, ...pagination };
  };

  async getMedicationById( id ) {
    return await this.#medicationRepository.findById( id );
  };

  async updateMedicationById( id, body ) {
    return await this.#medicationRepository.update( { id }, body );
  };

};
