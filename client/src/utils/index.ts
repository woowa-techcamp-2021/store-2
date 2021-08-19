interface IQuery {
  [key: string]: string;
}

export const useQuery = (): IQuery => {
  const { search } = window.location;
  const params: IQuery = {};
  search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str: string, key: string, value: string): string => {
    params[key] = value;
    return '';
  });
  return params;
};

export const formatPrice = (price: string | number): string => {
  const parsePrice = typeof price === 'string' ? parseInt(price, 10) : price;
  return parsePrice.toLocaleString('ko-KR');
};
