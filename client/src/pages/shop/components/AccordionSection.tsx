import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  useTheme,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material';
import {
  BiCheckbox,
  BiCheckboxChecked,
  BiSearch,
  BiUpArrowAlt,
} from 'react-icons/bi';
import UnderlinedHeading from './UnderlinedHeading';
import { useState } from 'react';
interface Props {
  title: string;
  children: React.ReactNode;
}

const AccordionSection = ({ title, children }: Props) => {
  return (
    <Box sx={{ py: 2 }}>
      <Accordion sx={{ boxShadow: 0 }} disableGutters defaultExpanded>
        <AccordionSummary
          sx={{ p: 0 }}
          expandIcon={
            <Box
              sx={{
                backgroundColor: '#eee',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 0.3,
                borderRadius: '50%',
              }}
            >
              <BiUpArrowAlt size={20} />
            </Box>
          }
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <UnderlinedHeading title={title} />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box>{children}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccordionSection;
