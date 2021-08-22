const filterDate = (today: Date) => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return [year, month as string | number, date as string | number];
};

export const getToday = (): string => {
  const today = filterDate(new Date());
  let [year, month, date] = today;
  year += '';
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return [year, month, date].join('-');
};

export const getLastWeek = (): string => {
  const today = filterDate(new Date());
  let [year, month, date] = today;
  year += '';
  date = parseInt(date as string, 10) - 7;
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return [year, month, date].join('-');
};

export const getLastMonth = (): string => {
  const today = filterDate(new Date());
  let [year, month, date] = today;
  year += '';
  month = parseInt(month as string, 10) - 1;
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return [year, month, date].join('-');
};

export const getLastThreeMonth = (): string => {
  const today = filterDate(new Date());
  let [year, month, date] = today;
  year += '';
  month = parseInt(month as string, 10) - 3;
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return [year, month, date].join('-');
};
