import styled, { css } from 'styled-components';

interface MainProps {
  backgroundColor?: string;
}

export const Main = styled.main<MainProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  transition: 1s;
`;

export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: block;
  /* padding-top: 50px; */
`;
