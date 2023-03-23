import { Modal, Box , Button, Container} from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AssignNewWorker from '../assignWorker/AssignNewWorker';
import AssignedWorkersTable from '../../dataTables/AssignedWorkersTable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    innerHeight: '70%',
    outerHeight: '75%',
    minWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AssignedWorkers(props) {

    
    const selectedFarmId = props.selectedFarmId;

    const [assignedWorkers, setWorkers] = useState([]);
    const [newAllocatedWorkers, setNewAllocatedWorkers ]= useState(null);

    const [assignedFarmWorkerTableKey, setAssigneWorkerstableKey] = useState(0); 
    useEffect( () => {
        axios.get(`http://localhost:12759/api/FarmWorker/${selectedFarmId}`)
            .then(response => {
                setWorkers(response.data);
            });
    }, [assignedFarmWorkerTableKey]);

    const handleAssignedFarmWorkerTableRefresh = () => {
        setAssigneWorkerstableKey(assignedFarmWorkerTableKey+1);
    }

    const deleteWorkerAssignment = (workerId) => {
        axios.delete(`http://localhost:12759/api/FarmWorker/${selectedFarmId}/${workerId}`)
            .then(response => {
                console.log(response.data);
                handleAssignedFarmWorkerTableRefresh();
            });
    }

    return (
        <div>
            <Modal
                open={Boolean(props.openFarmWorkersModal)}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx = {{marginBottom: 5 , marginLeft:1}}>
                         Workers Assigned to Farm : {selectedFarmId} 
                    </Typography>

                    <Container align="right" >
                        <AssignNewWorker 
                            farmId = {props.selectedFarmId}
                            assignedWorkers= {assignedWorkers}
                            handleAssignedFarmWorkerTableRefresh = {handleAssignedFarmWorkerTableRefresh}
                        />
                    </Container>
                    
                    <AssignedWorkersTable
                        assignedWorkers= {assignedWorkers}
                        deleteWorkerAssignment = {deleteWorkerAssignment}
                    >
                    </AssignedWorkersTable>

                    <Button
                        variant='contained'
                        onClick={() => props.closeFarmWorkersModal()}
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AssignedWorkers
