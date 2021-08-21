export const formatPrice = (price: string | number): string => {
  const parsePrice = typeof price === 'string' ? parseInt(price, 10) : price;
  return parsePrice.toLocaleString('ko-KR');
};

export const getToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  let month: string | number = today.getMonth() + 1;
  let date: string | number = today.getDate();
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return [year, month, date].join('-');
};
