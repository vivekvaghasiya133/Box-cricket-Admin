import React, { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Box, Stack } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { FaStreetView } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
const BoxShow = () => {

    const [box, setBox] = useState([])
    const [img, setImg] = useState()
    useEffect(() => {
        OwnerBoxbyId()
    }, [])
    let { id } = useParams()
    const OwnerBoxbyId = () => {
        axios.get(`https://box-cricket-api.onrender.com/getBox/${id}`)
            .then((res) => {
                console.log(res.data.data);
                setBox([res.data.data])
                setImg(res.data.data.images[0])
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleImg = (img) => {
        // console.log(img);    
        setImg(img)
    }
    return (
        <MainCard title="Dynamic" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
            <Box>
                {box.map((data) => (
                    <Grid container >
                        <Grid xs={6}>
                            <Box>
                                <img width={'100%'} height={'400px'}  src={`https://box-cricket-api.onrender.com/images/${img}`} alt="" />
                            </Box>
                            <Box>
                                <Grid sx={{display:'flex' , justifyContent:'center'}} container>
                                    {data.images.map((img , i) => (
                                        <>
                                            <Grid xs={3}>
                                                <Box className="size" sx={{ padding: '10px 10px'}}><img height='100px'  onClick={()=>handleImg(img)} width={'100%'} src={`https://box-cricket-api.onrender.com/images/${data.images[i]}`} alt="" /></Box>
                                            </Grid>
                                            
                                        </>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid xs={6}>

                            <Stack>
                                <Box sx={{ margin: '0px 10px' }} >
                                    <Typography sx={{ margin: '10px 0px' }} variant='h2'>{data.boxName}</Typography>
                                    <Box sx={{ margin: '5px 0px' }}>
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'>Contact No : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'>{data.contact}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }}    >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'>Street : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'>{data.address.street}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> area : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.address.area}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> city : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.address.city}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> state : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.address.state}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> pinCode : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.address.pinCode}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> country : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.address.country}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }}>
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> morningPrice : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.opning.morning.morningPrice}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> nightPrice : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.opning.night.nightPrice}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ margin: '5px 0px' }} >
                                        <Grid container>
                                            <Grid xs={6}><Typography variant='h5'> status : </Typography></Grid>
                                            <Grid xs={6}><Typography variant='h5'> {data.status}</Typography></Grid>
                                        </Grid>
                                    </Box>
                                </Box>

                            </Stack>

                        </Grid>
                    </Grid>
                ))}
            </Box>
        </MainCard>
    )
}

export default BoxShow