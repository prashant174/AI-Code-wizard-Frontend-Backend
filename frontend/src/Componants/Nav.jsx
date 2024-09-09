import React, { useContext } from 'react'
import {  NavContainer, Logo } from '../Styled/navStyled'
import { AuthContext } from '../context/Authcontext'
import { GlobalStyles } from './GlobalStyles'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Logout from '@mui/icons-material/Logout';
 import AnimatedImage from "../images/Light_Blue_Sci-Fi_Futuristic_Animated_Logo-removebg-preview.png"
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Nav = () => {

  const {user,logout}=useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const usenavigate=useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete=async()=>{
    try {
      let id=user.userId
      // console.log('id aa rahio hai kya',id)
      const res=await axios.delete("https://codeconverter1.onrender.com/deleteUser/"+id)
      console.log(res.data.msg)
      toast(res.data.msg)
      logout()
      usenavigate("/login")
    } catch (error) {
      console.log(error)
    }
   
  }

  const handleLogout=()=>{
    logout()
    usenavigate("/login")
  }

  return (
    <>
    <GlobalStyles/>
    <NavContainer  >

    {/* <NavItem>Convert</NavItem> */}
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="to convert, debug and quality check">
       <Typography sx={{cursor:'pointer',minWidth: 100 }} onClick={()=>usenavigate("/")}>Convert </Typography>
           </Tooltip>
           <Tooltip title="AI Powered Quiz">
          <Typography sx={{cursor:'pointer',minWidth: 100 }} onClick={()=>usenavigate("/quiz")} > Quiz </Typography>
           </Tooltip>
           <Tooltip title="AI Powered DSA Quiz">
          <Typography sx={{cursor:'pointer',minWidth: 100 }} onClick={()=>usenavigate("/dsaQuestionsList")} > DSA </Typography>
           </Tooltip>
      </Box>

     <Logo src={AnimatedImage} />
     
     
  
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
        <Typography sx={{ minWidth: 100 }}>{user.name}</Typography>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{(user.name).charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
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
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile (working on it)
        </MenuItem>
      
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Account
        </MenuItem>
        <MenuItem  onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

    </NavContainer>
    </>
  )
}

export default Nav