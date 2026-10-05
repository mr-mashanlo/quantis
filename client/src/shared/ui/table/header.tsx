import { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  leftAction?: ReactNode,
  rightAction?: ReactNode
}

export const Header: FC<Props> = ( { leftAction, rightAction, children } ) => {
  return (
    <div className="h-13.5 flex">
      {leftAction ? <div className="w-13.5 p-3">{leftAction}</div> : ''}
      <div className="p-3 flex items-center grow">{children}</div>
      {rightAction ? <div className="p-3 flex items-center">{rightAction}</div> : ''}
    </div>
  );
};

export default Header;
