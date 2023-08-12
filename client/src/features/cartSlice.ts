import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemProduct } from 'src/interfaces';

interface CartSlice {
  cartItems: CartItemProduct[];
}
const initialState: CartSlice = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state: CartSlice, action: PayloadAction<CartItemProduct>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (cartItemIndex > -1) {
        state.cartItems[cartItemIndex].quantity++;
      }
      state.cartItems.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    deleteCartItem: (
      state: CartSlice,
      action: PayloadAction<CartItemProduct>
    ) => {
      const cartItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (cartItemIndex == -1) return;

      if (state.cartItems[cartItemIndex].quantity == 0)
        state.cartItems.splice(cartItemIndex, 1);

      if (state.cartItems[cartItemIndex].quantity > 0)
        state.cartItems[cartItemIndex].quantity--;

      localStorage.setItem('cart', JSON.stringify(state));
    },
    setCart: (state: CartSlice, action: PayloadAction<CartItemProduct[]>) => {
      state.cartItems = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    },
  },
});

export const { addCartItem, deleteCartItem, setCart } = cartSlice.actions;

export default cartSlice.reducer;
