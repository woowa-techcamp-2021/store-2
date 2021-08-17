export interface IMenu {
  data: Array<{
    name: string;
    code: string;
    child?: Array<IMenuChild>;
  }>;
}

export interface IMenuChild {
  name: string;
  code: string;
  child?: Array<{ name: string; code: string }>;
}

export interface ICategory {
  name: string;
  code: string;
}
