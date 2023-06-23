import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  Rating,
  Slider,
  TextField,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import UnderlinedHeading from './components/UnderlinedHeading';
import { BiCheckbox, BiCheckboxChecked, BiSearch, BiX } from 'react-icons/bi';
import AccordionSection from './components/AccordionSection';
import { AiOutlineStar } from 'react-icons/ai';
import { FormikProvider, useFormik } from 'formik';
import { Filter } from '.';
import useDeepCompareEffect from '../../hooks/useDeepEffect';
interface Category {
  id: number;
  name: string;
}

const Sidebar = ({
  drawerOpen,
  handleCloseDrawer,
  MAX_PRICE,
  setFetchFilters,
}: {
  drawerOpen: boolean;
  handleCloseDrawer: () => void;
  MAX_PRICE: number;
  setFetchFilters: (
    filters: { key: string; value: number[] | number | string | null }[]
  ) => void;
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<Filter[]>([
    { key: 'price', value: `from $0 to $${MAX_PRICE}` },
  ]);
  const categories = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
    { id: 3, name: 'test3' },
    { id: 4, name: 'test3' },
    { id: 5, name: 'test3' },
  ];
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(categories);

  function handleClickOnFilter(clickedIndex: number) {
    const clicked = filters.find((_, i) => i === clickedIndex);
    if (clicked?.key === 'price') return;

    const allButClicked = filters.filter((_, index) => index !== clickedIndex);
    setFilters(allButClicked);
    if (clicked) formik.setFieldValue(clicked?.key, null);
    formik.handleSubmit();
  }

  const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: MAX_PRICE / 2,
      label: `$${MAX_PRICE / 2}`,
    },
    {
      value: MAX_PRICE,
      label: `$${MAX_PRICE}`,
    },
  ];

  const formik = useFormik({
    initialValues: {
      rating: null,
      price: [0, MAX_PRICE],
      category: null,
      name: '',
    },
    onSubmit: (values) => {
      console.log('submitted');
      console.log(values);
    },
  });

  useDeepCompareEffect(() => {
    const updatedFilters = Object.entries(formik.values).reduce(
      (acc: Filter[], [key, value]) => {
        if (key === 'name' && value) {
          acc.push({ key, value: `Name is ${value}` });
        }
        if (key === 'price' && value) {
          acc.push({ key, value: `From $${value[0]} to $${value[1]}` });
        }
        if (key === 'rating' && value === null) {
          return [];
        }
        if (key === 'rating' && value !== null) {
          acc.push({ key, value: `Minimum ${value} Stars` });
        }

        if (key === 'category' && value !== null && typeof value === 'number') {
          const selectedCategory =
            categories.find((c) => c.id === value) || null;
          acc.push({ key, value: `Category ${selectedCategory?.name}` });
        }
        return acc;
      },
      []
    );
    setFilters(updatedFilters);
  }, [formik.values]);

  const debounce = (fn: () => void, delay: number) => {
    let timeoutId: number;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fn, delay);
    };
  };

  const delayedFormSubmission = debounce(() => {
    formik.handleSubmit();
  }, 600);

  const handlePriceChange = (v: number[] | number) => {
    formik.setFieldValue('price', v);
  };

  const handleFilter = () => {
    delayedFormSubmission();
    handleCloseDrawer();

    const filterKeys = ['price', 'category', 'name', 'rating'];
    const updatedFetchFilters = filterKeys.map((key) => {
      return { key, value: formik.values[key as keyof typeof formik.values] };
    });
    console.log(updatedFetchFilters);

    setFetchFilters(updatedFetchFilters);
  };

  const handleCategoryChange = (e: Category) => {
    if (formik.values.category === e.id) {
      formik.setFieldValue('category', null);
      return;
    }

    formik.setFieldValue('category', e.id);
  };

  const handleCategorySearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchedName = e.target.value.trim().toLowerCase();
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchedName)
    );
    setFilteredCategories(filtered);
  };

  const handleProductSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchedName = e.target.value.trim().toLowerCase();
    formik.setFieldValue('name', searchedName);
  };

  const handleRatingChange = (v: number | null) => {
    formik.setFieldValue('rating', v);
  };
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const content = (
    <Box
      sx={{ p: 2, px: 4, borderRight: `1px solid ${theme.palette.grey[300]}` }}
    >
      <Box
        mb={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <UnderlinedHeading title="Filters" />
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleFilter}
        >
          Apply filter
        </Button>
      </Box>
      {filters.length === 0 && (
        <Typography sx={{ color: theme.palette.grey[600] }}>
          No filters
        </Typography>
      )}
      <Box sx={{ minHeight: '144px', mb: 2 }}>
        {filters.map((filter, i) => (
          <Box key={i} sx={{ p: 1 }}>
            <Button
              sx={{
                px: 1,
                py: 0.5,
                bgcolor: theme.palette.grey[100],
                borderRadius: 2,
                textTransform: 'lowercase',
              }}
              onClick={() => {
                handleClickOnFilter(i);
              }}
            >
              <Typography px={1} color={theme.palette.grey[600]}>
                {filter.value}
              </Typography>
              {filter.key !== 'price' && (
                <BiX size={24} style={{ color: theme.palette.grey[700] }} />
              )}
            </Button>
          </Box>
        ))}
      </Box>
      <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />

      <Box>
        <AccordionSection title="Product name">
          <Box py={1}>
            <TextField
              label="Product Name"
              variant="outlined"
              size="small"
              id="name"
              fullWidth
              onChange={handleProductSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        bgcolor: theme.palette.grey[300],
                        height: '40px',
                        width: '1px',
                        mx: 1,
                      }}
                    />
                    <BiSearch size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </AccordionSection>
      </Box>
      <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />

      <Box>
        <AccordionSection title="Categories">
          <Box py={1}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              id="search"
              fullWidth
              onChange={handleCategorySearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        bgcolor: theme.palette.grey[300],
                        height: '40px',
                        width: '1px',
                        mx: 1,
                      }}
                    />
                    <BiSearch size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              mt: 1,
              maxHeight: '150px',
              overflowY: 'scroll',
              '::-webkit-scrollbar': { width: '.3rem' },
            }}
          >
            {filteredCategories.length === 0 && (
              <Typography color="grey">No category found</Typography>
            )}
            {filteredCategories.map((e, i) => (
              <Box
                key={i}
                sx={{
                  py: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: '.3s',
                  userSelect: 'none',
                  '&:hover': {
                    bgcolor: theme.palette.grey[50],
                  },
                }}
                onClick={() => {
                  handleCategoryChange(e);
                }}
              >
                <Checkbox
                  size="small"
                  checkedIcon={<BiCheckboxChecked size="24" />}
                  icon={<BiCheckbox size="24" />}
                  checked={e.id === formik.values.category}
                />
                <Typography>{e.name}</Typography>
              </Box>
            ))}
          </Box>
        </AccordionSection>
      </Box>
      <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />

      <Box>
        <AccordionSection title="Price">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box py={2} sx={{ width: '80%' }}>
              <Slider
                sx={{ maxWidth: '100%' }}
                value={formik.values.price}
                onChange={(_, v) => {
                  handlePriceChange(v);
                }}
                size="small"
                max={MAX_PRICE}
                step={50}
                valueLabelFormat={(v: number) => `$${v}`}
                valueLabelDisplay="auto"
                getAriaValueText={(v: number) => `$${v}`}
                marks={marks}
              />
            </Box>
          </Box>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            disabled
            value={`From $${formik.values.price[0]} to $${formik.values.price[1]}`}
          />
        </AccordionSection>
      </Box>
      <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />

      <Box>
        <AccordionSection title="Rating">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
            <Rating
              name="hover-feedback"
              value={formik.values.rating}
              precision={0.5}
              getLabelText={(v: number) => `${v} Stars`}
              onChange={(_, newValue) => {
                handleRatingChange(newValue);
              }}
              emptyIcon={
                <AiOutlineStar style={{ opacity: 0.3 }} fontSize="inherit" />
              }
            />
            <Box
              sx={{
                color: theme.palette.grey[600],
                fontSize: { xs: 14, sm: 16 },
              }}
            >
              {formik.values.rating !== null
                ? `${formik.values.rating} Stars`
                : 'Not selected'}
            </Box>
          </Box>
        </AccordionSection>
      </Box>
      <Divider sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
    </Box>
  );

  return (
    <FormikProvider value={formik}>
      {matchDownMd ? (
        <Drawer anchor="left" open={drawerOpen} onClose={handleCloseDrawer}>
          {content}
        </Drawer>
      ) : (
        <>{content}</>
      )}
    </FormikProvider>
  );
};

export default Sidebar;
