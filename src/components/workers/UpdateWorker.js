
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { Grid } from '@mui/material';
import {z} from "zod";
import { Container } from '@mui/system';
import Avatar from '@mui/material/Avatar';

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
  

function UpdateWorker(props ) {
    
    const [positions, setPositions] = useState([]);
    const [editingWorker, setWorker] = useState({
        id: props.worker.id,
        name: props.worker.name,
        age: props.worker.age,
        email: props.worker.email,
        certifiedDate: new Date(props.worker.certifiedDate),
        designationId: parseInt(props.worker.designationId),
        workerPhotoName: null,
        workerPhoto: null,
        workerPhotoSrc: props.worker.workerPhotoSrc,
    });
  
    useEffect(()=>{
        axios.get('http://localhost:12759/api/WorkerDesignation')
            .then(response => {
                setPositions(response.data);
            })
    }, []);

    const validationScheme = z.object( {
        name: z.string().min(3).max(25).regex(/^[a-zA-Z ]*$/),
        age: z.number().int().positive().min(18).max(60),
        email: z.string().email().min(5).max(25),
        designationId: z.number().min(1)
    });

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [certifiedDateError, setCertifiedDateError] = useState('');
    const [designationIdError, setDesignationIdError] = useState('');
    const [workerPhotoError , setWorkerPhotoError] =useState('');

    const updateWorkerSubmit = async (editingWorker) => {

        const updateResult = validationScheme.safeParse(editingWorker);

        if(!updateResult.success){
            updateResult.error.format().name? setNameError(updateResult.error.format().name._errors[0]) : setNameError('');
            updateResult.error.format().age? setAgeError(updateResult.error.format().age._errors[0] ): setAgeError('');
            updateResult.error.format().email? setEmailError(updateResult.error.format().email._errors[0]) : setEmailError('');
            updateResult.error.format().designationId? setDesignationIdError(updateResult.error.format().designationId._errors[0] ): setDesignationIdError('');
        }
        else{

            const formData = new FormData();

            formData.append("Name", editingWorker.name);
            formData.append("Age", editingWorker.age);
            formData.append("Email", editingWorker.email);
            formData.append("CertifiedDate", new Date(editingWorker.certifiedDate).toISOString());
            formData.append("DesignationId", editingWorker.designationId);
            formData.append("ImageFile", editingWorker.workerPhoto);

            try {
                const response = await axios.put(`http://localhost:12759/api/Worker/${editingWorker.id}`, formData, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(response => {
                        props.tableRefresh();
                        props.setOpenUpdateModal(false);
                    });
            } catch (error) {
                alert("Error updating worker.");
                console.log(error);
            }
        }
    }

    const handleClose = () =>{
        setNameError('');
        setAgeError('');
        setEmailError('');
        setCertifiedDateError('');
        setDesignationIdError('');

        props.setOpenUpdateModal(false);
    }

    return (
        <div>
            <Modal
                open={props.setOpenUpdateModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Worker
                    </Typography>

                    <Container Container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar 
                            style ={{justifyContent: 'center', width: '100px', height: '110px'}}
                            src={editingWorker.workerPhotoSrc}
                            sx={{ marginTop: 1, marginBottom: 1, width: 60, height: 60 }}
                        />
                    </Container>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{width: '100%', height: 25, backgroundColor: workerPhotoError==='error' ? 'red' : 'blue'  }}
                        >
                            Upload Worker Photo
                            <input
                                type="file"
                                hidden
                                accept='image/*'
                                onChange={ (e) => {

                                    const reader = new FileReader();
                                    const file = e.target.files[0];

                                    reader.onload =(event) => {
                                        setWorker({
                                            ...editingWorker,
                                            workerPhoto: file,
                                            workerPhotoSrc: event.target.result,
                                        })
                                    };
                                    reader.readAsDataURL(file);
                                    }
                                }
                            />
                        </Button>
                        
                        <TextField 
                            error = { nameError!== ''? true: false}
                            id="outlined-basic" 
                            required={true}
                            label="Name" 
                            type="text"
                            sx={{width: '100%', minWidth: 295, marginTop:2}} 
                            variant="outlined"  
                            defaultValue={editingWorker.name} 
                            onChange={(e) => {
                                setWorker({...editingWorker, name: e.target.value});
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
                            defaultValue={editingWorker.age} 
                            onChange={(e) => setWorker({...editingWorker, age: parseFloat(e.target.value)})}
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
                            defaultValue={editingWorker.email}
                            onChange={(e) => setWorker({...editingWorker, email: e.target.value})}
                            autocomplete="off"
                            helperText={emailError}
                        ></TextField>

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
                                    defaultValue={ new Date(editingWorker.certifiedDate).toISOString().slice(0,10)}
                                    
                                    //onChange= {(e) => setWorker({...editingWorker, certifiedDate:new Date(e.target.value).toISOString().slice(0,10) })}
                                    onChange= {(e) => setWorker({...editingWorker, certifiedDate: e.target.value})}
                                    helperText={certifiedDateError}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        
                        <TextField 
                            select 
                            error = {designationIdError!==''? true: false}
                            id="outlined-select" 
                            label="Designation" 
                            required={true}
                            variant="filled"
                            defaultValue={parseInt(editingWorker.designationId)}
                            onChange={(e) => setWorker({...editingWorker, designationId: parseInt(e.target.value)})}
                            autocomplete="off"
                            helperText={designationIdError}
                            sx={{width: '100%', minWidth: 295, marginTop:1}}
                        >
                            {positions.map( (designation) => (
                                <MenuItem 
                                    key={designation.id} 
                                    value={designation.id}
                                >
                                    { designation.name}
                                </MenuItem>
                                )) 
                            }
                        </TextField>
                        <Box sx={{width: '100%', marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                            <Button 
                                variant="contained" 
                                onClick={() => updateWorkerSubmit(editingWorker)} 
                                sx={{ minWidth:100}}
                            >
                                Submit
                            </Button>
                                
                            <Button 
                                variant="contained" 
                                onClick={handleClose} 
                                sx={{ minWidth:100}}
                            >Close
                            </Button>
                        </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateWorker
