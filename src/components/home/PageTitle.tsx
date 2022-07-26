import React, { FC } from 'react';
import * as $ from './PageTitle.styled';

const TITLE_TEXT = 'I AM A\nFRONT-END\nDEVELOPER';

const PageTitle: FC = () => {
  return (
    <$.TitleSection>
      <$.TitleText>
        {TITLE_TEXT}
      </$.TitleText>
    </$.TitleSection>
  );
};

export default PageTitle;
