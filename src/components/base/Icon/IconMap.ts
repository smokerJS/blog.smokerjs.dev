import { StaticImageData } from 'next/image';
import HomeSrc from 'public/images/icons/icon-home.png';
import ListSrc from 'public/images/icons/icon-list.png';

export type IconType = 'HOME' | 'LIST';

export type IconMapType = {
  [key in IconType]: StaticImageData;
};

export const IconMap: IconMapType = {
  HOME: HomeSrc,
  LIST: ListSrc,
};
