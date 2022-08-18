import React, { FC, UIEventHandler } from 'react';
import { PostSummary } from 'models/Post';
import Link from 'next/link';
import { Path } from 'enums/Path';
import Icon from 'components/base/Icon';
import * as $ from './Title.styled';

interface TitleProps extends PostSummary {
  onRollUp: UIEventHandler;
}

const Title: FC<TitleProps> = props => {
  const { title, date, description, onRollUp } = props;

  return (
    <$.Wrap onWheel={onRollUp}>
      <$.Container>
        <$.Headline>{title}</$.Headline>
        <$.CreatedDate>{date}</$.CreatedDate>
        <$.Description>{description}</$.Description>
        <$.Menus>
          <$.Menu>
            <Link href={Path.HOME}>
              <Icon iconType="HOME" width={30} />
            </Link>
          </$.Menu>
          <$.Menu>
            <Link href={Path.BLOG}>
              <Icon iconType="LIST" width={30} />
            </Link>
          </$.Menu>
        </$.Menus>
      </$.Container>
    </$.Wrap>
  );
};

export default Title;
