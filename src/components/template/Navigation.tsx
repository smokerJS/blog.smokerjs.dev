import React, { FC } from 'react';
import { Path } from 'enums/Path';
import Link from 'next/link';
import * as $ from './Navigation.styled';

const Navigation: FC = () => {
  return (
    <$.Navigation>
      <$.Pages>
        <$.Page>
          <Link href={Path.HOME}>HOME</Link>
        </$.Page>
        <$.Page>
          <Link href={Path.BLOG}>BLOG</Link>
        </$.Page>
        <$.Page>
          <$.Anchor href={Path.GITHUB} target="_blank">
            GITHUB
          </$.Anchor>
        </$.Page>
        <$.Page>
          <$.Anchor href={Path.PORTFOLIO} target="_blank">
            PORTFOLIO
          </$.Anchor>
        </$.Page>
      </$.Pages>
    </$.Navigation>
  );
};

export default Navigation;
