import { Button, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';

type Props = ButtonProps;

export const SmallButton: FC<Props> = ( { children, ...props } ) => {
  return (
    <Button className="w-full px-3 py-1.5 text-left rounded-md cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900" {...props}>
      {children}
    </Button>
  );
};

export default SmallButton;
