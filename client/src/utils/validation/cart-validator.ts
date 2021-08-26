const cartValidator = (): boolean => {
  const data = localStorage.getItem('cart') as string;
  if (data !== null) {
    const cartData = data.split(',');
    try {
      if (cartData.length !== 0 && cartData.length % 5 === 0) {
        cartData.forEach((value, idx) => {
          const valueSplit = value.split('.');

          switch (idx % 5) {
            case 0:
              if (Number.isNaN(Number(value))) {
                throw new Error('올바르지 않은 아이템 아이디');
              }
              break;
            case 1:
              if (
                !(
                  value.indexOf('https://storage.googleapis.com/bmart-5482b.appspot.com/') >= 0 &&
                  (valueSplit[valueSplit.length - 1] === 'jpg' || valueSplit[valueSplit.length - 1] === 'png')
                )
              ) {
                throw new Error('올바르지 않은 썸네일 주소');
              }
              break;
            case 2:
              break;
            case 3:
              if (Number.isNaN(Number(value))) {
                throw new Error('올바르지 않은 갯수');
              }
              break;
            case 4:
              if (Number.isNaN(Number(value))) {
                throw new Error('올바르지 않은 가격');
              }
              break;
            default:
              break;
          }
        });
      } else {
        throw new Error('카트 데이터 오류');
      }

      return true;
    } catch (error) {
      localStorage.removeItem('cart');
      return false;
    }
  } else {
    return false;
  }
};

export { cartValidator };
