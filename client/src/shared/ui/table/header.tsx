import { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  button?: ReactNode,
  action?: ReactNode
}

export const Header: FC<Props> = ( { title, button, action } ) => {
  return (
    <div className="flex">
      <div className="w-13.5 h-13.5 p-3">
        {button}
      </div>
      <div className="p-3 flex items-center grow">
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="p-3 flex items-center">
        {action}
      </div>
    </div>
  );
};

export default Header;
