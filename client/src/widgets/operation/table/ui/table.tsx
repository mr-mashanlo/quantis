import { ChevronsUpDown } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type TableHTMLAttributes } from 'react';
import { useSearchParams } from 'react-router';

import { type Operation } from '@/entities/operation';

import Row from './row';

interface Props extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  operations: Array<Operation>
}

const Table: FC<Props> = ( { operations, ...props } ) => {
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
            <button onClick={() => setParams( { sort: 'status' } )} className="inline-flex items-center gap-1 cursor-pointer">
              <span>Status</span>
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          </th>
          <th className="p-3">
            <button onClick={() => setParams( { sort: 'fromDepartmentId' } )} className="inline-flex items-center gap-1 cursor-pointer">
              <span>From</span>
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          </th>
          <th className="p-3">
            <button onClick={() => setParams( { sort: 'toDepartmentId' } )} className="inline-flex items-center gap-1 cursor-pointer">
              <span>To</span>
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          </th>
          <th className="p-3">
            <button onClick={() => setParams( { sort: 'createdAt' } )} className="inline-flex items-center gap-1 cursor-pointer">
              <span>Created At</span>
              <ChevronsUpDown className="w-3 h-3" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {operations.map( operation => <Row key={operation.id} operation={operation} /> )}
      </tbody>
    </table>
  );
};

export default Table;
