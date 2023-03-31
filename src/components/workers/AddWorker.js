
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useState } from 'react'
import axios from 'axios';
import { Grid } from '@mui/material';
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

const defaultFarmImageSrc = './image/defaultWorkerImage.jpg'

function AddWorker(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const [newWorker, setWorker] = useState({
        name: null,
        age: null,
        email: null,
        certifiedDate: null,
        designationId: null,
        workerPhotoName: null,
        workerPhoto: null,
        workerPhotoSrc: null,
        
    });

    const handleClose = () => {

        setNameError('');
        setAgeError('');
        setEmailError('');
        setCertifiedDateError('');
        setDesignationIdError('');
        setWorkerPhotoError(null);

        setOpen(false);

    }

    const handleCertifiedDateTypeConversion = (event) => {
        const certifiedDateChanged = new Date(event.target.value);
        setWorker({...newWorker, certifiedDate: certifiedDateChanged });
    }

    const validationScheme = z.object( {
        name: z.string().min(3).max(25).regex(/^[a-zA-Z ]*$/),
        age: z.number().int().min(18).max(60),
        email: z.string().email().min(5).max(25),
        //certifiedDate: z.date().min( new Date()),
        designationId: z.number().min(1)
    });

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [certifiedDateError, setCertifiedDateError] = useState('');
    const [designationIdError, setDesignationIdError] = useState('');
    const [workerPhotoError, setWorkerPhotoError] = useState('');
    
    const showPreview = (event) => {

        if(event.target.files && event.target.files[0] )
        {
            let imageFile1 = event.target.files[0];
            setWorker({
                ...newWorker,
                workerPhoto: imageFile1,
                workerPhotoSrc: imageFile1.src,
            })
        }
        else
        {
            setWorker({
                ...newWorker,
                workerPhoto: null,
                workerPhotoSrc: defaultFarmImageSrc,
            })
        }
    }

    const handleFormSubmit = (e)=>{

        e.preventDefault();
        
        const submitResult = validationScheme.safeParse(newWorker);

        const areAllFieldsEmpty = (newWorker.name===newWorker.age===newWorker.email===newWorker.certifiedDate===newWorker.designationId===newWorker.workerPhoto===null) 
                ? true: false

        console.log(newWorker);

        if(areAllFieldsEmpty){
            setNameError('This field is required');
            setAgeError('This field is required');
            setEmailError('This field is required');
            setCertifiedDateError('This field is required');
            setDesignationIdError('This field is required');
            setWorkerPhotoError('error');
        }
        else{
            if(newWorker.imageFile===null)
            {
                setWorkerPhotoError('error') ;
            }
            else
            {
                if(!submitResult.success)
                {
                    submitResult.error.format().name? setNameError(submitResult.error.format().name._errors[0]) : setNameError('');
                    submitResult.error.format().age? setAgeError(submitResult.error.format().age._errors[0] ): setAgeError('');
                    submitResult.error.format().email? setEmailError(submitResult.error.format().email._errors[0]) : setEmailError('');
                    submitResult.error.format().certifiedDate? setCertifiedDateError(submitResult.error.format().certifiedDate._errors[0]) : setCertifiedDateError('');
                    submitResult.error.format().designationId? setDesignationIdError(submitResult.error.format().designationId._errors[0] ): setDesignationIdError('');
                }
                else
                {
                    const formData = new FormData();

                    formData.append("name", newWorker.name);
                    formData.append("age", newWorker.age);
                    formData.append("email", newWorker.email);
                    formData.append("certifiedDate", newWorker.certifiedDate);
                    formData.append("designationId", newWorker.designationId);
                    formData.append("workerPhoto", newWorker.workerPhoto);

                    axios.post('http://localhost:12759/api/Worker', formData)
                        .then(response => {
                            console.log(response.data);
                            props.onAddWorker();

                            handleClose();
                        })
                        .catch(error => {
                            console.log(error);
                        });

                        setWorker({
                            name: null,
                            age: null,
                            email: null,
                            certifiedDate: null,
                            designationsId: null,
                            workerPhoto: null,
                            workerPhotoSrc: null,

                        });

                        
                }
            }
        }
        
    }

    return (
        <div>
            <Button 
                sx={{minWidth: 180 }}
                variant="contained" 
                onClick={handleOpen} 
                color="primary">
                Add Worker
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Worker
                    </Typography>

                    <form onSubmit={handleFormSubmit}>
                        <Container sx={{backgroundColor: 'grey' , marginTop: 1, marginBottom: 1 , }} 
                            style = {{display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '110px',
                                height: '110px',}}
                        >
                            <img src={newWorker.workerPhotoSrc===null? defaultFarmImageSrc: newWorker.workerPhotoSrc } 
                                style = {{display: 'flex',justifyContent: 'center',alignItems: 'center',width: '110px',height: '110px'}}
                            ></img>
                        </Container>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{width: '100%', height: 25, backgroundColor: workerPhotoError==='error' ? 'red' : 'blue' }}
                        >
                            Upload Worker Photo
                            <input
                                type="file"
                                hidden
                                accept='image/*'
                                onChange={ showPreview}
                            />
                        </Button>

                        <TextField 
                            error = { nameError!== ''? true: false}
                            id="outlined-basic" 
                            required={true}
                            label="Name" 
                            type="text"
                            sx={{width: '100%', minWidth: 295, marginTop:1}} 
                            variant="outlined"  
                            onChange={(e) => {
                                // if (/^\d+$/.test(e.target.value)) {
                                //     setNameError('Name cannot contain numbers');
                                // } else {
                                    setNameError('');
                                    setWorker({...newWorker, name: e.target.value});
                                // }
                            }}
                            autocomplete="off"
                            helperText={nameError}
                        />

                        <TextField 
                            error = {ageError!== ''? true: false}
                            id="outlined-basic" 
                            rewuired={true}
                            label="Age" 
                            type="number"
                            sx={{width: '100%', minWidth: 295, marginTop:1}} 
                            variant="outlined"  
                            onChange={(e) => setWorker({...newWorker, age: parseFloat(e.target.value)})}
                            inputProps={{step: '1', min: 18, max: 60 }}
                            autocomplete="off"
                            helperText={ageError}
                        />

                        <TextField 
                            error= {emailError!==''? true : false}
                            id="outlined-basic" 
                            required={true}
                            label="Email" 
                            type="email"
                            sx={{width: '100%', minWidth: 295 , marginTop:1}} 
                            variant="outlined" 
                            onChange={(e) => setWorker({...newWorker, email: e.target.value})}
                            autocomplete="off"
                            helperText={emailError}
                        ></TextField>

                        <TextField 
                            select 
                            error = {designationIdError!==''? true: false}
                            id="outlined-select" 
                            label="Designation" 
                            required={true}
                            variant="filled"
                            onChange={(e) => setWorker({...newWorker, designationId: parseInt(e.target.value)})}
                            autocomplete="off"
                            helperText={designationIdError}
                            sx={{width: '100%', minWidth: 295, marginTop:1}}
                        >
                            {props.designations.map( (designation) => (
                                <MenuItem 
                                    key={designation.id} 
                                    value={designation.id}
                                >
                                    { designation.name}
                                </MenuItem>
                                ))
                            }
                        </TextField>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    error = {certifiedDateError!== ''? true: false}
                                    id="outlined-basic"
                                    required ={true}
                                    label="Worker Certified Until (Date)"
                                    sx={{width: '100%', minWidth: 295, marginTop:1}}
                                    variant="outlined"
                                    type="date"
                                    onChange={(e) =>setWorker({...newWorker, certifiedDate: e.target.value })}
                                    //onChange={handleCertifiedDateTypeConversion}
                                    helperText={certifiedDateError}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ width: '100%', marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <Button variant="contained" type="submit" sx={{ minWidth:100}} autocomplete="off">
                                Submit
                            </Button>
                            <Button variant="contained" onClick={handleClose} sx={{ minWidth:100}}>Close</Button>
                        </Box>
                    </form>
                </Box>
            
            </Modal>
        </div>
    )
}
export default AddWorker
