import { Modal, Box , Button, Container} from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AssignNewWorker from '../assignWorker/AssignNewWorker';
import AssignedWorkersTable from 'D:/work/havbruksloggen/reactJS/assignment/src/dataTables/AssignedWorkersTable';

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

    // const [openModal, setModal] = useState(false);
    // const openAssignedWorkersModal = () => setModal(true);
    // const closeAssignNewWorkerModal = () => setModal(false);
    const [assignedWorkerTableKey, setAssigneWorkerstableKey] = useState(0); 
    const selectedFarmId = props.selectedFarmId;

    const [workers, setWorkers] = useState([]);
    const [assignedWorkers, setAssignedWorkers] = useState([]);

    useEffect(() => {
        //console.log('Workers:', workers);
      }, [workers]);

    useEffect( () => {
        axios.get(`http://localhost:12759/api/FarmWorker/${selectedFarmId}`)
            .then(response => {
                setWorkers(response.data);
                // console.log(response.data);
                // console.log(workers);
            });
    }, [assignedWorkerTableKey]);

    const getWorkersToFarm = () => {

        
    }
    const filterAssignedWorkersToFarm = () => {

        getWorkersToFarm();
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
                        >
                            {/* {console.log(props.farmId)} */}
                        </AssignNewWorker>
                    </Container>
                    
                    <AssignedWorkersTable
                        assignedWorkers= {workers}
                        
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
