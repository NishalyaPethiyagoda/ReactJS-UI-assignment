

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Modal } from '@mui/material';
import axios from 'axios';
import {useState} from 'react';
import ConfirmationPopup from '../components/ConfirmationPopup';
import EditFarm from '../components/farmers/EditFarm';
import AssignedWorkers from '../components/assignedWorkers/AssignedWorkers';



export default function FarmersTable(props) {

  const localFarmList = props.farmList;

  //delete functions
  const [deletingFarm, setDeletingFarm] = useState(null);
  const [openDeleteModal, setDeletePopupModal] = useState(false);

  const handleDeleteClick = (farm) =>{  
    setDeletingFarm(farm);
    setDeletePopupModal(true);
  }

  const handleDeleteAction = () =>{
    axios.delete(`http://localhost:12759/api/Farm/${deletingFarm.id}`)
      .then(response => {
        console.log(response.data);
        handleCloseDeletePopup();
        props.tableRefresh();

      });
  }

  const handleCloseDeletePopup = () => {
    setDeletePopupModal(false);
  }

  const ConfirmationPopupWithRef = React.forwardRef( (props, ref) => {
    return <ConfirmationPopup {...props} ref={ref} />
  })

  // edit functions

  const [selectedFarm, setSelectedFarm] = useState(null);
  const [openEditModal , setEditPopup] = useState(false);

  function handleEditFarm(farm) {
    setSelectedFarm(farm);
    setEditPopup(true);
  }

  const EditFarmWithRef = React.forwardRef( (props, ref) => {
    return <EditFarm {...props} ref={ref} />
  })

  //assigned workers
  
  const [openFarmWorkersModal, setFarmWorkersModal] = useState(false);
  const [assignedFarmId, setAssignedFarm] = useState(null);

  const handleWorkersClick = (farm) => {
    setAssignedFarm(farm.id);
    setFarmWorkersModal(true);
  }
  const handleOpenAssignedWorkers = () => setFarmWorkersModal(true);
  const handleCloseAssignedWorkers = () => setFarmWorkersModal(false);

  const AssignedWorkersWithRef = React.forwardRef( (props, ref) => {
    return <AssignedWorkers {...props} ref={ref} />
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Picture</TableCell>
            {/* <TableCell align="left">Farm ID</TableCell> */}
            <TableCell align="left">Farm Name</TableCell>
            <TableCell align="left">Lattitude</TableCell>
            <TableCell align="left">Longitute</TableCell>
            <TableCell align="left">No of Cages</TableCell>
            <TableCell align="left">Farm has Barge?</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            localFarmList.map((farm) => {
              
              return(
                <TableRow
                  key={farm.id}
                  hover role = "checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='right'>
                  </TableCell>
                  {/* <TableCell align="left">{farm.id}</TableCell> */}
                  <TableCell align="left">{farm.name}</TableCell>
                  <TableCell align="left">{parseFloat(farm.latitude.toString()).toFixed(4)}</TableCell>
                  <TableCell align="left">{parseFloat(farm.longitude.toString()).toFixed(4)}</TableCell>
                  <TableCell align="left">{(farm.noOfCages)}</TableCell>
                  <TableCell align="left">{ farm.hasBarge.toString() === 'true'? "Yes": "No"}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained" 
                      onClick={() => handleWorkersClick(farm)}
                    >
                      Workers
                    </Button>
                  </TableCell>
                  <TableCell >
                    <Button
                      variant="contained" 
                      onClick={() => handleEditFarm(farm)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell >
                    <Button
                      variant="contained" 
                      onClick={ () => handleDeleteClick(farm) }
                    >
                      {/* {console.log(tablerRefreshKey)} */}
                      Delete
                    </Button>
                  </TableCell>

                </TableRow>
            );
          })
          }
        </TableBody>
      </Table>

      <Modal
        open = {Boolean(openFarmWorkersModal)}
      >
          <AssignedWorkersWithRef 
            
            selectedFarmId = {assignedFarmId}
            openFarmWorkersModal = {handleOpenAssignedWorkers}
            closeFarmWorkersModal = {handleCloseAssignedWorkers}
            
          />
      </Modal>

      <Modal
        open = {Boolean(openDeleteModal)}
      >
          <ConfirmationPopupWithRef 

            confirmationMessage={"Are you sure you want to delete this farm?"}
            confirmButtonMessage={"Delete"}
            confirmedAction = {handleDeleteAction}
            openPopupModal ={setDeletePopupModal}
            closePopupModal= {handleCloseDeletePopup}
          />
        
      </Modal>
      <Modal
        open ={Boolean( openEditModal) }
      >
        <EditFarmWithRef
            yesNoDropdown={props.yesNoDropdown}
            onTableRefresh = {props.tableRefresh}
            selectedFarm={selectedFarm}
            setEditPopupModal={setEditPopup}
        ></EditFarmWithRef>
      </Modal>

      {/* <Modal
        open = {Boolean(openDeleteModal)}
      >
        {React.forwardRef((props, ref) => (

          <ConfirmationPopup 
            {...props}
            forwardedRef={ref}

            confirmationMessage={"Are you sure you want to delete this farm?"}
            confirmButtonMessage={"Delete"}
            confirmedAction = {handleDeleteAction}
            openPopupModal ={setDeletePopupModal}
            closePopupModal= {handleCloseDeletePopup}
          />
        ))}
        
      </Modal> */}
    </TableContainer>
  );
}