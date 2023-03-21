import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Modal } from '@mui/material';
import axios from 'axios';
import {useState, useEffect} from 'react'
import UpdateWorker from '../components/workers/UpdateWorker';
import Box from '@mui/material/Box';
import ConfirmationPopup from '../components/ConfirmationPopup';


export default function WorkersTable(props) {

  const workerList= props.workerList;

//update functions

  const [selectedWorker, setSelectedWorker] = useState(null );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleEditClick = (worker) => {
    setSelectedWorker(worker);
    setOpenUpdateModal(true);
  };

//delete function 

  const [deletingWorker, setDeletingWorker] = useState(null);
  const [openDeletePopupModal, setDeletePopupModal] = useState(false);
  //const [deletedAlert, setDeletedAlert] = useState("");

  const handleDeleteClick = (worker) => {
    setDeletingWorker(worker);
    setDeletePopupModal(true);
  }

  const handleDeleteAction = (worker) =>{

    axios.delete(`http://localhost:12759/api/worker/${worker.id}`)
       .then(response=> {
          // setDeletedAlert(response.data);
          console.log(response.data);
          props.tableRefresh();
        });

    setDeletePopupModal(false);
  }

  const handleCloseDeletePopup = () => {
    setDeletePopupModal(false);
  }

  return (
    
    <TableContainer component={Paper}>
      
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
            {/* <TableCell align="left">Worker ID</TableCell> */}
            <TableCell align="left"> Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Certified Until</TableCell>
            <TableCell align="left">Designation</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              workerList.map( (worker) => {
              
                return(
                  <TableRow hover role = "checkbox" key={worker.name}>
                    {/* <TableCell align='left'>
                      {worker.Id}  
                    </TableCell> */}
                    <TableCell align='left' component="th" scope="row">
                      {worker.name}  
                    </TableCell>
                    <TableCell align='left'>
                      {worker.age} 
                    </TableCell>
                    <TableCell align='left'>
                      { //console.log(worker.email)
                        worker.email
                      }  
                    </TableCell>
                    <TableCell align='left'>
                      {
                        // Date(worker.certifiedDate) 
                        worker.certifiedDate
                      } 
                    </TableCell>
                    <TableCell align='left'>
                      {worker.designationName}  
                    </TableCell>
                    <TableCell align='left'>
                      <Button 
                        onClick={ () => handleEditClick(worker) } 
                        variant="contained" 
                      >
                        Edit
                      </Button> 
                    </TableCell>
                    <TableCell align='left'>
                      <Button 
                        onClick={
                          () => handleDeleteClick(worker)
                        }
                        variant="contained" >Delete</Button> 
                    </TableCell>
                  </TableRow>
                );
              } )
            }
          </TableBody>
        </Table>
        <Modal
          open={openUpdateModal}
          autocomplete="off"
        >
          <UpdateWorker  
            worker={selectedWorker}  
            setOpenUpdateModal={setOpenUpdateModal}  
            tableRefresh = {props.tableRefresh}
          />
        </Modal>

        <Modal
          open= {openDeletePopupModal}
          onClose = {handleCloseDeletePopup}
        >
          <ConfirmationPopup 
            confirmationMessage={"Are you sure to delete this worker?"}
            confirmButtonMessage= {"Delete"}
            deletingEntity = {deletingWorker}
            confirmedAction ={handleDeleteAction}
            openPopupModal={setDeletePopupModal}
            closePopupModal = {handleCloseDeletePopup}
          >
          </ConfirmationPopup>
        </Modal>
      </TableContainer>
  );
}
