import { Box, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';

import { BsBox } from 'react-icons/bs';
import * as dayjs from 'dayjs';
import OrderProducts from './OrderProducts';

export enum OrderStatus {
  'Delivered',
  'Pending',
  'Rejected',
}

export interface Product {
  name: string;
  desc: string;
  price: number;
  quantity: number;
  imageURL: string;
}

interface Props {
  id: string;
  status: OrderStatus;
  date: Date;
  products: Product[];
  total: number;
  number: number;
}

function getStatusOfOrder(statusNumber: OrderStatus) {
  switch (statusNumber) {
    case OrderStatus.Delivered:
      return 'Delivered';
    case OrderStatus.Pending:
      return 'Pending';
    case OrderStatus.Rejected:
      return 'Rejected';
  }
}

const Order = ({ date, products, status, total, number }: Props) => {
  const theme = useTheme();
  const namedStatus = getStatusOfOrder(status);
  const statusBackground =
    status === OrderStatus.Delivered
      ? theme.palette.success.light
      : status === OrderStatus.Pending
      ? theme.palette.warning.light
      : theme.palette.error.light;

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 3, mb: 2 }}>
      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          mb: 2,
        }}
      >
        {matchUpMd ? (
          <>
            <Box
              sx={{
                bgcolor: alpha(theme.palette.primary.light, 0.2),
                display: 'flex',
                p: 1,
                borderRadius: '50%',
              }}
            >
              <BsBox
                size={24}
                style={{
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
                p: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '1.1rem' }}>
                  Order #{number}
                </Typography>
                <Typography color="grey">
                  {dayjs(date).format('YYYY-MM-DD') +
                    ' at ' +
                    dayjs(date).format('HH:MM')}
                </Typography>
              </Box>
              <Typography
                sx={{
                  bgcolor: statusBackground,
                  py: 0.5,
                  px: 1,
                  color: '#fff',
                  borderRadius: 3,
                }}
              >
                {namedStatus}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    bgcolor: alpha(theme.palette.primary.light, 0.2),
                    display: 'flex',

                    p: 1,
                    borderRadius: '50%',
                  }}
                >
                  <BsBox
                    size={24}
                    style={{
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    bgcolor: statusBackground,
                    py: 0.5,
                    px: 1,
                    color: '#fff',
                    borderRadius: 3,
                  }}
                >
                  {namedStatus}
                </Typography>
              </Box>
              <Box
                sx={{
                  pt: 2,
                  textAlign: 'left',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '1.1rem' }}>
                    Order #{number}
                  </Typography>
                  <Typography color="grey">
                    {dayjs(date).format('YYYY-MM-DD') +
                      ' at ' +
                      dayjs(date).format('HH:MM')}
                  </Typography>
                </Box>
              </Box>
            </>
          </>
        )}
      </Box>
      <Box>
        <OrderProducts products={products} />
      </Box>
      <Box
        sx={{
          bgcolor: '#eee',
          p: 2,
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          textAlign: { xs: 'center' },
        }}
      >
        <Box
          fontWeight="bold"
          fontSize="1.2rem"
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          Order Total:
          <span
            style={{ marginLeft: '16px', color: theme.palette.success.dark }}
          >
            {'$' + total}
          </span>
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: 'auto' },
            mt: { xs: 1, md: 0 },
            display: { xs: 'none', md: 'block' },
            color: theme.palette.grey[600],
          }}
        >
          5bf142459b72e12b2b1b2cd
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
