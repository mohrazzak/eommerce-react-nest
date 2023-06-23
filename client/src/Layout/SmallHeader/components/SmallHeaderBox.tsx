import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

const SmallHeaderBox = styled(Box)<BoxProps>(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5rem 0.25rem',
  backgroundColor: theme.palette.primary.main,
}));

export default SmallHeaderBox;
