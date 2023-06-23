import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import masterCard from '../../assets/images/master-card.png';
import visa from '../../assets/images/visa.png';
import american from '../../assets/images/american.png';
import discover from '../../assets/images/discover.png';
import giroPay from '../../assets/images/giro-pay.png';

interface PaymentMethod {
  imageURL: string;
  title: string;
}

const paymentMethods: PaymentMethod[] = [
  { title: 'Master Card', imageURL: masterCard },
  { title: 'Visa', imageURL: visa },
  { title: 'American', imageURL: american },
  { title: 'Discover', imageURL: discover },
  { title: 'GiroPay', imageURL: giroPay },
];

const SubFooter = () => {
  return (
    <Box sx={{ pt: 4 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1">
          2023 @Copyright By Mohamad Abdalrazak.
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {[
            paymentMethods.map((paymentMethod, i) => (
              <Box sx={{ width: '40px' }} key={i}>
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  loading="lazy"
                  alt={paymentMethod.title}
                  src={paymentMethod.imageURL}
                />
              </Box>
            )),
          ]}
        </Box>
      </Container>
    </Box>
  );
};

export default SubFooter;
