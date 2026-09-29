import { Button, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';

type Props = ButtonProps;

export const SquareButton: FC<Props> = ( { children, ...props } ) => {
  return (
    <Button className="w-7.5 h-7.5 flex items-center justify-center shrink-0 text-center rounded-md cursor-pointer  bg-zinc-200/50 dark:bg-zinc-900" {...props}>
      {children}
    </Button>
  );
};

export default SquareButton;
