import React from 'react';
import SmallHeaderBox from './components/SmallHeaderBox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Text slider
// import TextLoop from 'react-text-loop';

import Container from '@mui/material/Container';

export type LinkType = {
  label: string;
  url: string;
};

export type SectionType = {
  title: string;
  body: string;
  link?: LinkType;
};
// const sections: SectionType[] = [
//   {
//     title: 'Breaking News',
//     body: 'Big discount on Friday!',
//     link: { label: 'Shop now!', url: '/shop' },
//   },
//   {
//     title: 'Free Coupon',
//     body: 'Use 50OFF to get 50% discount!',
//   },
// ];

const SmallHeader: React.FC = () => {
  // const [sectionIndex, setSectionIndex] = useState<number>(0);
  // const matchUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  // const section = sections[sectionIndex];
  return (
    <SmallHeaderBox>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* {matchUpSm && (
            <Marquee
              style={{ marginRight: '50px' }}
              delay={2}
              onCycleComplete={() => {
                if (sectionIndex < sections.length - 1)
                  setSectionIndex((index) => ++index);
                else setSectionIndex(0);
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={0}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '.8rem', sm: '1rem' },
                    mr: 1,
                    fontWeight: 'bold',
                  }}
                >
                  {`${section.title}: `}
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '.8rem', sm: '1rem' },
                    mr: 1,
                    mb: 0,
                  }}
                >
                  {section.body}
                </Typography>
                {section.link && (
                  <Typography
                    component={Link}
                    sx={{
                      color: '#fff',
                      fontSize: { xs: '.8rem', sm: '1rem' },
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }}
                    to={section.link.url}
                  >
                    {section.link.label}
                  </Typography>
                )}
              </Box>
            </Marquee>
          )} */}

          <Typography
            sx={{
              ml: 'auto',
              color: '#fff',
              width: { xs: 'auto', sm: '100px' },
            }}
          >
            EN - USD
          </Typography>
        </Box>
      </Container>
    </SmallHeaderBox>
  );
};

export default SmallHeader;
