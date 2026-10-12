import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TableSkeleton: FC<Props> = props => {
  return (
    <div className="w-full border border-zinc-200 dark:border-zinc-600/50 rounded-md animate-pulse" {...props}>
      <div className="h-13.5 border-b border-zinc-200 dark:border-zinc-600/50"></div>
      <div className="h-13.5"></div>
      <div className="h-13.5 border-t border-zinc-200 dark:border-zinc-600/50"></div>
    </div>
  );
};

export default TableSkeleton;
