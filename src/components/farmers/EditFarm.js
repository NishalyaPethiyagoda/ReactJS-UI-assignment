import React, { useState } from 'react'
import  Modal  from '@mui/material/Modal';
import  Box  from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
import { MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
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

function EditFarm( props ) {

    const [farm, setSelectedFarm] = useState(props.selectedFarm);

    const handleSubmit = (farm) => {
        axios.put(`http://localhost:12759/api/Farm/${farm.id}`, farm)
            .then(response => {
                    console.log(response.data)
                    props.onTableRefresh();
                }
                    
            );
        props.setEditPopupModal(false);
            
    }

    const handleCloseModal = () => {
        props.setEditPopupModal(false);
    }

    return (
        <div>
            <Modal
                open = {props.setEditPopupModal}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title">
                        Edit Farm
                    </Typography>
                    <TextField
                        id='outlined-basic'
                        label="Name"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        defaultValue={farm.name}
                        onChange={(e) => setSelectedFarm({...farm, name: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        id='outlined-basic'
                        label="Lattitude"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        defaultValue={farm.latitude}
                        onChange={(e) => setSelectedFarm({...farm, latitude: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        id='outlined-basic'
                        label="Longitude"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        defaultValue={farm.longitude}
                        onChange={(e) => setSelectedFarm({...farm, longitude: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        id='outlined-basic'
                        label="Number of Cages"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        defaultValue={farm.noOfCages}
                        onChange={(e) => setSelectedFarm({...farm, noOfCages: e.target.value})}
                        autoComplete= "off"
                    />
                    <TextField
                        select
                        id='outlined-basic'
                        label="Farm has a Barge?"
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        defaultValue={farm.hasBarge}
                        onChange={(e) => setSelectedFarm({...farm, hasBarge: e.target.value})}
                        autoComplete= "off"
                    >
                        {props.yesNoDropdown.map( (dropDownValue) => (
                            <MenuItem key={dropDownValue.id} value ={dropDownValue.value}>
                                {dropDownValue.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant='contained'
                        onClick={()=> handleSubmit(farm) }
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Submit
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => handleCloseModal()}
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default EditFarm
