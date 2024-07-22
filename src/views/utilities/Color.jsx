import React from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Box } from '@mui/system';
import { Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HiDotsVertical } from 'react-icons/hi';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


// ===============================|| COLOR BOX ||=============================== //


// ===============================|| UI COLOR ||=============================== //

const StatusBox = styled(Box)(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: status === 'Pending' || status === 'block' ? '#e85454' : '#5cd82d',
  color: 'white',
  padding: '2px 7px',
  borderRadius: '4px',
}));


const UIColor = () => {

  const navigate = useNavigate()
  const [menuState, setMenuState] = React.useState({});

  const handleMenu = (event, id) => {
    setMenuState({ ...menuState, [id]: event.currentTarget });
  };

  const handleClose = (id, text) => {
    setMenuState({ ...menuState, [id]: null });
    if (text) {
      axios.put(`https://box-cricket-api.onrender.com/approveBox/${id}`, { status: text })
        .then((res) => {
          getAllbox();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [box, setBox] = useState([])
  useEffect(() => {
    getAllbox()
  }, [])

  const getAllbox = () => {
    axios.get('https://box-cricket-api.onrender.com/getAllBox')
      .then((res) => {
        console.log(res.data.data);
        setBox(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handlePath = (id) => {
    navigate(`/admin/box/${id}`)
  }

  return (
    <MainCard title="Box request" secondary={<SecondaryAction link="" />}>
      <Box sx={{margin:'0px' , padding:{sm : '24px'}}}>
        <Grid container >

          {box.map((data, i) => (
            <Grid key={i} lg={3} md={6} xs={12} sx={{ padding: '10px 10px' }}>
              <Box sx={{ border: '1px solid black', borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 0px 3px #ccc', transition: 'all 0.5s', '&:hover': { boxShadow: '0px 10px 30px #ddd' }, }}>
                <Box sx={{ margin: '10px' }} >
                  <Box onClick={() => handlePath(data._id)} >
                    <img src={`https://box-cricket-api.onrender.com/images/${data.images[0]}`} style={{
                      width: '100%',
                      maxWidth: '246px',
                      height: '164px'
                    }}  alt="" />
                    <h3>{data.boxName}</h3>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0px' }}>
                      <Typography>{data.address.area}</Typography>
                      <Typography>{data.contact}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0px' }}>
                      <Typography>MorningPrice <b>:</b> </Typography>
                      <Typography>{data.opning.morning.morningPrice}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0px' }}>
                      <Typography>NightPrice <b>:</b> </Typography>
                      <Typography>{data.opning.night.nightPrice}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0px' }}>
                    <StatusBox status={data.status}>{data.status}</StatusBox>
                    <Typography>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(e) => handleMenu(e, data._id)}
                        color="inherit"
                      >
                        <HiDotsVertical fontSize={'20px'} />
                      </IconButton>
                      <Menu
                        id={`menu-appbar-${data._id}`}
                        anchorEl={menuState[data._id]}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(menuState[data._id])}
                        onClose={() => handleClose(data._id)}
                      >
                        <MenuItem onClick={() => handleClose(data._id, 'Pending')}>Pending</MenuItem>
                        <MenuItem onClick={() => handleClose(data._id, 'approved')}>Approve</MenuItem>
                        <MenuItem onClick={() => handleClose(data._id, 'block')}>Block</MenuItem>
                      </Menu>
                    </Typography>

                  </Box>

                </Box>
              </Box>
            </Grid>

          ))}


        </Grid>
      </Box>
    </MainCard>
  );
};

export default UIColor;
