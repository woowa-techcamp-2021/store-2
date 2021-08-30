import React from 'react';
import { compile, serialize, stringify, middleware } from 'stylis';

import useTheme from '../hooks/use-theme';
import generateId from '../utils/generate-id';
import parseString, { ExpType } from '../utils/parse-string';

import reactProps from '../configs/react-props';

export type WoowahanComponent = (
  styleString: TemplateStringsArray,
  ...exps: ExpType
) => (props: ElementProps) => React.ReactElement;

type ElementProps = Record<string, unknown>;

const woowahanComponent =
  (tag: string): WoowahanComponent =>
  (styleString: TemplateStringsArray, ...exps: ExpType): ((props: ElementProps) => React.ReactElement) => {
    const classMap = new Map<string, string>();
    const FuntionComponent = (props: ElementProps): React.ReactElement => {
      const { children } = props;
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

      const nomralisedStyle = serialize(compile(`.${className} {${parsedString}}`), stringify);

      const preprocessedStyle = serialize(
        compile(nomralisedStyle),
        middleware([stringify, element => (element.parent === null ? '\n' : '')]),
      ).trim();

      const styleList = preprocessedStyle.split('\n');

      const styleSheet = document.styleSheets[0];

      if (!isAlreadyInserted) {
        styleList.forEach(style => {
          if (style) {
            styleSheet.insertRule(style, styleSheet.cssRules.length);
          }
        });
      }

      if (props.className) {
        const a = props.className as string;
        className += ` ${a}`;
      }

      const newProps: ElementProps = {};

      Object.entries(props).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          if (!reactProps.includes(key)) newProps[key.toLowerCase()] = value ? 'true' : '';
          else newProps[key] = value;
        } else if (!reactProps.includes(key)) {
          newProps[key.toLowerCase()] = value;
        } else {
          newProps[key] = value;
        }
      });

      const ReactElement = React.createElement(tag, { ...newProps, className }, children as React.ReactNode[]);
      return ReactElement;
    };

    return FuntionComponent;
  };

export default woowahanComponent;
