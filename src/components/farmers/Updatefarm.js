import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useEffect, useState } from 'react'
import axios from 'axios';
import { Grid } from '@mui/material';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '20%',
//     minWidth: '300px',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

function UpdateFarm({openPopupModal}) {
    return (
        <div>
            <Modal
                open = {openPopupModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autocomplete="off"
            >
                <Box 
                    // sx={style}
                >
                    <Typography id="modal-modal-title">
                        Update Farm
                    </Typography>

                    {/* <TextField
                        id='outlined-basic'
                        label="Name"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => setNewFarm({...newFarm, name: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        id='outlined-basic'
                        label="Lattitude"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => setNewFarm({...newFarm, latitude: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        id='outlined-basic'
                        label="Longitude"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => setNewFarm({...newFarm, longitude: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        id='outlined-basic'
                        label="Number of Cages"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => setNewFarm({...newFarm, noOfCages: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        select
                        id='outlined-basic'
                        label="Farm has a Barge?"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        //defaultValue={2}
                        onChange={(e) => setNewFarm({...newFarm, hasBarge: e.target.value})}
                        autoComplete= "off"
                    >
                        {yesNoDropdown.map( (dropDownValue) => (
                            <MenuItem key={dropDownValue.id} value ={dropDownValue.value}>
                                {dropDownValue.label}
                            </MenuItem>
                        ))}
                    </TextField> */}
                    <Button
                        variant='contained'
                        onClick={
                            null
                            //console.log(newFarm)
                            //()=> {handleSubmit()}
                        }
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Submit
                    </Button>
                    <Button
                        variant='contained'
                        onClick={
                            //() => handleClose()
                            null
                        }
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Close
                    </Button>
                </Box>

            </Modal> 
        </div>
    )
}

export default UpdateFarm
