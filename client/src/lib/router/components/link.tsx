import React, { FC, MouseEvent } from 'react';
import useHistory from '../hooks/use-history';

interface ILink {
  className?: string;
  to: string;
  replace?: boolean;
}

const Link: FC<ILink> = ({ children, className = '', to, replace: isReplace }) => {
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
    <a className={className} href={to} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;
