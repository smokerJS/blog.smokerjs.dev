import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageTemplate from 'components/template/PageTemplate';
import { RecoilRoot } from 'recoil'

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <PageTemplate>
        <Component {...pageProps} />
      </PageTemplate>
    </RecoilRoot>
  );
}

export default App;
