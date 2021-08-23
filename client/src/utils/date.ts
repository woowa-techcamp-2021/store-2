const formatDate = (dateObj: Date): string => {
  const year = dateObj.getFullYear();
  const monthNum = dateObj.getMonth() + 1;
  const dateNum = dateObj.getDate();
  const month = monthNum > 10 ? monthNum.toString() : `0${monthNum}`;
  const date = dateNum > 10 ? dateNum.toString() : `0${dateNum}`;
  return [year, month, date].join('-');
};

export const getToday = (): string => {
  const dateObj = new Date();
  return formatDate(dateObj);
};

export const getLastWeek = (): string => {
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 7);
  return formatDate(dateObj);
};

export const getLastMonth = (): string => {
  const dateObj = new Date();
  dateObj.setMonth(dateObj.getMonth() - 1);
  return formatDate(dateObj);
};

export const getLastThreeMonth = (): string => {
  const dateObj = new Date();
  dateObj.setMonth(dateObj.getMonth() - 3);
  return formatDate(dateObj);
};
