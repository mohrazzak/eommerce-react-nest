import { Box, Button, Grid, Radio, Typography, useTheme } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import AddressDialog from './AddressDialog';
import React from 'react';
import { IAddress } from '.';
import {
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from '../../../../../features/api/user/addressAPI';
import useToastify from '../../../../../hooks/useToastify';

const Address = ({ address }: { address: IAddress }) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [setDefaultAddress, setDefaultProps] = useSetDefaultAddressMutation();
  const { fireLoading: fireLoadingSetDefault } = useToastify(setDefaultProps);

  const [deleteAddress, deleteAddressProps] = useDeleteAddressMutation();
  const { fireLoading: fireLoadingDelete } = useToastify(deleteAddressProps);

  const theme = useTheme();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSelectDefault = () => {
    if (address.isDefault) return;
    fireLoadingSetDefault();
    setDefaultAddress({ id: address.id });
  };

  const handleDeleteAddress = () => {
    fireLoadingDelete();
    deleteAddress({ id: address.id });
  };
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            p: 2,
            bgcolor: '#fff',
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Box onClick={handleSelectDefault}>
              <Radio checked={address.isDefault} />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                pt: 1,
                ml: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Typography sx={{ fontWeight: '500' }}>
                  {address.name}
                </Typography>
                <Typography
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: 2,
                    py: 0.5,
                    px: 1,
                    fontSize: 14,
                  }}
                >
                  {address.addressName}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', mt: 2, flexWrap: 'wrap' }}>
                  <Typography sx={{ mr: 1, width: '100%' }}>
                    {'Address :'}
                  </Typography>
                  <Typography color="grey">{address.addressLine1}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 2, flexWrap: 'wrap' }}>
                  <Typography sx={{ mr: 1, width: '100%' }}>
                    Postal Code :
                  </Typography>
                  <Typography color="grey">{address.postalCode}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 2, flexWrap: 'wrap' }}>
                  <Typography sx={{ mr: 1, width: '100%' }}>Phone :</Typography>
                  <Typography color="grey">{address.phoneNumber}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={{ bgcolor: theme.palette.grey[200], display: 'flex' }}
                onClick={handleOpenDialog}
              >
                <BiEdit size={20} />
                <Typography fontWeight={'500'} ml={1}>
                  Edit
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6} onClick={handleDeleteAddress}>
              <Button
                fullWidth
                sx={{ bgcolor: theme.palette.grey[200], display: 'flex' }}
              >
                <AiOutlineDelete size={20} />
                <Typography fontWeight={'500'} ml={1}>
                  Delete
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <AddressDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        address={address}
        editing={true}
      />
    </>
  );
};

export default Address;
