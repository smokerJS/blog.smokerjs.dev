import React, { FC } from 'react';
import { PostSummary } from 'models/Post';
import * as $ from './Title.styled';

interface TitleProps extends PostSummary {}

const Title: FC<TitleProps> = props => {
  const { title, date, description } = props;
  return (
    <$.Wrap>
      <$.Container>
        <$.Headline>{title}</$.Headline>
        <$.Description>{description}</$.Description>
        <$.CreatedDate>{date}</$.CreatedDate>
      </$.Container>
    </$.Wrap>
  );
};

export default Title;
