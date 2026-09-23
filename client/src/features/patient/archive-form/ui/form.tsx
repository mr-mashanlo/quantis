import { Button } from '@headlessui/react';
import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Patient } from '@/entities/patient';

import { useUpdatePatientForm } from '../model/hook';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  patient: Patient
};

export const ArchivePatientForm: FC<Props> = ( { patient, className, ...props } ) => {
  const form = useUpdatePatientForm( patient );
  const { canSubmit, fieldMeta } = useSelector( form.store, state => state );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const getErrorMessages = () => {
    return Object.values( fieldMeta ).filter( field => field?.errors.length ).map( field => field?.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-165 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Archive patient</h3>
      <div className="w-full sm:w-90 mx-auto grid gap-4 sm:gap-5">
        <form.Subscribe selector={state => [ state.canSubmit, state.isSubmitting ]}>
          {( [ canSubmit, isSubmitting ] ) =>
            <Button disabled={!canSubmit} type="submit" className="w-full p-4 rounded-xl bg-black dark:bg-white text-white dark:text-black cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70">{isSubmitting ? '•••' : patient.archived ? 'Unarchive' : 'Archive'}</Button>
          }
        </form.Subscribe>
      </div>
      <div className="w-full mt-5 text-center absolute top-full">
        {!canSubmit ?
          <p className=" text-red-600">{getErrorMessages().join( ', ' )}</p> :
          <p>Lorem ipsum dolor sit amet</p>
        }
      </div>
    </form>
  );
};

export default ArchivePatientForm;
