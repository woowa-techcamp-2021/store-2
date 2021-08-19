import { useEffect, RefObject } from 'react';

const useOutSideClick = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const element = ref?.current;

      if (!element || element.contains(e.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutSideClick;
