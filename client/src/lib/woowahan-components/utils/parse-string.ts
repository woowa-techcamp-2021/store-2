import { IThemeContext } from '../components/theme-provider';

export interface IProps {
  children?: React.ReactNode;
  theme?: IThemeContext;
  [key: string]: unknown;
}

export type ExpType = (((props: IProps) => string | undefined) | string | number)[];

const parseString = (styleString: TemplateStringsArray, exps: ExpType, props: IProps): string => {
  return styleString
    .map((string, i) => {
      let expResult = '';
      if (exps[i]) {
        if (typeof exps[i] === 'function') {
          expResult = `${(exps[i] as (props: IProps) => string | number)(props)}`;
        } else if (typeof exps[i] === 'string' || typeof exps[i] === 'number') {
          expResult = `${exps[i] as string | number}`;
        }
      }
      return `${string}${expResult}`;
    })
    .join('');
};

export default parseString;
