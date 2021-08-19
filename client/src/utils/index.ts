export const formatPrice = (price: string | number): string => {
  const parsePrice = typeof price === 'string' ? parseInt(price, 10) : price;
  return parsePrice.toLocaleString('ko-KR');
};
