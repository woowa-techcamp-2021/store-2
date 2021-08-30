import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateProps {
  cart: string;
}

const initialState: StateProps = {
  cart: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: state => {
      const cart = localStorage.getItem('cart');
      if (cart) state.cart = cart;
      return state;
    },
    setCart: (state, action: PayloadAction<string>) => {
      localStorage.setItem('cart', action.payload);
      state.cart = action.payload;
      return state;
    },
  },
});

const { actions, reducer: cartReducer } = cartSlice;
export const { loadCart, setCart } = actions;
export { cartReducer };
