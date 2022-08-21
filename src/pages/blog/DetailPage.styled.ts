import styled, { css } from 'styled-components';

export const Wrap = styled.section`
  display: block;
  position: relative;
  width: 100%;
`;

interface ContentsWrapProps {
  isVisible: boolean;
}

export const ContentsWrap = styled.section<ContentsWrapProps>`
  width: 100%;
  height: 100vh;
  display: block;
  position: absolute;
  top: 100vh;
  overflow-y: auto;
  transition: 1s;

  ${({ isVisible }) => isVisible && css`
    transform: translateY(-100vh);
  `}
`;

export const ContentsConainer = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;
