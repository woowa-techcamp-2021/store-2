import React, { FC } from 'react';
import { compile, serialize, stringify, middleware } from 'stylis';

import parseString from '../utils/parse-string';

const createGlobalStyle = (styleString: TemplateStringsArray, ...exps: string[]): FC => {
  const FunctionComponent: FC = () => {
    const parsedString = parseString(styleString, exps, {});

    const preprocessedStyle = serialize(
      compile(parsedString),
      middleware([element => (element.parent === null ? '\n' : ''), stringify]),
    ).trim();

    const styleList = preprocessedStyle.split('\n');

    const styleSheet = document.styleSheets[0];

    styleList.forEach(style => {
      if (style) {
        styleSheet.insertRule(style, styleSheet.cssRules.length);
      }
    });

    const ReactElement = React.createElement(React.Fragment, null, null);

    return ReactElement;
  };

  return FunctionComponent;
};

export default createGlobalStyle;
