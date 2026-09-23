import { ChevronsUpDown } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type TableHTMLAttributes } from 'react';
import { useSearchParams } from 'react-router';

import { type Department } from '@/entities/department';

import Row from './row';

interface Props extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  departments: Array<Department>
}

const Table: FC<Props> = ( { departments, ...props } ) => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const params = new URLSearchParams( searchParams );

  const setParams = ( query?: Record<string, string> ) => {
    if ( !query ) return;

    if ( query.sort === searchParams.get( 'sort' ) ) {
      params.set( 'order', searchParams.get( 'order' ) === 'asc' ? 'desc' : 'asc' );
    } else {
      params.set( 'order', 'asc' );
    }

    params.set( 'sort', query.sort );
    setSearchParams( params );
  };

  return (
    <table className="w-full min-w-200 text-left table-fixed" {...props}>
      <thead>
        <tr>
          <th className="w-13.5 h-13.5 p-3"></th>
          <th className="p-3">
            <button onClick={() => setParams( { sort: 'name' } )} className="inline-flex items-center gap-1 cursor-pointer">
              <span>Name</span>
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          </th>
          <th className="p-3">
            <button onClick={() => setParams( { sort: 'archived' } )} className="inline-flex items-center gap-1 cursor-pointer">
              <span>Archived</span>
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {departments.map( department => <Row key={department.id} department={department} /> )}
      </tbody>
    </table>
  );
};

export default Table;
