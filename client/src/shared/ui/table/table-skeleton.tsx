import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TableSkeleton: FC<Props> = ( props ) => {
  return (
    <div className="w-full h-50 border border-zinc-200 dark:border-zinc-800/50 rounded-md animate-pulse" {...props}></div>
  );
};

export default TableSkeleton;
