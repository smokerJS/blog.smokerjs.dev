import React, { FC, ReactNode } from 'react';
import * as $ from './PageTemplate.styled';
import Navigation from './Navigation';
import GlobalStyle from './GlobalStyle';

interface PageTemplateProps {
  children: ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = props => {
  const { children } = props;
  return (
    <>
      <GlobalStyle />
      <$.Wrap>
        <Navigation />
        <$.Main>{children}</$.Main>
      </$.Wrap>
    </>
  );
};

export default PageTemplate;
