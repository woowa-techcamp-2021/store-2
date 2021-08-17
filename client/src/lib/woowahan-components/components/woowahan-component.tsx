import React, { FC } from 'react';
import { compile, serialize, stringify } from 'stylis';

import useTheme from '../hooks/use-theme';
import generateId from '../utils/generate-id';
import parseString, { IProps, ExpType } from '../utils/parse-string';
import { IThemeContext } from './theme-provider';
import splitStyleString from '../utils/split-style-string';

export type TaggedTemplateType = (styleString: TemplateStringsArray, ...exps: ExpType) => FC<IProps>;

const woowahanComponent = (tag: string): TaggedTemplateType => {
  const classMap = new Map<string, string>();

  return (styleString: TemplateStringsArray, ...exps: ExpType): FC => {
    const FuntionComponent: FC<IThemeContext> = props => {
      const theme = useTheme();
      const parsedString = parseString(styleString, exps, { theme, ...props });

      let className = '';

      const isAlreadyInserted = classMap.has(parsedString);

      if (isAlreadyInserted) {
        className = classMap.get(parsedString) as string;
      } else {
        className = `wc-${generateId()}`;
        classMap.set(parsedString, className);
      }

      const preprocessedStyle = serialize(compile(`.${className} {${parsedString}}`), stringify);
      const styleList = splitStyleString(preprocessedStyle);

      const styleSheet = document.styleSheets[0];

      if (!isAlreadyInserted) {
        styleList.forEach(style => {
          styleSheet.insertRule(style, styleSheet.cssRules.length);
        });
      }

      const { children } = props;
      const ReactElement = React.createElement(tag, { className, theme }, children);

      return ReactElement;
    };

    return FuntionComponent;
  };
};

export default woowahanComponent;
