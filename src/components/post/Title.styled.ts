import styled from 'styled-components';

export const Wrap = styled.section`
  width: 100%;
  heigth: 100vh;
`;

export const Container = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Headline = styled.h1`
  @media (min-width: 1024px) {
    font-size: 100px;
  }
  font-size: 8vw;
  white-space: pre;
  font-weight: 400;
`;

export const Description = styled.p``;
export const CreatedDate = styled.time``;
