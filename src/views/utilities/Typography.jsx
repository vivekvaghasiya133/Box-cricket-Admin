import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { HiDotsVertical } from "react-icons/hi";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatusBox = styled(Box)(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: status === 'Pending' || status === 'block' ? '#e85454' : '#5cd82d',
  color: 'white',
  padding: '2px 7px',
  borderRadius: '4px',
}));

const Typography = () => {
  const [auth, setAuth] = React.useState(true);
  const [menuState, setMenuState] = React.useState({});

  const handleMenu = (event, id) => {
    setMenuState({ ...menuState, [id]: event.currentTarget });
  };

  const handleClose = (id, text) => {
    setMenuState({ ...menuState, [id]: null });
    if (text) {
      axios.put(`http://localhost:3000/approveOwner/${id}`, { status: text })
        .then((res) => {
          getAllowners();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [getAllowner, setGetAllowner] = useState([]);

  useEffect(() => {
    getAllowners();
  }, []);

  const getAllowners = () => {
    axios.get('http://localhost:3000/getOwner')
      .then((res) => {
        setGetAllowner(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainCard title="Owner request" secondary={<SecondaryAction />}>
      <Box sx={{padding:'24px'}}>
      <h1>Owner</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Owner Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllowner.map((data) => (
              <StyledTableRow key={data._id}>
                <StyledTableCell component="th" scope="row">
                  {data.ownerName}
                </StyledTableCell>
                <StyledTableCell align="center">{data.email}</StyledTableCell>
                <StyledTableCell sx={{ display: 'flex', justifyContent: 'center' }} align="center">
                  <StatusBox status={data.status}>{data.status}</StatusBox>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box>
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
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </MainCard>
  );
};

export default Typography;
