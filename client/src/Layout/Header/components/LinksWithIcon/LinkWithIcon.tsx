import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import Icons from '../../../../assets/icons';
import ILinkWithIcon from '../interfaces/ILinkWithIcon';
import RegisterIcon from '../../../../assets/icons/Register';
import LoginIcon from '../../../../assets/icons/LoginIcon';
import { useNavigate } from 'react-router-dom';
import userImage from '../../../../assets/images/user.png';
import { useAppDispatch, useAppSelector } from '../../../../features/store';
import { clearUser } from '../../../../features/authSlice';
import { BiLogOut, BiUser } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import {
  cartItemApi,
  selectCartItemsData,
} from '../../../../features/api/cartItemAPI';
import {
  selectWishlistItemData,
  wishlistItemApi,
} from '../../../../features/api/wishlistAPI';

const LinkWithIcon = ({
  linkWithIcon,
  handleClick,
  setCartOpen,
  setWishlistOpen,
}: {
  linkWithIcon: ILinkWithIcon;
  handleClick: () => void;
  setCartOpen?: (newState: boolean) => void;
  setWishlistOpen?: (newState: boolean) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const userName = useAppSelector((state) => state.auth.name);
  const userImageURL = useAppSelector((state) => state.auth.imageURL);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const menuOpen = Boolean(anchorElMenu);

  const cartItems = useAppSelector((state) => selectCartItemsData(state));
  const wishlistItems = useAppSelector((state) =>
    selectWishlistItemData(state)
  );
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleLogOut = () => {
    setAnchorElMenu(null);
    dispatch(clearUser());
    setTimeout(() => {
      navigate('signin');
    }, 500);
    dispatch(cartItemApi.util.resetApiState());
    dispatch(wishlistItemApi.util.resetApiState());
  };

  const theme: Theme = useTheme();
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCount = (linkWithIcon: ILinkWithIcon) => {
    if (linkWithIcon.id === 'CART') return cartItems?.length ?? 0;
    if (linkWithIcon.id === 'HEART') return wishlistItems?.length ?? 0;
  };

  const open = Boolean(anchorEl);

  if (linkWithIcon.id === 'USER' && isAuth)
    return (
      <>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClickMenu}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
          >
            <Avatar
              src={userImageURL || userImage}
              sx={{ width: '40px', height: '40px' }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElMenu}
          id="account-menu"
          open={menuOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1,
              px: 2,
              py: 1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
            {userName}
          </Typography>
          <MenuItem
            onClick={() => {
              setAnchorElMenu(null);
              setTimeout(() => {
                navigate('profile');
              }, 500);
            }}
          >
            <ListItemIcon>
              <BiUser size={24} />
            </ListItemIcon>
            <Typography>Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <CiSettings size={24} />
            </ListItemIcon>
            <Typography>Settings</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <BiLogOut size={24} />
            </ListItemIcon>
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </>
    );
  if (linkWithIcon.id === 'USER' && !isAuth) {
    return (
      <>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClickMenu}
            size="small"
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
          >
            {Icons[linkWithIcon.id].icon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElMenu}
          id="account-menu"
          open={menuOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1,
              px: 2,
              py: 1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                p: 2,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              setAnchorElMenu(null);
              setTimeout(() => {
                navigate('signin');
              }, 500);
              // Handle login
            }}
          >
            <ListItemIcon>
              <LoginIcon height="1.2rem" width="1.2rem" />
            </ListItemIcon>
            Sign In
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorElMenu(null);
              setTimeout(() => {
                navigate('signup');
              }, 500); // Handle login
            }}
          >
            <ListItemIcon>
              <RegisterIcon height="1.2rem" width="1.2rem" />
            </ListItemIcon>
            Sign Up
          </MenuItem>
        </Menu>
      </>
    );
  }
  return (
    <IconButton
      aria-owns={open ? linkWithIcon.id : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={() => {
        if (linkWithIcon.id === 'CART') {
          setCartOpen && setCartOpen(true);
          return;
        }
        if (linkWithIcon.id === 'HEART') {
          setWishlistOpen && setWishlistOpen(true);
          console.log('TEST');
          return;
        }
        handleClick();
      }}
    >
      {linkWithIcon.hasCount ? (
        <Badge
          badgeContent={handleCount(linkWithIcon)}
          sx={{
            '& .MuiBadge-badge': {
              top: 20,
              border: `2px solid ${theme.palette.background.paper}`,
              padding: '0 4px',
            },
          }}
          color="secondary"
        >
          {Icons[linkWithIcon.id].icon}
        </Badge>
      ) : (
        Icons[linkWithIcon.id].icon
      )}
    </IconButton>
  );
};

export default LinkWithIcon;
