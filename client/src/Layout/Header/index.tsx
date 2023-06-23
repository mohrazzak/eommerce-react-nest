import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import HeaderLogo from './components/HeaderLogo';
import HeaderLinks from './components/HeaderLinks';
import LinksWithIcon from './components/LinksWithIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles/createTheme';
import HeaderData from './data.json';
import LinkWithIcon from './components/LinksWithIcon/LinkWithIcon';
import LeftDrawer from './components/LeftDrawer';
import CartDrawer from './components/CartDrawer';
import AppBar from '@mui/material/AppBar';
const userLink = HeaderData.find((headerData) => headerData.id === 'CART');

const Header: React.FC = () => {
  const [stickHeader, setStickHeader] = useState(false);
  const matchUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setStickHeader(true);
      } else {
        setStickHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      sx={{
        bgcolor: 'white',
        top: 0,
        position: stickHeader ? 'fixed' : 'relative',
        '&': {
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 8%), 0px 4px 5px 0px rgb(0 0 0 / 6%), 0px 1px 10px 0px rgb(0 0 0 /7%)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 2,
          position: 'relative',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!matchUpSm && (
              <>
                <LeftDrawer />
              </>
            )}
            <HeaderLogo />
            {matchUpSm && <HeaderLinks />}
            {matchUpSm ? (
              // The right icons on PC
              <>
                <LinksWithIcon setCartOpen={setCartOpen} />
                <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} />
              </>
            ) : (
              userLink && (
                // The icon on right in the mobile
                <>
                  <LinkWithIcon
                    linkWithIcon={userLink}
                    handleClick={() => setCartOpen((state) => !state)}
                    setCartOpen={setCartOpen}
                  />
                  <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} />
                </>
              )
            )}
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;
