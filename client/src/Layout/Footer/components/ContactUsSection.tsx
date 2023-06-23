import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import React from 'react';

interface Props {
  title: string;
  value: string;
  children: React.ReactNode;
}

const ContactUsSection: React.FC<Props> = ({ title, value, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        '& svg': { mr: 1 },
      }}
    >
      {children}
      <Box
        sx={(theme: Theme) => ({
          width: '100%',
          borderBottom: `1px solid ${theme.palette.grey[700]}`,
          pb: 1,
        })}
      >
        <Typography>{title}</Typography>
        <Typography fontWeight="500">{value}</Typography>
      </Box>
    </Box>
  );
};

export default ContactUsSection;
