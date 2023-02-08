import '../styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import AuthWrapper from '@/containers/AuthWrapper';
import AppContext from '@/contexts';
import { store } from '@/store';
import { toastOptions } from '@/utils/config/toaster.config';
import { grahpQLApiUri } from '@/utils/constants';

const httpLink = createHttpLink({
  uri: grahpQLApiUri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <AppContext>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AuthWrapper>
            <Component {...pageProps} key={router.pathname} />
            <Toaster position="top-right" toastOptions={toastOptions} />
          </AuthWrapper>
        </Provider>
      </ApolloProvider>
    </AppContext>
  );
};

export default MyApp;
