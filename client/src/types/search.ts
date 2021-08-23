export interface ISearch {
  autoComplete: AutoCompleteKeyword | null;
}

export interface ISearchState {
  keyword: string;
}

export type AutoCompleteKeyword = string[];
