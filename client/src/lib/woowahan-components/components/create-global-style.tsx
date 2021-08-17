import React, { FC } from 'react';
import { compile, serialize, stringify } from 'stylis';

import parseString from '../utils/parse-string';
import splitStyleString from '../utils/split-style-string';

const createGlobalStyle = (styleString: TemplateStringsArray, ...exps: string[]): FC => {
  const FunctionComponent: FC = () => {
    const parsedString = parseString(styleString, exps, {});

    const preprocessedStyle = serialize(compile(parsedString), stringify);
    const styleList = splitStyleString(preprocessedStyle);

    const styleSheet = document.styleSheets[0];

    styleList.forEach(style => {
      styleSheet.insertRule(style, styleSheet.cssRules.length);
    });

    const ReactElement = React.createElement(React.Fragment, null, null);

    return ReactElement;
  };

  return FunctionComponent;
};

export default createGlobalStyle;
