import { type FC } from 'react';
import { Link } from 'react-router';

export const NoAccessPage: FC = () => {
  return (
    <>
      <title>No Access</title>
      <meta property="og:title" content="No Access" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />

      <main className="min-h-screen p-4 sm:p-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold">Page 403</h1>
          <p className="mt-5">You don't have permission to access. <Link to="/" className="font-bold decoration-[.1rem] hover:underline">Go to home page</Link></p>
        </div>
      </main>
    </>
  );
};

export default NoAccessPage;
