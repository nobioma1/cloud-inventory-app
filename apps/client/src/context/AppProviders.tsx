import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Auth0ProviderWithNavigate } from './AuthProvider';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
      },
    },
  },
  fonts: {
    heading: `Lato, sans-serif`,
    body: `Lato, sans-serif`,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>{children}</Auth0ProviderWithNavigate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default AppProviders;
