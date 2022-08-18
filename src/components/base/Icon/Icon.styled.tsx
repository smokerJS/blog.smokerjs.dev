import styled from 'styled-components';

export interface IconStyledProps {
  width: number;
  height: number;
  src: string;
}

export const Icon = styled.i<IconStyledProps>`
  display: block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat;
`;
