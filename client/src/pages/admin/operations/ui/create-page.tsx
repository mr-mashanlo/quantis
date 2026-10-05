import { type FC } from 'react';

import { CreateOperationForm } from '@/features/operation';

export const CreateOperationPage: FC = () => {
  return (
    <>
      <title>Operations</title>
      <meta property="og:title" content="Operations" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <CreateOperationForm />
    </>
  );
};

export default CreateOperationPage;