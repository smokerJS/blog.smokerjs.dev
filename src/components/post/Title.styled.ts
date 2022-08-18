import styled from 'styled-components';

export const Wrap = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

export const Container = styled.div`
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 100%;
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

export const Headline = styled.h1`
  @media (min-width: 1024px) {
    font-size: 80px;
  }
  font-size: 6vw;
  white-space: pre;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const CreatedDate = styled.time`
  @media (min-width: 1024px) {
    font-size: 20px;
  }
  display: block;
  font-size: 10px;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  @media (min-width: 1024px) {
    font-size: 24px;
  }
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 80px;
`;

export const Menus = styled.ul`
  display: flex;
  gap: 20px;
`;
export const Menu = styled.li``;
