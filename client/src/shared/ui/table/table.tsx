import { ChevronsUpDown } from 'lucide-react';
import { type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface PaginatedData<T> {
  data: Array<T>,
  limit: number,
  page: number,
  total: number
}

interface Columns<T> {
  key: string & keyof T,
  value: string,
  cell?: ( row: T ) => ReactNode
}

interface Props<T> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: PaginatedData<T>,
  columns: Array<Columns<T>>
  header?: ReactNode,
  footer?: ReactNode
  rowAction?: ( row: T ) => ReactNode
}

export const Table = <T, >( { data, columns, header, footer, rowAction, className, ...props }: Props<T> ) => {
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
    <div className={twMerge( 'border border-zinc-200 dark:border-zinc-800/50 rounded-md', className )} {...props}>
      {header ? <div className="border-b border-zinc-200 dark:border-zinc-800/50">{header}</div> : ''}
      <div className="overflow-auto">
        <table className="w-full min-w-200 text-left table-fixed">
          <thead>
            <tr>
              <th className="w-13.5 h-13.5 p-3"></th>
              {columns.map( column => (
                <th key={column.key} className="p-3">
                  <button onClick={() => setParams( { sort: column.key } )} className="inline-flex items-center gap-1 cursor-pointer">
                    <span>{column.value}</span>
                    <ChevronsUpDown className="w-3 h-3" />
                  </button>
                </th>
              ) )}
            </tr>
          </thead>
          <tbody>
            {data.data.map( ( row, index ) => (
              <tr key={index} className="border-t border-zinc-200 dark:border-zinc-800/50">
                <td className="w-13.5 h-13.5 p-3">{rowAction?.( row )}</td>
                {columns.map( column => (
                  <td key={column.key} className="p-3">
                    {column.cell ? column.cell( row ) : typeof row[column.key] === 'boolean' ? String( row[column.key] ).toUpperCase() : String( row[column.key] )}
                  </td>
                ) )}
              </tr>
            ) )}
          </tbody>
        </table>
      </div>
      {footer ? <div className="border-t border-zinc-200 dark:border-zinc-800/50">{footer}</div> : ''}
    </div>
  );
};

export default Table;
