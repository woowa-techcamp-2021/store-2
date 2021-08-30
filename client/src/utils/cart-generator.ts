import { CartItem } from 'types/cart';
import { cartValidator } from './validation/cart-validator';

const cartGenerator = (data: string): CartItem[] => {
  if (cartValidator()) {
    const cartItems: CartItem[] = [];

    const cartData = data.split(',');
    cartData.forEach((value, idx) => {
      const num = Math.floor(idx / 5);
      switch (idx % 5) {
        case 0:
          cartItems.push({ id: value, thumbnail: '', title: '', count: 0, price: 0 });
          break;
        case 1:
          cartItems[num].thumbnail = value;
          break;
        case 2:
          cartItems[num].title = value;
          break;
        case 3:
          cartItems[num].count = Number(value);
          break;
        case 4:
          cartItems[num].price = Number(value);
          break;
        default:
          break;
      }
    });
    return cartItems;
  }
  return [];
};

export { cartGenerator };
