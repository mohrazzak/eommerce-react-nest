import { Avatar, Box, Typography, alpha, useTheme } from '@mui/material';
import { Section, SelectedSection } from '..';
import { useAppSelector } from '../../../features/store';

interface Props {
  sections: Section[];
  selectedSection: SelectedSection;
  setSelectedSection: (newSection: SelectedSection) => void;
}

const LeftNavBar = ({
  sections,
  selectedSection,
  setSelectedSection,
}: Props) => {
  const theme = useTheme();
  const userImageURL = useAppSelector((state) => state.auth.imageURL);
  const userName = useAppSelector((state) => state.auth.name);
  return (
    <Box bgcolor="#eee" sx={{ borderRadius: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(https://fastly.picsum.photos/id/287/200/200.jpg?hmac=kXFCSMZE2rF7NM-EFSH6c_nl5HlKQWvwCdE8JYL-YNQ)`,
            backgroundSize: 'cover',
            height: '150px',
            borderRadius: 3,
            objectFit: 'contain',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: -50,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'translateX(-50%)',
            }}
          >
            <Avatar
              alt="User"
              sx={{
                width: '100px',
                height: '100px',
                border: '5px solid white',
                boxShadow: 4,
              }}
              src={userImageURL}
            />
          </Box>
        </Box>
        <Box
          pt={'50px'}
          mt={1}
          px={2}
          pb={2}
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              width: 'calc(100% - 100px)',
              position: 'absolute',
              height: '1px',
              bgcolor: theme.palette.grey[500],
              bottom: 0,
              left: '50px',
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: theme.palette.primary.main,
              fontSize: '1.5rem',
            }}
          >
            {userName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'gray',
            }}
          >
            vicki.pope@gmail.com
          </Typography>
        </Box>
        <Box py={2}>
          {sections.map((section, i) => (
            <Box
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
                  borderLeft: `5px solid ${theme.palette.primary.dark}`,
                },
                '&:hover p': {
                  fontWeight: 'bold',
                },

                // SELECTED
                bgcolor:
                  selectedSection === i
                    ? alpha(theme.palette.primary.light, 0.2)
                    : '',
                borderLeft:
                  selectedSection === i
                    ? `5px solid ${theme.palette.primary.dark}`
                    : '',
                '& p': {
                  fontWeight: selectedSection === i ? 'bold' : '',
                },
              }}
            >
              <section.Icon
                size={24}
                style={{ color: theme.palette.primary.main }}
              />
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: '1.2rem',
                }}
              >
                {section.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LeftNavBar;
