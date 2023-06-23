import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import profileIMG from '../../../../../assets/images/profile.png';
import { BiEdit } from 'react-icons/bi';
import ProfileDialog from './ProfileDialog';
import { useGetMyInfoQuery } from '../../../../../features/api/user/userAPI';
import PasswordDialog from './PasswordDialog';
import DeleteMyAccountDialog from './DeleteMyAccountDialog';

const Profile = () => {
  const theme = useTheme();
  const userInfo = useGetMyInfoQuery();
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenInfoDialog(true);
  };
  const handleOpenPassword = () => {
    setOpenPasswordDialog(true);
  };
  const handleDeleteMyAccount = () => {
    setOpenDeleteDialog(true);
  };
  return (
    <>
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 3 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
                  Profile about:
                </Typography>
                <IconButton
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.dark },
                  }}
                  onClick={handleOpenDialog}
                >
                  <BiEdit size={16} color={'white'} />
                </IconButton>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    <Typography>Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{userInfo.data?.data.user.name}</Typography>
                  </Grid>
                </Grid>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    <Typography>Phone Number:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      {userInfo.data?.data.user.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    <Typography>Joined at:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{dayjs().format('YYYY - MM - DD')}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
                Login info:
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Grid container mb={1}>
                  <Grid item xs={4}>
                    <Typography>Email:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{userInfo.data?.data.user.email}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={0}>
                  <Grid item xs={4}>
                    <Typography>Password:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>********</Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    mt={2}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button
                      onClick={handleOpenPassword}
                      variant="outlined"
                      fullWidth
                    >
                      Change Password
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: { xs: 1, md: 2 },
                    }}
                  >
                    <Button
                      onClick={handleDeleteMyAccount}
                      variant="outlined"
                      fullWidth
                      color="secondary"
                    >
                      Delete my account
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-end' },
                alignItems: 'center',
                mt: { xs: 2, md: 0 },
              }}
            >
              <Box
                component="img"
                src={profileIMG}
                sx={{
                  maxWidth: '100%',
                  height: { xs: '300px', md: '400px' },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ProfileDialog
        openDialog={openInfoDialog}
        setOpenDialog={setOpenInfoDialog}
        userInfo={{
          name: userInfo.data?.data.user.name,
          phoneNumber: userInfo.data?.data.user.phoneNumber,
        }}
      />
      <PasswordDialog
        openDialog={openPasswordDialog}
        setOpenDialog={setOpenPasswordDialog}
      />
      <DeleteMyAccountDialog
        handleClose={() => {
          setOpenDeleteDialog(false);
        }}
        open={openDeleteDialog}
      />
    </>
  );
};
export default Profile;
