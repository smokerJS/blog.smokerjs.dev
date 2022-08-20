import React, { FC } from 'react';
import { IconMap, IconType } from './IconMap';
import * as $ from './Icon.styled';

interface IconProps {
  width?: number;
  height?: number;
  iconType: IconType;
}

const Icon: FC<IconProps> = props => {
  const { width = 50, height, iconType } = props;
  return (
    <$.Icon
      src={IconMap[iconType].src}
      width={width}
      height={height || width}
      aria-label={iconType}
    />
  );
};

export default Icon;
