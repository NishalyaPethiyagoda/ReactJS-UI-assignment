import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import axios from 'axios';
import { z } from "zod";

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

    const handleClose = () => {
        setAddFarmModal(false);
        setNameError('');
        setLatitudeError('');
        setLongitudeError('');
        setNoOfCagesError('');
        setHasBargeError('');
    }

    const handleAddFarmClick = () => setAddFarmModal(true);

    const schema = z.object({
        name: z.string().nonempty().min(4).max(50),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        noOfCages: z.number().int().positive().max(200),
        hasBarge: z.boolean(),
    });

    // const [errorResult, setErrorResult] =  useState(null);
    const [nameError, setNameError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [noOfCagesError, setNoOfCagesError] = useState('');
    const [hasBargeError, setHasBargeError] = useState('');

    const handleSubmit= () =>{

        const result  = schema.safeParse(newFarm);

        if(!result.success)
        {
            //console.log(result.error.format().latitude._errors)
            //console.log(result.error.format())
            result.error.format().name? setNameError(result.error.format().name._errors[0]) : setNameError('');
            result.error.format().latitude? setLatitudeError(result.error.format().latitude._errors[0]) : setLatitudeError('');
            result.error.format().longitude? setLongitudeError(result.error.format().longitude._errors[0]) : setLongitudeError('');
            result.error.format().noOfCages? setNoOfCagesError(result.error.format().noOfCages._errors[0]): setNoOfCagesError('');
            result.error.format().hasBarge? setHasBargeError(result.error.format().hasBarge._errors[0]): setNoOfCagesError('');

        }
        else{
            axios.post('http://localhost:12759/api/Farm', newFarm )
                .then(response => {
                    console.log(response.data);
                props.onAddFarm();

                setAddFarmModal(false);
                });
        } 
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
                        error = {nameError!==''? true: false}
                        id='outlined-basic'
                        required={true}
                        label="Name"
                        type='text'
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => {
                            setNewFarm({...newFarm, name: e.target.value});
                        }}
                        autoComplete= "off"
                       helperText={nameError}
                    />
                    <TextField
                        error = {latitudeError!==''? true: false}
                        id='outlined-basic'
                        required="true"
                        label="Lattitude"
                        type="number"
                        inputProps={{step: "any"}}
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => {
                            setNewFarm({...newFarm, latitude: parseFloat(e.target.value)});
                        }}
                        autoComplete= "off"
                        helperText= {latitudeError }
                    />
                    <TextField
                        error={longitudeError!==''? true: false}
                        id='outlined-basic'
                        required={true}
                        label="Longitude"
                        type="number"
                        inputProps={{step: "any"}}
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => {
                            setNewFarm({...newFarm, longitude: parseFloat(e.target.value)});
                        }}
                        autoComplete= "off"
                        helperText={longitudeError}
                    />
                    <TextField
                        error={noOfCagesError!==''? true: false}
                        id='outlined-basic'
                        required={true}
                        label="Number of Cages"
                        type="number"
                        inputProps={{inputMode: "numeric"}}
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => {
                            setNewFarm({...newFarm, noOfCages: parseInt(e.target.value)});
                        }}
                        autoComplete= "off"
                        helperText={noOfCagesError}
                    />
                    <TextField
                    
                        select
                        error={hasBargeError!==''? true: false}
                        id='outlined-basic'
                        label="Farm has a Barge?"
                        required={true}
                        sx={{minWidth:295 , marginTop: 3}}
                        variant="outlined"
                        onChange={(e) => {
                            setNewFarm({...newFarm, hasBarge: Boolean(e.target.value)});
                        }}
                        autoComplete= "off"
                        helperText={hasBargeError}
                    >
                        {yesNoDropdown.map( (dropDownValue) => (
                            <MenuItem key={dropDownValue.id} value ={dropDownValue.value}>
                                {dropDownValue.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant='contained'
                        sx = {{margin: 3, minWidth: 100}}
                        onClick={()=> {handleSubmit()}}
                    >
                        Submit
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => {
                            handleClose();
                        }}
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
