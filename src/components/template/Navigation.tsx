import React, { FC } from 'react';
import * as $ from './Navigation.styled';
import { Path } from 'enums/Path';
import Link from 'next/link'

const Navigation: FC = () => {


  return (
      <$.Navigation>
        <$.Pages>
            <$.Page>
                <Link href={Path.HOME}>
                    HOME
                </Link>
            </$.Page>
            <$.Page>
                <Link href={Path.BLOG}>
                    BLOG
                </Link>
            </$.Page>
            <$.Page>
                <Link href={Path.GITHUB} target="_blank">
                    GITHUB
                </Link>
            </$.Page>
            <$.Page>
                <Link href={Path.PORTFOLIO} target="_blank">
                    PORTFOLIO
                </Link>
            </$.Page>
        </$.Pages>
      </$.Navigation>
  );
}

export default Navigation;
