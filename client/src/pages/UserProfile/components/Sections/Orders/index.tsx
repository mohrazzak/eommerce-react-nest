import { Box, Button, useTheme } from '@mui/material';
import Order, { OrderStatus } from './Order';
import { useState } from 'react';

const ITEMS_PER_PAGE = 1;

const Orders = () => {
  const theme = useTheme();

  const orders = [
    {
      id: '1',
      status: OrderStatus.Delivered,
      date: new Date(),
      products: [
        {
          imageURL:
            'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/3.png',
          name: 'Wild-Caught Salmon',
          desc: 'Our wild-caught salmon is sustainably sourced from the pristine waters of Alaska. It is high in omega-3 fatty acids and has a rich, buttery flavor.',
          price: 9.99,
          quantity: 15,
        },
        {
          imageURL:
            'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/4.png',
          name: 'Organic Strawberries',
          desc: 'Our organic strawberries are grown without synthetic pesticides or fertilizers. They are sweet, juicy, and bursting with flavor.',
          price: 3.99,
          quantity: 30,
        },
        {
          imageURL:
            'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/5.png',
          name: 'Artisanal Bread',
          desc: 'Our artisanal bread is made with only the finest ingredients and baked fresh every day. It has a crispy crust and a soft, fluffy interior.',
          price: 5.99,
          quantity: 8,
        },
      ],
      total: 1140,
    },
    {
      id: '2',
      status: OrderStatus.Delivered,
      date: new Date(),
      products: [
        {
          imageURL:
            'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/1.png',
          name: 'Organic Avocado',
          desc: 'This avocado is grown using organic farming methods and is handpicked for optimal ripeness.',
          price: 2.99,
          quantity: 20,
        },
        {
          imageURL:
            'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/2.png',
          name: 'Grass-Fed Beef',
          desc: 'Our grass-fed beef is raised on pasture and never given antibiotics or hormones. It is lean, tender, and packed with flavor.',
          price: 14.99,
          quantity: 10,
        },
        {
          imageURL:
            'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/3.png',
          name: 'Wild-Caught Salmon',
          desc: 'Our wild-caught salmon is sustainably sourced from the pristine waters of Alaska. It is high in omega-3 fatty acids and has a rich, buttery flavor.',
          price: 9.99,
          quantity: 15,
        },
      ],
      total: 1140,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return orders.slice(startIndex, endIndex);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <Box>
          <Button
            onClick={() => setCurrentPage((currentPage) => --currentPage)}
            disabled={currentPage === 1}
          >
            Before
          </Button>
          <Button
            onClick={() => setCurrentPage((currentPage) => ++currentPage)}
            disabled={currentPage === orders.length}
          >
            Next
          </Button>
        </Box>
        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            py: 0.5,
            px: 1,
            color: '#fff',
            borderRadius: 3,
            width: '2rem',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {currentPage}
        </Box>
      </Box>
      <Box>
        {getPaginatedOrders().map((order, i) => (
          <Order
            key={i}
            number={++i}
            date={order.date}
            id={order.id}
            products={order.products}
            status={order.status}
            total={order.total}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Orders;
