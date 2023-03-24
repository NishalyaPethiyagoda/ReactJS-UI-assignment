import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    minWidth: '300px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AddFarm(props) {

    const [openAddFarmModal, setAddFarmModal] = useState(false);
    const [newFarm , setNewFarm] = useState(null);

    const yesNoDropdown = [
        {id: 1, label: "Yes", value: true},
        {id: 2, label: "No" , value: false},
    ];

    const handleClose = () => setAddFarmModal(false);
    const handleAddFarmClick = () => setAddFarmModal(true);

    const handleSubmit= () =>{
        axios.post('http://localhost:12759/api/Farm', newFarm )
        .then(response => {
            console.log(response.data);
           props.onAddFarm();
           setAddFarmModal(false);
        });
    }

    return (
        <div>
            <Button
                variant='contained'
                onClick={() => handleAddFarmClick()}
            >
                Add Farm
            </Button>
            <Modal
                open = {Boolean(openAddFarmModal)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title">
                        Add Farm
                    </Typography>

                    <TextField
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
                    </TextField>
                    <Button
                        variant='contained'
                        onClick={
                            //null
                            //console.log(newFarm)
                            ()=> {handleSubmit()}
                        }
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Submit
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => handleClose()}
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Close
                    </Button>
                </Box>

            </Modal>
        </div>
    )
}

export default AddFarm
