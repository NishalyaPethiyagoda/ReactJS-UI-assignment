
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { Grid } from '@mui/material';
import {z} from "zod";

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
    });
  
    useEffect(()=>{
        axios.get('http://localhost:12759/api/WorkerDesignation')
            .then(response => {
                setPositions(response.data);
            })
    }, []);

    const validationScheme = z.object( {
        name: z.string().min(3).max(25),
        age: z.number().int().positive().min(18).max(60),
        email: z.string().email().min(5).max(25),
        designationId: z.number().min(1)
    });

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [certifiedDateError, setCertifiedDateError] = useState('');
    const [designationIdError, setDesignationIdError] = useState('');


    const updateWorkerSubmit = (editingWorker) => {

        const updateResult = validationScheme.safeParse(editingWorker);

        if(!updateResult.success){
            updateResult.error.format().name? setNameError(updateResult.error.format().name._errors[0]) : setNameError('');
            updateResult.error.format().age? setAgeError(updateResult.error.format().age._errors[0] ): setAgeError('');
            updateResult.error.format().email? setEmailError(updateResult.error.format().email._errors[0]) : setEmailError('');
            updateResult.error.format().designationId? setDesignationIdError(updateResult.error.format().designationId._errors[0] ): setDesignationIdError('');
        }
        else{
            axios.put(`http://localhost:12759/api/Worker/${editingWorker.id}`, editingWorker)
                .then( response => {
                    console.log(response.data);
                    
                    props.tableRefresh();
                    handleClose();
                });
            
        }
    }

    const handleClose = () =>{
        setNameError('');
        setAgeError('');
        setEmailError('');
        setCertifiedDateError('');
        setDesignationIdError('');

        setWorker(null);

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
                        
                    <TextField 
                        error = { nameError!== ''? true: false}
                        id="outlined-basic" 
                        required={true}
                        label="Name" 
                        type="text"
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"  
                        defaultValue={editingWorker.name} 
                        onChange={(e) => setWorker({...editingWorker, name: e.target.value})}
                        autocomplete="off"
                        helperText={nameError}
                    />
                    <TextField 
                        error = {ageError!== ''? true: false}
                        id="outlined-basic" 
                        rewuired={true}
                        label="Age" 
                        type="number"
                        sx={{minWidth: 295, marginTop:3}} 
                        variant="outlined"  
                        defaultValue={editingWorker.age} 
                        onChange={(e) => setWorker({...editingWorker, age: parseInt(e.target.value)})}
                        autocomplete="off"
                        helperText={ageError}
                    />
                   <TextField 
                        error= {emailError!==''? true : false}
                        id="outlined-basic" 
                        required={true}
                        label="Email" 
                        type="email"
                        sx={{minWidth: 295 , marginTop:3}} 
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
                                sx={{minWidth: 295, marginTop:3}}
                                variant="outlined"
                                type="date"
                                defaultValue={ new Date(editingWorker.certifiedDate).toISOString().slice(0,10)}
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
                        sx={{minWidth: 295, marginTop:3}}
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
                
                    <Button 
                        variant="contained" 
                        onClick={() => updateWorkerSubmit(editingWorker)} 
                        sx={{margin: 3, minWidth:100}}
                    >
                        Submit
                    </Button>
                        
                    <Button 
                        variant="contained" 
                        onClick={handleClose} 
                        sx={{marginLeft: 4}}>Close</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateWorker
