import { Button, Field, Input } from '@headlessui/react';
import { Search, X } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { useSearchParams } from 'react-router';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

const SearchForm: FC<Props> = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const params = new URLSearchParams( searchParams );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const formData = new FormData( e.target );
    params.delete( 'page' );
    params.set( 'search', String( formData.get( 'search' ) ) );
    setSearchParams( params );
  };

  const handleButtonClick = () => {
    params.delete( 'search' );
    setSearchParams( params );
  };

  return (
    <form method="get" onSubmit={handleFormSubmit}>
      <Field className="block relative">
        <Input type="text" name="search" defaultValue={searchParams.get( 'search' ) || ''} placeholder="Search" className="peer w-40 sm:w-60 h-7.5 p-1 pl-9 rounded-md bg-zinc-200/50 dark:bg-zinc-900 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent" />
        {searchParams.get( 'search' ) ?
          <Button onClick={handleButtonClick} className="p-1 cursor-pointer absolute top-1/2 left-2 -translate-y-1/2">
            <X className="w-3 h-3 stroke-3 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400" aria-hidden="true" />
          </Button> :
          <Search className="w-3 h-3 stroke-3 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-3 -translate-y-1/2" aria-hidden="true" />
        }
      </Field>
    </form>
  );
};

export default SearchForm;
