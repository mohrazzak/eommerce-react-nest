import { Box, Button, Grid } from '@mui/material';

import Address from './Address';
import AddressDialog from './AddressDialog';
import React from 'react';

import { useGetAddressesQuery } from '../../../../../features/api/user/addressAPI';

export interface IAddress {
  id: number;
  addressLine1: string;
  postalCode: string;
  phoneNumber: string;
  name: string;
  addressName: string;
  email: string;
  addressLine2: string;
  country: string;
  state: string;
  isDefault: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const Addresses = () => {
  const { data } = useGetAddressesQuery();

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add new address
      </Button>
      <Grid container sx={{ mt: 2 }} spacing={4}>
        {data?.data.addresses.map((address, i) => (
          <Address key={i} address={address} />
        ))}
        <AddressDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </Grid>
    </Box>
  );
};

export default Addresses;
