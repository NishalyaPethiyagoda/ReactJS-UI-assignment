import React, { useState } from 'react'
import  Modal  from '@mui/material/Modal';
import  Box  from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
import { MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import {z} from "zod";
import { Container } from '@mui/system';

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

  const imgContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '130px',
    height: '130px', // Change this value as needed
    
  };

function EditFarm( props ) {

    const [farm, setSelectedFarm] = useState({
        id: props.selectedFarm.id,
        name: props.selectedFarm.name,
        latitude: props.selectedFarm.latitude,
        longitude: props.selectedFarm.longitude,
        noOfCages: props.selectedFarm.noOfCages,
        hasBarge: props.selectedFarm.hasBarge,
        imageName: props.selectedFarm.imageName,
        imageFile: props.selectedFarm.imageFile,
    });

    const validationSchema = z.object({
        name: z.string().min(4).max(50).regex(/^[a-zA-Z ]*$/),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        noOfCages: z.number().int().positive().max(200),
        hasBarge: z.boolean(),
    });

    const [nameError, setNameError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [noOfCagesError , setNoOfCagesError] = useState('');
    const [hasBargeError , setHasBargeError] = useState('');
    const [hasImageError, setHasImageError] = useState('');


    const handleSubmit = async (farm) => {
        
        const isInvalidSubmit = validationSchema.safeParse(farm);

        if(farm.imageFile === null)
        {
            setHasImageError('error');
        }
        else{

            if(!isInvalidSubmit.success){
                isInvalidSubmit.error.format().name? setNameError( isInvalidSubmit.error.format().name._errors[0] ): setNameError('');
                isInvalidSubmit.error.format().latitude? setLatitudeError( isInvalidSubmit.error.format().latitude._errors[0]): setLatitudeError('');
                isInvalidSubmit.error.format().longitude? setLongitudeError( isInvalidSubmit.error.format().longitude._errors[0]): setLongitudeError('');
                isInvalidSubmit.error.format().noOfCages? setNoOfCagesError( isInvalidSubmit.error.format().noOfCages._errors[0]): setNoOfCagesError('');
                isInvalidSubmit.error.format().hasBargeError? setHasBargeError( isInvalidSubmit.error.format().hasBargeError._errors[0]): setHasBargeError('');
            }
            else{
                
                const formData = new FormData();
    
                formData.append("Name", farm.name);
                formData.append("Latitude", farm.latitude);
                formData.append("Longitude", farm.longitude);
                formData.append("NoOfCages", farm.noOfCages);
                formData.append("HasBarge", farm.hasBarge);
                formData.append("ImageFile", farm.imageFile);
    
                try {
                    const response = await axios.put(`http://localhost:12759/api/Farm/${farm.id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                        })
                    .then(response => {
                        console.log(response.data);
    
                        props.onTableRefresh();
                        props.setEditPopupModal(false);
                    });
    
                    console.log("Update successful:", response.data);
    
                } catch (error) 
                {
                    console.error("Update failed:", error);  
                }
            }   
        }
        
    }

    const handleCloseModal = () => {
        props.setEditPopupModal(false);
    }

    return (
        <div>
            <Modal
                open = {Boolean(props.setEditPopupModal)}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title">
                        Edit Farm
                    </Typography>

                    <Container 
                            sx={{backgroundColor: 'grey', marginTop:1, marginBottom: 1}}
                            style={imgContainerStyle}
                        >
                            <img 
                                src={ farm.imageName } 
                                alt="Default Farm Image" 
                                style={imgContainerStyle}>
                            </img>
                    </Container>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{width: '100%', height: 25, backgroundColor: hasImageError==='error'? 'red': 'blue', }}
                        >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept='image/*'
                            //defaultValue= { farm.imageName}
                            onChange={(e) => 
                                
                                    {
                                        const reader = new FileReader;
                                        const file = e.target.files[0];

                                        reader.onload = (event) =>{
                                            setSelectedFarm({
                                                ...farm,
                                                imageFile: file,
                                                imageName: event.target.result,
                                            })
                                        };

                                        reader.readAsDataURL(file);

                                        setHasImageError('');
                                    }
                            }
                        />
                    </Button>

                    <TextField
                        error = {nameError!=='' ? true : false}
                        id='outlined-basic'
                        required= {true}
                        label="Name"
                        type="text"
                        sx={{minWidth:295 , marginTop: 2}}
                        variant="outlined"
                        defaultValue={farm.name}
                        onChange={(e) => setSelectedFarm({...farm, name: e.target.value})}
                        autoComplete= "off"
                        helperText = {nameError}
                    />
                    <TextField
                        error = {latitudeError!==''? true : false}
                        id='outlined-basic'
                        required={true}
                        label="Lattitude"
                        type="number"
                        sx={{minWidth:295 , marginTop: 1}}
                        variant="outlined"
                        defaultValue={farm.latitude}
                        onChange={(e) => setSelectedFarm({...farm, latitude: parseFloat(e.target.value)})}
                        autoComplete= "off"
                        helperText = {latitudeError}
                    />
                    <TextField
                        error = {longitudeError!=='' ? true : false}
                        id='outlined-basic'
                        required = {true}
                        label="Longitude"
                        type="number"
                        sx={{minWidth:295 , marginTop: 1}}
                        variant="outlined"
                        defaultValue={farm.longitude}
                        onChange={(e) => setSelectedFarm({...farm, longitude: parseFloat(e.target.value)})}
                        autoComplete= "off"
                        helperText = {longitudeError}
                    />
                    <TextField
                        error = {noOfCagesError!==''? true : false}
                        id='outlined-basic'
                        label="Number of Cages"
                        type="number"
                        sx={{minWidth:295 , marginTop: 1}}
                        variant="outlined"
                        defaultValue={farm.noOfCages}
                        onChange={(e) => setSelectedFarm({...farm, noOfCages: parseFloat(e.target.value)})}
                        autoComplete= "off"
                        helperText = {noOfCagesError}
                    />
                    <TextField
                        select
                        error = {hasBargeError!=='' ? true: false}
                        id='outlined-basic'
                        required = {true}
                        label="Farm has a Barge?"
                        sx={{minWidth:295 , marginTop: 1}}
                        variant="outlined"
                        defaultValue={farm.hasBarge}
                        onChange={(e) => setSelectedFarm({...farm, hasBarge: Boolean(e.target.value)})}
                        autoComplete= "off"
                        helperText = {hasBargeError}
                    >
                        {props.yesNoDropdown.map( (dropDownValue) => (
                            <MenuItem key={dropDownValue.id} value ={dropDownValue.value}>
                                {dropDownValue.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Button
                            variant='contained'
                            onClick={()=> handleSubmit(farm) }
                            sx = {{ minWidth: 100}}
                        >
                            Submit
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => handleCloseModal()}
                            sx = {{minWidth: 100}}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default EditFarm
