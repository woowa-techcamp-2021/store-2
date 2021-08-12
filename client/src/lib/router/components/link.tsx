import React, { FC, MouseEvent } from 'react';
import { useHistory } from '../hooks/use-history';

interface ILink {
  to: string;
  replace?: boolean;
}

export const Link: FC<ILink> = ({ children, to, replace: isReplace }) => {
  const { push, replace } = useHistory();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isReplace) {
      replace(to);
    } else {
      push(to);
    }
  };

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
};
