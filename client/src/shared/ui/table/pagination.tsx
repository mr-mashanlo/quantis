import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  limit: number,
  page: number,
  total: number
}

const getArrayOfPages = ( limit: number, page: number, total: number ) => {
  const totalPages = total > limit ? Math.ceil( total / limit ) : 1;
  const arrayOfPages = Array.from( { length: totalPages }, ( _, k ) => k + 1 );

  if ( totalPages < 3 ) {
    return { totalPages, arrayOfPages };
  }

  if ( page === 1 ) {
    return { totalPages, arrayOfPages: arrayOfPages.splice( 0, 3 ) };
  } else if ( page > 1 && page < totalPages ) {
    return { totalPages, arrayOfPages: arrayOfPages.splice( page - 2, 3 ) };
  } else {
    return { totalPages, arrayOfPages: arrayOfPages.splice( -3 ) };
  }
};

export const Pagination: FC<Props> = ( { limit, page, total } ) => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const params = new URLSearchParams( searchParams );
  const { totalPages, arrayOfPages } = getArrayOfPages( limit, page, total );

  const setParams = ( query?: Record<string, string> ) => {
    params.set( 'page', query?.page || '' );
    setSearchParams( params );
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="h-13.5 p-3 flex items-center gap-3">
        {arrayOfPages.map( v => (
          <a key={v} onClick={() => setParams( { page: String( v ) } )} className={twMerge( 'w-7.5 h-7.5 flex items-center justify-center text-center rounded-md cursor-pointer', page === v ? 'bg-zinc-200/50 dark:bg-zinc-900' : '' )}>{v}</a>
        ) )}
      </div>
      <div className="h-13.5 p-3 flex items-center gap-3">
        {page > 1 ? <a onClick={() => setParams( { page: String( page - 1 ) } )} className="pagination-button h-7.5 px-3 py-1.5 bg-zinc-200/50 dark:bg-zinc-900 rounded-md cursor-pointer">Prev</a> : null}
        {page < totalPages ? <a onClick={() => setParams( { page: String( page + 1 ) } )} className="pagination-button h-7.5 px-3 py-1.5 bg-zinc-200/50 dark:bg-zinc-900 rounded-md cursor-pointer">Next</a> : null}
      </div>
    </div>
  );
};

export default Pagination;
