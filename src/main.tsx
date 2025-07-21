import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router/router'
import './index.css'
import 'animate.css';
import { ContextAppDevTree } from './context/ContextAppDevTree';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextAppDevTree>
        <Router />
      </ContextAppDevTree>
    </QueryClientProvider>
  </React.StrictMode>,
)
