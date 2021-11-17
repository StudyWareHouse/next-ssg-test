import '../styles/globals.css';
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  useIsFetching
} from 'react-query'

import Loading from '../components/Loading'

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Loading />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
