import Box from '@mui/material/Box';
import CartItem from './CartItem';
import ICartItem from './interfaces/ICartItem';

const cartItems: ICartItem[] = [
  {
    title:
      'Seagate BarraCuda 2TB Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache 3.5-Inch – Frustration Free Packaging (ST2000DM008)',
    count: 5,
    price: 54.99,
    imageURL: 'https://m.media-amazon.com/images/I/514DyIKQYYL._AC_SL1280_.jpg',
  },
  {
    title:
      'Seagate BarraCuda 2TB Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache 3.5-Inch – Frustration Free Packaging (ST2000DM008)',
    count: 5,
    price: 54.99,
    imageURL: 'https://m.media-amazon.com/images/I/514DyIKQYYL._AC_SL1280_.jpg',
  },
  {
    title:
      'Seagate BarraCuda 2TB Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache 3.5-Inch – Frustration Free Packaging (ST2000DM008)',
    count: 5,
    price: 54.99,
    imageURL: 'https://m.media-amazon.com/images/I/514DyIKQYYL._AC_SL1280_.jpg',
  },
  {
    title: 'Logitech K120 Ergonomic Desktop Wired Keyboard, USB, Black',
    count: 1,
    price: 14.99,
    imageURL:
      'https://images-na.ssl-images-amazon.com/images/I/81PLqxtrJ3L._AC_SL1500_.jpg',
  },
  {
    title:
      'Samsung T5 Portable SSD - 2TB - USB 3.1 External SSD (MU-PA2T0B/AM), Black',
    count: 1,
    price: 249.99,
    imageURL: 'https://m.media-amazon.com/images/I/81khZx00+tL._AC_SL1500_.jpg',
  },
  {
    title:
      'Logitech G502 HERO High Performance Wired Gaming Mouse, HERO 25K Sensor, RGB Lighting, Adjustable Weights, 11 Programmable Buttons, On-Board Memory, PC / Mac',
    count: 2,
    price: 49.99,
    imageURL: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
  },
  {
    title:
      'Crucial MX500 500GB 3D NAND SATA 2.5 Inch Internal SSD, up to 560MB/s - CT500MX500SSD1(Z)',
    count: 1,
    price: 59.99,
    imageURL: 'https://m.media-amazon.com/images/I/81TmfqEBQwL._AC_SL1280_.jpg',
  },
];

const CartItems = ({
  setCartOpen,
}: {
  setCartOpen: (newState: boolean) => void;
}) => {
  return (
    <Box
      sx={{
        overflowY: 'scroll',
      }}
    >
      {cartItems.map((cartItem, i) => (
        <CartItem cartItem={cartItem} key={i} setCartOpen={setCartOpen} />
      ))}
    </Box>
  );
};

export default CartItems;
