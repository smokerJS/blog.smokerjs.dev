import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageTemplate from 'components/template/PageTemplate';

function App({ Component, pageProps }: AppProps) {
  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
}

export default App;
