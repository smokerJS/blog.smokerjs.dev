import styled from 'styled-components';

export const TitleSection = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const TitleText = styled.h1`
  @media (min-width: 1024px) {
    font-size: 100px;
  }
  font-size: 8vw;
  white-space: pre;
  font-weight: 400;
`;
