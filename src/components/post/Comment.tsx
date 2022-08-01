import React, { FC } from 'react';
import * as $ from './Comment.styled';
import ReactDisqusComments from 'react-disqus-comments';

const SHORT_NAME = 'smokerjs';
const IDENTIFIER_PREFIX = `https://smokerjs.dev/post/`;

interface CommentProps {
  id: string;
  title: string;
}

const Comment: FC<CommentProps> = props => {
  const { id, title } = props;
  return (
    <$.Wrap>
      <ReactDisqusComments
        shortname={SHORT_NAME}
        identifier={`${IDENTIFIER_PREFIX}${id}`}
        title={title}
      />
    </$.Wrap>
  );
};

export default Comment;