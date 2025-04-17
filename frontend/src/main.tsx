// src/main.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AppKitProvider } from '@reown/appkit/react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { StrictMode } from 'react';
import { OpenAPI } from './client';
import theme from './theme';
import './styles/global.css';
import { WagmiProvider } from 'wagmi';
import { AuthProvider } from './components/Common/TopNav';
import { wagmiConfig, queryClient } from './client/core/appkit';

OpenAPI.BASE = 'https://iconluxury.shop';
OpenAPI.TOKEN = async () => localStorage.getItem('access_token') || '';

const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AppKitProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </AppKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  </StrictMode>
);