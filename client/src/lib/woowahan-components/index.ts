import woowahanComponent, { TaggedTemplateType } from './components/woowahan-component';
import tags from './configs/tag-names';

export { default as createGlobalStyle } from './components/create-global-style';
export { default as ThemeProvider } from './components/theme-provider';

export interface IWoowahan {
  [key: string]: TaggedTemplateType;
}

const styled: IWoowahan = {};

tags.forEach((tag: string) => {
  styled[tag] = woowahanComponent(tag);
});

export default styled;
