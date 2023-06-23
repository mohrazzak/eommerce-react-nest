import Grid from '@mui/material/Grid';
import ServiceCard from './ServiceCard';
import { BsTruck } from 'react-icons/bs';
import { CiTimer } from 'react-icons/ci';
import { AiOutlineCreditCard, AiOutlineGift } from 'react-icons/ai';

const SERVICES_CARDS = [
  {
    icon: BsTruck,
    title: 'Free Shipping',
    desc: 'Free Shipping world wide',
  },
  {
    icon: CiTimer,
    title: '24 x 7 Service',
    desc: 'Online Service For 24 x 7',
  },
  {
    icon: AiOutlineCreditCard,
    title: 'Online Pay',
    desc: 'Online Payment Avaible',
  },
  {
    icon: AiOutlineGift,
    title: 'Festival Offer',
    desc: 'Super Sale Upto 50% off',
  },
];

const ServicesCards = () => {
  return (
    <Grid container spacing={3}>
      {SERVICES_CARDS.map((service, i) => (
        <ServiceCard
          key={i}
          Icon={service.icon}
          title={service.title}
          desc={service.desc}
        />
      ))}
    </Grid>
  );
};

export default ServicesCards;
