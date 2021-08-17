import woowahanComponent, { TaggedTemplateType } from './components/woowahan-component';
import tags from './configs/tag-names';

export { default as createGlobalStyle } from './components/create-global-style';
export { default as ThemeProvider } from './components/theme-provider';

export interface IWoowahan {
  [key: string]: TaggedTemplateType;
}

const woowahan: IWoowahan = {};

tags.forEach((tag: string) => {
  woowahan[tag] = woowahanComponent(tag);
});

export default woowahan;
