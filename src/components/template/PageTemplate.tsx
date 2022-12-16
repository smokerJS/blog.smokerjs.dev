import React, { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import UIState from 'states/UIState';
import { Path } from 'enums/Path';
import GlobalStyle from './GlobalStyle';
import Navigation from './Navigation';
import * as $ from './PageTemplate.styled';

interface PageTemplateProps {
  children: ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = props => {
  const { children } = props;
  const { pathname } = useRouter();
  const [
    {
      blog: { isVivsibleContents },
    },
  ] = useRecoilState(UIState);

  return (
    <>
      <GlobalStyle />
      <$.Wrap>
        {/* <Navigation /> */}
        <$.Main
          backgroundColor={
            pathname.includes(Path.BLOG) && isVivsibleContents
              ? '#e1f9fa'
              : '#fff'
          }
        >
          {children}
        </$.Main>
      </$.Wrap>
    </>
  );
};

export default PageTemplate;
