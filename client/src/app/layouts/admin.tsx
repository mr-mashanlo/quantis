import { Cat, Dog, FileText, Hospital, Pill, User } from 'lucide-react';
import { type FC } from 'react';
import { Link, Outlet, ScrollRestoration } from 'react-router';

import { TopProgressBar } from '@/shared/ui/top-progress-bar';

export const AdminLayout: FC = () => {
  return (
    <>
      <ScrollRestoration />
      <TopProgressBar />
      <main className="flex">
        <header className="min-h-screen px-5 py-10 bg-zinc-100 dark:bg-zinc-900">
          <nav className="flex flex-col gap-10">
            <Link to="/" className="w-7.5 h-7.5 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-950 rounded-full cursor-pointer">
              <User className="w-3 h-3" />
            </Link>
            <Link to="/operations" className="w-7.5 h-7.5 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-950 rounded-full cursor-pointer">
              <FileText className="w-3 h-3" />
            </Link>
            <Link to="/medications" className="w-7.5 h-7.5 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-950 rounded-full cursor-pointer">
              <Pill className="w-3 h-3" />
            </Link>
            <Link to="/departments" className="w-7.5 h-7.5 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-950 rounded-full cursor-pointer">
              <Hospital className="w-3 h-3" />
            </Link>
            <Link to="/patients" className="w-7.5 h-7.5 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-950 rounded-full cursor-pointer">
              <Cat className="w-3 h-3" />
            </Link>
            <Link to="/employees" className="w-7.5 h-7.5 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-950 rounded-full cursor-pointer">
              <Dog className="w-3 h-3" />
            </Link>
          </nav>
        </header>
        <section className="p-5 sm:p-10">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;