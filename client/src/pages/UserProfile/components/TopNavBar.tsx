import { Box, Grid, Typography, alpha, useTheme } from '@mui/material';
import { Section, SelectedSection } from '..';

interface Props {
  sections: Section[];
  selectedSection: SelectedSection;
  setSelectedSection: (newSection: SelectedSection) => void;
}

const TopNavBar = ({
  sections,
  selectedSection,
  setSelectedSection,
}: Props) => {
  const theme = useTheme();

  return (
    <Box bgcolor="#eee" sx={{ borderRadius: 3, p: 2 }}>
      <Grid
        container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
        spacing={2}
      >
        {sections.map((section, i) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={i}
            onClick={() => setSelectedSection(i)}
            sx={{
              p: 1,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 4,
              transition: '.2s',
              cursor: 'pointer',
              userSelect: 'none',

              '&:hover': {
                bgcolor: alpha(theme.palette.primary.light, 0.2),
              },
              '&:hover p': {
                fontWeight: 'bold',
              },

              // SELECTED
              bgcolor:
                selectedSection === i
                  ? alpha(theme.palette.primary.light, 0.2)
                  : '',

              '& p': {
                fontWeight: selectedSection === i ? 'bold' : '',
              },
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: '1.2rem',
              }}
            >
              {section.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopNavBar;
