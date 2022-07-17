import React, { FC, ReactNode } from 'react';
import * as $ from './PageTemplate.styled';
import Navigation from './Navigation';

interface PageTemplateProps {
    children: ReactNode
}

const PageTemplate: FC<PageTemplateProps> = (props) => {
    const { children } = props;
  return (
      <$.Wrap>
        <Navigation />
        <$.Main>
            {children}
        </$.Main>
      </$.Wrap>
  );
}

export default PageTemplate;
