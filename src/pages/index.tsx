import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageTitle from 'components/home/PageTitle';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle />
    </>
  );
};

export default Home;
