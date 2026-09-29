import { Menu as HeadlessMenu, MenuButton, MenuItem, MenuItems, type MenuProps } from '@headlessui/react';
import { EllipsisVertical } from 'lucide-react';
import { type FC, type ReactNode } from 'react';

interface Props extends MenuProps {
  buttons: Array<ReactNode>
}

export const Menu: FC<Props> = ( { buttons, ...props } ) => {
  return (
    <HeadlessMenu {...props}>
      <MenuButton className="w-7.5 h-7.5 shrink-0 flex items-center justify-center text-center rounded-md cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900">
        <EllipsisVertical className="w-4 h-3" />
      </MenuButton>
      <MenuItems transition anchor="bottom start" className="w-50 p-1 bg-white dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
        {buttons.map( ( button, index ) => <MenuItem key={index}>{button}</MenuItem> )}
      </MenuItems>
    </HeadlessMenu>
  );
};

export default Menu;
