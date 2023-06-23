import { Container, Grid } from '@mui/material';
import { IconType } from 'react-icons';
import { BiHeart, BiHome, BiShield } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { useState } from 'react';
import Sections from './components/Sections';
import TopNavBar from './components/TopNavBar';
import LeftNavBar from './components/LeftNavBar';

export interface Section {
  label: string;
  Icon: IconType;
}

const sections: Section[] = [
  { label: 'Dashboard', Icon: BiHome },
  { label: 'Orders', Icon: BsBoxSeam },
  { label: 'Wishlist', Icon: BiHeart },
  { label: 'Address', Icon: GoLocation },
  { label: 'Profile', Icon: FiUser },
  { label: 'Privacy', Icon: BiShield },
];

export enum SelectedSection {
  DASHBOARD,
  ORDERS,
  WISHLIST,
  ADDRESS,
  PROFILE,
  PRIVACY,
}

const UserProfile = () => {
  const [selectedSection, setSelectedSection] = useState<SelectedSection>(
    SelectedSection.ADDRESS
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item sx={{ display: { xs: 'none', lg: 'block' } }} md={0} lg={3}>
          <LeftNavBar
            sections={sections}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </Grid>
        <Grid item sx={{ display: { lg: 'none', xs: 'block' } }} xs={12} lg={0}>
          <TopNavBar
            sections={sections}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Sections selectedSection={selectedSection} sections={sections} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
