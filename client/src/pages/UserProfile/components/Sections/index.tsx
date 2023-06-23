import { Section, SelectedSection } from '../../';
import { Box, Typography } from '@mui/material';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Wishlist from './Wishlist';
import Addresses from './Addresses';
import Profile from './Profile';

interface Props {
  selectedSection: SelectedSection;
  sections: Section[];
}

const Sections = ({ selectedSection, sections }: Props) => {
  let LoadedSection = <div>test</div>;
  switch (selectedSection) {
    case SelectedSection.DASHBOARD:
      LoadedSection = <Dashboard />;
      break;
    case SelectedSection.ADDRESS:
      LoadedSection = <Addresses />;
      break;
    case SelectedSection.ORDERS:
      LoadedSection = <Orders />;
      break;
    case SelectedSection.PRIVACY:
      LoadedSection = <Profile />;
      break;
    case SelectedSection.PROFILE:
      LoadedSection = <Profile />;
      break;
    case SelectedSection.WISHLIST:
      LoadedSection = <Wishlist />;
      break;
    default:
      LoadedSection = <div>NONE</div>;
  }
  return (
    <Box bgcolor="#eee" sx={{ p: 4, borderRadius: 3 }}>
      <Typography
        sx={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '2rem',
          '&::before': {
            height: '5px',
            width: '100%',
            position: 'absolute',
          },
        }}
      >
        {sections[selectedSection].label}
      </Typography>
      <Box mt={2}>{LoadedSection}</Box>
    </Box>
  );
};

export default Sections;
