import React, { FC } from 'react';
import { PostSummary } from 'models/Post';
import Link from 'next/link';
import { Path } from 'enums/Path';
import Icon from 'components/base/Icon';
import useTouchMove, { TouchMoveHandler } from 'hooks/useTouchMove';
import * as $ from './Title.styled';

interface TitleProps extends PostSummary {
  onTouchMove: TouchMoveHandler;
}

const Title: FC<TitleProps> = props => {
  const { title, date, description, onTouchMove } = props;
  const { handleTouchStart, handleTouchEnd } = useTouchMove(onTouchMove);

  return (
    <$.Wrap
      onWheel={onTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
