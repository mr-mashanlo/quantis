import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type ReactNode, type SubmitEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDepartments } from '@/entities/department';
import { CreateOperationFormSchema } from '@/entities/operation';
import { Button } from '@/shared/ui/button';
import { Combobox, ComboboxInput } from '@/shared/ui/form';

import { useCreateOperationForm } from '../model/hook';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  description?: ReactNode
}

export const DepartmentToDepartmentForm: FC<Props> = ( { className, description = 'Lorem ipsum dolor sit amet', ...props } ) => {
  const form = useCreateOperationForm();
  const { departments } = useDepartments( { limit: '10000' } );
  const { canSubmit, isSubmitting } = useSelector( form.store, state => state );
  const [ departmentQuery, setDepartmentQuery ] = useState( '' );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const filteredDepartments = departmentQuery === '' ? departments.data?.data : departments.data?.data.filter( department => department.name?.toLowerCase().includes( departmentQuery.toLowerCase() ) );

  const mapedDepartments = filteredDepartments?.map( department => ( { id: department.id, key: 'name', value: department.name } ) );

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-90 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Create operation</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="fromDepartment" validators={{ onChange: CreateOperationFormSchema.shape.fromDepartment }}>
          {field => <Combobox<{ id: string }, false> icon="hospital" options={mapedDepartments || []} value={field.state.value} onChange={e => e ? field.handleChange( e ) : null} onClose={() => setDepartmentQuery( '' )} invalid={field.state.meta.isValid} input={<ComboboxInput placeholder="From" displayValue={data => data?.value} onChange={e => setDepartmentQuery( e.target.value )} />} />}
        </form.Field>
        <form.Field name="toDepartment" validators={{ onChange: CreateOperationFormSchema.shape.toDepartment }}>
          {field => <Combobox<{ id: string }, false> icon="hospital" options={mapedDepartments || []} value={field.state.value} onChange={e => e ? field.handleChange( e ) : null} onClose={() => setDepartmentQuery( '' )} invalid={field.state.meta.isValid} input={<ComboboxInput placeholder="To" displayValue={data => data.value} onChange={e => setDepartmentQuery( e.target.value )} />} />}
        </form.Field>
        <form.Subscribe selector={state => [ state.canSubmit, state.isSubmitting ]}>
          {( [ canSubmit, isSubmitting ] ) => <Button type="submit" disabled={!canSubmit}>{isSubmitting ? '•••' : 'Save'}</Button>}
        </form.Subscribe>
      </div>
      <div className="w-full mt-5 text-center absolute top-full">
        {!canSubmit && !isSubmitting ?
          <p className=" text-red-600">Data has invalid value</p> :
          <p>{description}</p>
        }
      </div>
    </form>
  );
};

export default DepartmentToDepartmentForm;
