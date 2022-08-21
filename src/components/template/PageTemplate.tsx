import React, { FC, ReactNode } from 'react';
import * as $ from './PageTemplate.styled';
import Navigation from './Navigation';
import GlobalStyle from './GlobalStyle';
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import UIState from 'states/UIState'
import { Path } from 'enums/Path'

interface PageTemplateProps {
  children: ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = props => {
  const { children } = props;
  const { pathname } = useRouter();
  const [{ blog : {
    isVivsibleContents
  } }]  = useRecoilState(UIState);

  return (
    <>
      <GlobalStyle />
      <$.Wrap>
        {/* <Navigation /> */}
        <$.Main backgroundColor={pathname.includes(Path.BLOG) && isVivsibleContents ? '#e1f9fa' : '#fff'}>{children}</$.Main>
      </$.Wrap>
    </>
  );
};

export default PageTemplate;
