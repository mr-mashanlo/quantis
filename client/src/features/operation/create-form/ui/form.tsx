import { Plus, Trash } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import { useDepartments } from '@/entities/department';
import { useMedications } from '@/entities/medication';
import { CreateOperationFormSchema } from '@/entities/operation';
import { usePatients } from '@/entities/patient';
import { Button, SquareButton } from '@/shared/ui/button';
import { Combobox, ComboboxInput, TextInput } from '@/shared/ui/form';
import { Header } from '@/shared/ui/table';

import { useCreateOperationForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const CreateOperationForm: FC<Props> = ( { ...props } ) => {
  const navigate = useNavigate();
  const form = useCreateOperationForm( { onSuccess: () => navigate( '/operations', { replace: true } ) } );
  const { departments } = useDepartments( { limit: '10000' } );
  const { patients } = usePatients( { limit: '10000' } );
  const { medications } = useMedications( { limit: '10000' } );
  const [ departmentQuery, setDepartmentQuery ] = useState( '' );
  const [ patientQuery, setPatientQuery ] = useState( '' );
  const [ medicationQuery, setMedicationQuery ] = useState( '' );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const filteredDepartments = departmentQuery === '' ? departments.data?.data : departments.data?.data.filter( department => department.name?.toLowerCase().includes( departmentQuery.toLowerCase() ) );
  const mapedDepartments = filteredDepartments?.map( department => ( { id: department.id, key: 'name', value: department.name } ) );

  const filteredPatients = patientQuery === '' ? patients.data?.data : patients.data?.data.filter( patient => patient.name?.toLowerCase().includes( patientQuery.toLowerCase() ) );
  const mapedPatients = filteredPatients?.map( patient => ( { id: patient.id, key: 'name', value: patient.name } ) );

  const filteredMedications = medicationQuery === '' ? medications.data?.data : medications.data?.data.filter( medication => medication.name?.toLowerCase().includes( medicationQuery.toLowerCase() ) );
  const mapedMedications = filteredMedications?.map( medication => ( { id: medication.id, key: 'name', value: medication.name } ) );

  const SubmitButton =
    <form.Subscribe>
      {state => <Button scale="small" type="submit" disabled={!state.canSubmit}>{state.isSubmitting ? '•••' : 'Save'}</Button>}
    </form.Subscribe>;

  const AddButton =
    <SquareButton theme="light" type="button" onClick={() => form.pushFieldValue( 'transactions', { medication: { id: '' }, amount: '' } )}>
      <Plus className="w-2.5 h-2.5 stroke-3" />
    </SquareButton>;

  const FromDepartmentInput =
    <div className="w-60 mx-4">
      <form.Field name="fromDepartment" validators={{ onChange: CreateOperationFormSchema.shape.fromDepartment }}>
        {field => <Combobox<{ id: string }, false> scale="small" icon="hospital" options={mapedDepartments || []} value={field.state.value} onChange={e => field.handleChange( e || { id: '' } )} onClose={() => setDepartmentQuery( '' )} invalid={field.state.meta.isValid} input={<ComboboxInput scale="small" placeholder="Department" displayValue={data => data?.value} onChange={e => setDepartmentQuery( e.target.value )} />} />}
      </form.Field>
    </div>;

  const ToDepartmentInput =
    <div className="w-60 mx-4">
      <form.Field name="toDepartment" validators={{ onChange: CreateOperationFormSchema.shape.toDepartment }}>
        {field => <Combobox<{ id: string }, false> scale="small" icon="hospital" options={mapedDepartments || []} value={field.state.value} onChange={e => {field.handleChange( e || { id: '' } ); form.setFieldValue( 'toPatient', { id: '' } );}} onClose={() => setDepartmentQuery( '' )} invalid={field.state.meta.isValid} input={<ComboboxInput scale="small" placeholder="Department" displayValue={data => data?.value} onChange={e => setDepartmentQuery( e.target.value )} />} />}
      </form.Field>
    </div>;

  const ToPatientInput =
    <div className="w-60 mx-4">
      <form.Field name="toPatient" validators={{ onChange: CreateOperationFormSchema.shape.toPatient }}>
        {field => <Combobox<{ id: string }, false> scale="small" icon="cat" options={mapedPatients || []} value={field.state.value} onChange={e => {field.handleChange( e || { id: '' } ); form.setFieldValue( 'toDepartment', { id: '' } );}} onClose={() => setPatientQuery( '' )} invalid={field.state.meta.isValid} input={<ComboboxInput scale="small" placeholder="Patient" displayValue={data => data?.value} onChange={e => setPatientQuery( e.target.value )} />} />}
      </form.Field>
    </div>;

  return (
    <form onSubmit={handleFormSubmit} {...props}>
      <div className="border border-zinc-200 dark:border-zinc-800/50 rounded-md">
        <div className="border-b border-zinc-200 dark:border-zinc-800/50">
          <Header leftAction={<></>}><>Transaction from {FromDepartmentInput} to {ToDepartmentInput} or {ToPatientInput}</></Header>
        </div>
        <div className="overflow-auto">
          <table className="w-full min-w-200 text-left table-fixed">
            <thead>
              <tr className="h-13.5">
                <th className="w-13.5 h-13.5 p-3"></th>
                <th className="p-3">
                  <button className="inline-flex items-center gap-1 cursor-pointer">Medicament</button>
                </th>
                <th className="p-3">
                  <button className="inline-flex items-center gap-1 cursor-pointer">Amount</button>
                </th>
              </tr>
            </thead>
            <form.Field name="transactions" validators={{ onChange: CreateOperationFormSchema.shape.transactions }}>
              {transactionField => (
                <tbody>
                  {transactionField.state.value.map( ( _, index ) => (
                    <tr key={index} className="h-13.5 border-t border-zinc-200 dark:border-zinc-800/50">
                      <td className="w-13.5 p-3">
                        <SquareButton theme="light" type="button" onClick={() => transactionField.removeValue( index )}>
                          <Trash className="w-2.5 h-2.5 stroke-3" />
                        </SquareButton>
                      </td>
                      <td className="p-3">
                        <form.Field name={`transactions[${index}].medication`}>
                          {medicationField => <Combobox<{ id: string }, false> scale="small" icon="pill" options={mapedMedications || []} value={medicationField.state.value} onChange={e => medicationField.handleChange( e || { id: '' } )} onClose={() => setMedicationQuery( '' )} invalid={medicationField.state.meta.isValid} input={<ComboboxInput scale="small" placeholder="Medication" displayValue={data => data?.value} onChange={e => setMedicationQuery( e.target.value )} />} />}
                        </form.Field>
                      </td>
                      <td className="p-3">
                        <form.Field name={`transactions[${index}].amount`}>
                          {amountField => <TextInput scale="small" icon="package-2" type="number" min="0" placeholder="Amount" value={amountField.state.value} onChange={e => amountField.handleChange( e.target.value )} onWheel={e => e.currentTarget.blur()} invalid={amountField.state.meta.isValid} data-error={amountField.state.meta.isValid ? false : true} />}
                        </form.Field>
                      </td>
                    </tr>
                  ) )}
                </tbody>
              )}
            </form.Field>
          </table>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800/50">
          <Header leftAction={AddButton} rightAction={SubmitButton} />
        </div>
      </div>
    </form>
  );
};

export default CreateOperationForm;
