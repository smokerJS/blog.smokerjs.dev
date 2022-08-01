import React, { FC, useEffect } from 'react';
import * as $ from './Content.styled';
import Prism from 'prismjs';

interface ContentProps {
  contentHtml: string;
}

const Content: FC<ContentProps> = props => {
  const { contentHtml } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <$.Wrap>
      <$.Content dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </$.Wrap>
  );
};

export default Content;
