import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useEmployees } from '@/entities/employee';

import Header from './header';
import Pagination from './pagination';
import Table from './table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const EmployeeTable: FC<Props> = ( { className, ...props } ) => {
  const [ searchParams ] = useSearchParams();
  const { employees } = useEmployees( Object.fromEntries( searchParams.entries() ) );

  return (
    <div className={twMerge( 'border border-zinc-200 dark:border-zinc-800/50 rounded-md', className )} {...props}>
      <div className="border-b border-zinc-200 dark:border-zinc-800/50">
        <Header />
      </div>
      <div className="overflow-auto">
        <Table employees={employees.data?.data || []} />
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800/50">
        <Pagination limit={employees.data?.limit || 1} page={employees.data?.page || 1} total={employees.data?.total || 0} />
      </div>
    </div>
  );
};

export default EmployeeTable;
