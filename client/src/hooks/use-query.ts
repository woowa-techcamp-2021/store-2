interface IQuery {
  [key: string]: string;
}

const useQuery = (): IQuery => {
  const { search } = window.location;

  const params: IQuery = {};
  search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str: string, key: string, value: string): string => {
    params[key] = value;
    return '';
  });
  return params;
};

export default useQuery;
