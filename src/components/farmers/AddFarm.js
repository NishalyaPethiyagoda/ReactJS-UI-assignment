import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import axios from 'axios';
import { z } from "zod";
import { Container } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    height: '95%',
    minWidth: '300px',
    
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    alignItems: 'left'
  };


const defaultFarmImageSrc = './image/defaultFishFarm.jpg'

const imgContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '130px',
  height: '130px', // Change this value as needed
  
};

function AddFarm(props) {

    const [openAddFarmModal, setAddFarmModal] = useState(false);
    
    const yesNoDropdown = [
        {id: 1, label: "Yes", value: true},
        {id: 2, label: "No" , value: false},
    ];

    const [newFarm , setNewFarm] = useState({

        imageName:null,
        imageSrc: null,
        imageFile: null,
        name: null,
        latitude: null,
        longitude: null,
        noOfCages: null,
        hasBarge: null,
    });

    const handleClose = () => 
    {
        setAddFarmModal(false);

        setNameError('');
        setLatitudeError('');
        setLongitudeError('');
        setNoOfCagesError('');
        setHasBargeError('');

        setNewFarm({
            imageName: null, 
            imageFile: null,
            name: null,
            latitude: null,
            longitude: null,
            noOfCages: null,
            hasBarge: null,
        })
    }

    const handleAddFarmClick = () => {

        setNewFarm({
            ...newFarm, 
            imageFile: null,
            imageSrc: defaultFarmImageSrc,
        });
        setAddFarmModal(true);
    };

    const schema = z.object({
        name: z.string().nonempty().min(4).max(50).regex(/^[a-zA-Z ]*$/),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        noOfCages: z.number().int().positive().max(200),
        hasBarge: z.boolean(),
    });

    const [imageError, setImageError] = useState('');
    const [nameError, setNameError] = useState('');
    const [latitudeError, setLatitudeError] = useState('');
    const [longitudeError, setLongitudeError] = useState('');
    const [noOfCagesError, setNoOfCagesError] = useState('');
    const [hasBargeError, setHasBargeError] = useState('');

    const handleSubmit= (e) =>{

        e.preventDefault();
        const result  = schema.safeParse(newFarm);

        if(newFarm.imageFile===null)
        {
            setImageError('error') ;
        }
        else{
            //setting the newFarm values to a FormData() tyoe to post through axios
            const formData = new FormData();

            formData.append("name", newFarm.name);
            formData.append("latitude", newFarm.latitude);
            formData.append("longitude", newFarm.longitude);
            formData.append("noOfCages", newFarm.noOfCages);
            formData.append("hasBarge", newFarm.hasBarge);
            formData.append("imageFile", newFarm.imageFile);

            setImageError('');

            if(!result.success)
            {
                result.error.format().name? setNameError(result.error.format().name._errors[0]) : setNameError('');
                result.error.format().latitude? setLatitudeError(result.error.format().latitude._errors[0]) : setLatitudeError('');
                result.error.format().longitude? setLongitudeError(result.error.format().longitude._errors[0]) : setLongitudeError('');
                result.error.format().noOfCages? setNoOfCagesError(result.error.format().noOfCages._errors[0]): setNoOfCagesError('');
                result.error.format().hasBarge? setHasBargeError(result.error.format().hasBarge._errors[0]): setNoOfCagesError('');
            }
            else
            {
                axios.post('http://localhost:12759/api/Farm', formData )
                    .then(response => {

                    props.onAddFarm();
                    
                    handleClose();
                    });
            } 
        }
    }

    const showPreview = (event) => 
    {
        if(event.target.files && event.target.files[0])
        {
            let imageFile1 = event.target.files[0];

            setNewFarm({
                ...newFarm, 
                imageFile: imageFile1,
                imageSrc: imageFile1.src,
            })
            // const reader = new FileReader();
            
            // reader.onload = x => {
            //     return function(e){
            //         setNewFarm({
            //             ...newFarm, 
            //             imageFile: e.target.result,
            //             imageSrc: e.target.result,
            //         })
            //     }
                
            // }
            // reader.readAsDataURL(imageFile1)
        }
        else{
            setNewFarm({
                ...newFarm, 
                imageFile: null,
                imageSrc: defaultFarmImageSrc,
            })
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
                    <form onSubmit={handleSubmit}>
                        <Container 
                            sx={{backgroundColor: 'grey', marginTop:1, marginBottom: 1}}
                            style={imgContainerStyle}
                        >
                            <img 
                                src={newFarm.imageSrc===null? defaultFarmImageSrc: newFarm.imageSrc } 
                                alt="Default Farm Image" 
                                style={imgContainerStyle}>
                            </img>
                        </Container>
                        
                        <Button
                            variant="contained"
                            component="label"
                            sx={{width: '100%', height: 25, backgroundColor: imageError==='error' ? 'red' : 'blue'}}
                            >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept='image/*'
                                onChange={ showPreview}
                            />
                        </Button>
                        <TextField
                            error = {nameError!==''? true: false}
                            id='outlined-basic'
                            required={true}
                            label="Name"
                            type='text'
                            sx={{minWidth:295 , marginTop: 2}}
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
                            sx={{minWidth:295 , marginTop: 1}}
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
                            sx={{minWidth:295 , marginTop: 1}}
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
                            sx={{minWidth:295 , marginTop: 1}}
                            variant="outlined"
                            onChange={(e) => {
                                setNewFarm({...newFarm, noOfCages: parseFloat(e.target.value)});
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
                            sx={{minWidth:295 , marginTop: 1}}
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
                            sx = {{margin: 2,marginLeft: 4 , minWidth: 100}}
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => {
                                handleClose();
                            }}
                            sx = {{margin: 2, minWidth: 100}}
                        >
                            Close
                        </Button>

                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddFarm
