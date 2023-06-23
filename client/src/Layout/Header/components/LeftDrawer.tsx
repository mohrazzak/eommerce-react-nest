import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme, Theme } from '@mui/material/styles';

import icons from '../../../assets/icons';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { useState, useRef, useEffect } from 'react';
import HeaderData from '../data.json';
import { Link, useNavigate } from 'react-router-dom';
import ILinkWithIcon from './interfaces/ILinkWithIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import SearchIcon from '../../../assets/icons/SearchIcon';
import userImage from '../../../assets/images/user.png';
import ISearchItem from './interfaces/ISearchItem';
import sliceProdTitle from './utils/sliceTitle';
import { useAppSelector } from '../../../features/store';

const order = ['HOME', 'BAG', 'HEART', 'QUESTION'];

const orderedData = order
  .map((key) => HeaderData.find((item) => item.id === key))
  .filter((item) => item !== undefined) as ILinkWithIcon[];
const searchItems: ISearchItem[] = [
  {
    title:
      'Seagate BarraCuda 2TB Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache 3.5-Inch – Frustration Free Packaging (ST2000DM008)',
    url: '/products/1',
  },
  {
    title: 'Logitech K120 Ergonomic Desktop Wired Keyboard, USB, Black',
    url: '/products/2',
  },
];
const LeftDrawer = () => {
  const theme: Theme = useTheme();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [searchedProducts, setSearchedProducts] = useState<ISearchItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const latestSearchQuery = useRef<string | undefined>();
  const userName = useAppSelector((state) => state.auth.name);
  useEffect(() => {
    if (!searchQuery || searchQuery?.trim() === '') {
      setSearchedProducts([]);
      return;
    }
    const timerId = setTimeout(() => {
      latestSearchQuery.current = searchQuery;
      search();
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function search() {
    const regex = new RegExp(latestSearchQuery.current || '', 'i');
    const filteredProducts = searchItems.filter((prod) =>
      regex.test(prod.title)
    );
    console.log(`Searching for "${latestSearchQuery.current}"...`);
    setSearchedProducts(filteredProducts);
  }

  return (
    <>
      <IconButton sx={{ mr: 1 }} onClick={() => setIsDrawerOpen(true)}>
        {icons.MENU.icon}
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          width={'250px'}
          textAlign="center"
          role="presentation"
          sx={{ height: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1,
              boxShadow: '-4px 8px 9px 3px #d7d7d757',
              bgcolor: '#eee',
              // mb: 2,
              fontWeight: 'bold',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                fontSize: '1.2rem',
              }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={() => setIsDrawerOpen(false)}
              sx={{
                color: 'tomato',
              }}
            >
              <CloseIcon height="30px" width="30px" />
            </IconButton>
          </Box>
          <Box
            sx={{
              '& > *': {
                '&:hover': { color: theme.palette.primary.dark },
              },
              p: 2,
              pb: 5,
              display: 'flex',
              justifyContent: 'space-between',
              height: 'calc(100% - 62px)',
              flexDirection: 'column',
            }}
          >
            <Box>
              <Box
                p={1}
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  p: 0,
                  mb: 3,
                  border: 'none !important',
                  position: 'relative',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <TextField
                    autoComplete="off"
                    name="search"
                    sx={{ width: '100%' }}
                    placeholder="Search"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChange}
                  />
                </Box>
                {searchedProducts.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      background: '#eee',
                      borderRadius: '10px',
                      width: '100%',
                      top: 30,
                      mt: 1,
                      zIndex: 2,
                      p: 1,
                      '& > div:not(:last-child)': {
                        mb: 1,
                      },
                    }}
                  >
                    {searchedProducts.map((searchItem, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          background: '#fff',
                          p: 1,
                        }}
                        onClick={() => {
                          setIsDrawerOpen(false);
                          setSearchedProducts([]);
                        }}
                      >
                        <Typography
                          component={Link}
                          to={searchItem.url}
                          sx={{
                            width: '100%',
                            color: theme.palette.primary.main,
                          }}
                        >
                          {sliceProdTitle(searchItem.title, 20)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Box sx={{ mb: 4 }}>
                {orderedData.map((link, i) => (
                  <Box
                    key={i}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate(link.url);
                    }}
                    sx={{
                      display: 'flex',
                      cursor: 'pointer',
                      alignItems: 'center',
                    }}
                  >
                    {
                      <Box>
                        {link.hasCount ? (
                          <Badge
                            badgeContent={4}
                            sx={{
                              '& .MuiBadge-badge': {
                                top: 20,
                                border: `2px solid ${theme.palette.background.paper}`,
                                padding: '0 4px',
                              },
                            }}
                            color="secondary"
                          >
                            {icons[link.id].icon}
                          </Badge>
                        ) : (
                          icons[link.id].icon
                        )}
                      </Box>
                    }
                    <Typography
                      key={i}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        p: 2,
                        mr: 1,
                        fontWeight: 'bold',
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              {isAuth ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    alt="User image"
                    src={userImage}
                    sx={{ width: '100px', height: '100px', mb: 1 }}
                  />
                  <Typography
                    sx={{ fontSize: '1.4rem', fontWeight: 'bold', mb: 3 }}
                  >
                    {userName}
                  </Typography>
                  <Button
                    variant="contained"
                    color={'primary'}
                    sx={{ width: '100%', mb: 2 }}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate('/account');
                    }}
                  >
                    my account
                  </Button>
                  <Button
                    variant="contained"
                    color={'secondary'}
                    sx={{ width: '100%' }}
                    onClick={() => {
                      setIsDrawerOpen(false);
                    }}
                  >
                    logout
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    sx={{ width: '100%', mb: 2 }}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate('/signin');
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    color={'secondary'}
                    sx={{ width: '100%' }}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate('/signup');
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default LeftDrawer;
