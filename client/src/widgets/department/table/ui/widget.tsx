import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useDepartments } from '@/entities/department';

import Header from './header';
import Pagination from './pagination';
import Table from './table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const DepartmentTable: FC<Props> = ( { className, ...props } ) => {
  const [ searchParams ] = useSearchParams();
  const { departments } = useDepartments( Object.fromEntries( searchParams.entries() ) );

  return (
    <div className={twMerge( 'border border-zinc-200 dark:border-zinc-800/50 rounded-md', className )} {...props}>
      <div className="border-b border-zinc-200 dark:border-zinc-800/50">
        <Header />
      </div>
      <div className="overflow-auto">
        <Table departments={departments.data?.data || []} />
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800/50">
        <Pagination limit={departments.data?.limit || 1} page={departments.data?.page || 1} total={departments.data?.total || 0} />
      </div>
    </div>
  );
};

export default DepartmentTable;
