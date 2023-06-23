import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import HeaderData from '../../data.json';
import LinkWithIcon from './LinkWithIcon';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import CloseIcon from '../../../../assets/icons/CloseIcon';
import { useState, useRef, useEffect, SetStateAction, Dispatch } from 'react';
import sliceProdTitle from '../utils/sliceTitle';
import ISearchItem from '../interfaces/ISearchItem';
import { motion, AnimatePresence } from 'framer-motion';

const linksWithIcon = HeaderData.filter(
  (headerData) => headerData.type === 'RIGHT_ICON'
);
const searchData = HeaderData.find(
  (headerData) => headerData.type === 'SEARCH'
);

const searchItems: ISearchItem[] = [
  {
    title:
      'Seagate BarraCuda 2TB Internal Hard Drive HDD – 3.5 Inch 6Gb/s 7200 RPM 256MB Cache 3.5-Inch – Frustration Free Packaging (ST2000DM008)',
    url: '/products/1',
  },
  {
    title: 'Logitech K120 Ergonomic Desktop Wired Keyboard, USB, Black',
    url: '/products/2',
  },
];
const AnimatedBox = motion(Box);

const LinksWithIcon = ({
  setCartOpen,
}: {
  setCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [searchedProducts, setSearchedProducts] = useState<ISearchItem[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const toggleSearch = () => {
    setSearchOpen((state) => !state);
  };

  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const latestSearchQuery = useRef<string | undefined>();

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
    <Box
      sx={{
        ml: 'auto',
        display: 'flex',
        '& > *:not(:last-child, .search-con)': { mr: 1 },
      }}
    >
      <AnimatePresence>
        {searchOpen && (
          <AnimatedBox
            initial={{ width: 0 }}
            animate={{ width: '' }}
            exit={{ opacity: 0, width: 0 }}
            p={1}
            className="search-con"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              bgcolor: '#fff',
              transform: 'translate(-50%,-50%)',
              height: '3rem',
              width: { sm: '100%', md: '50%', lg: '35%', xl: '30%' },
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{ width: { sm: '70%', md: '100%' }, position: 'relative' }}
            >
              <TextField
                sx={{ width: '100%' }}
                name="search"
                placeholder="Search"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="start">
                        <IconButton
                          sx={{ color: 'hotpink' }}
                          onClick={() => {
                            toggleSearch();
                            setSearchedProducts([]);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                  startAdornment: (
                    <InputAdornment position="end" sx={{ mr: 2 }}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
              {searchedProducts.length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    background: '#eee',
                    borderRadius: '10px',
                    width: '100%',
                    mt: 1,
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
                        setSearchedProducts([]);
                        setSearchOpen(false);
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
                        {sliceProdTitle(searchItem.title, 60)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </AnimatedBox>
        )}
      </AnimatePresence>
      {searchData && (
        <LinkWithIcon handleClick={toggleSearch} linkWithIcon={searchData} />
      )}
      {linksWithIcon.map((linkWithIcon, i) => (
        <LinkWithIcon
          setCartOpen={setCartOpen}
          linkWithIcon={linkWithIcon}
          key={i}
          handleClick={() => navigate(linkWithIcon.url)}
        />
      ))}
    </Box>
  );
};

export default LinksWithIcon;
