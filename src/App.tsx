import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppErrorBoundary } from '@/components/error-boundary';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/theme-provider';
import { Web3Provider } from '@/contexts/web3';
import AppContainer from '@/routes';
import { Wss } from '@/services/socket';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wss = Wss.getInstance();
const DURATION_TOAST_CLOSE = 5000;

const App: React.FC = () => {
  useEffect(() => {
    wss.connect();
    return () => {
      wss.disconnect();
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="foreon-theme">
      <AppErrorBoundary className="rounded-none px-4 py-2">
        <Web3Provider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ToastContainer
                autoClose={DURATION_TOAST_CLOSE}
                position="top-right"
                style={{ width: 'auto' }}
                theme="colored"
              />
              <AppContainer />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Web3Provider>
      </AppErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
