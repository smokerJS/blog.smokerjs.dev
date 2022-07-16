import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

const BLOG_TITLE = 'I AM A\nFRONT-END\nDEVELOPER';
const TITLE = styled.h1`
  width: 500px;
`;

const TitleSection = styled.section`
  position: relative;
  margin-top: 200px;
  margin-left: 50px;
`;

interface TitleCharAtProps {
  x: number;
  y: number;
}

const TitleCharAt = styled.span<TitleCharAtProps>`
  font-size: 100px;
  position: absolute;
  top: ${({ y }) => y}%;
  left: ${({ x }) => x}%;
`;

interface TitleCharProps extends TitleCharAtProps {
  children: React.ReactNode;
}

const TitleChar: React.FC<TitleCharProps> = props => {
  const { x, y, children } = props;
  return <TitleCharAt>{children}</TitleCharAt>;
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TitleSection>
          {[...BLOG_TITLE].map(obj => (
            <TitleCharAt>{obj}</TitleCharAt>
          ))}
          <TITLE>{BLOG_TITLE}</TITLE>
        </TitleSection>
      </main>
    </div>
  );
};

export default Home;
