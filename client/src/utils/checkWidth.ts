import { SMART_MENU_LARGE_WIDTH, SMART_MENU_SMALL_WIDTH, SMART_MENU_MOBILE_WIDTH } from 'constants/index';

const isLaptop = (width: number): boolean => {
  return width >= SMART_MENU_LARGE_WIDTH;
};

const isSmall = (width: number): boolean => {
  return width <= SMART_MENU_SMALL_WIDTH;
};

const isMobile = (width: number): boolean => {
  return width <= SMART_MENU_MOBILE_WIDTH;
};

export { isLaptop, isSmall, isMobile };
