import './styles/main.sass';
import './styles/tailwind.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { queryClient } from '@/shared/libs';

import { router } from './routes/router';

createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);