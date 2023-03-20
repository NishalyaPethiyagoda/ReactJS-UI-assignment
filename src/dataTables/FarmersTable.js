

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
import {useState, useEffect} from 'react';
import ConfirmationPopup from '../components/ConfirmationPopup';
import EditFarm from '../components/farmers/EditFarm';



export default function FarmersTable(props) {

  const localFarmList = props.farmList;
  
  const [deletingFarm, setDeletingFarm] = useState(null);
  const [openDeleteModal, setDeletePopupModal] = useState(false);
  const [openUpdateModal, setUpdatePopupModal] = useState(false);
  const [openEditModal , setEditPopupModal] = useState(false);

  const handleDeleteClick = (farm) =>{  
    setDeletingFarm(farm);
    setDeletePopupModal(true);
  }

  const handleDeleteAction = () =>{
    axios.delete(`http://localhost:12759/api/Farm/${deletingFarm.id}`)
      .then(response => {
        console.log(response.data);
        handleCloseDeletePopup();
        props.onTableRefresh();

      });
  }

  const handleCloseDeletePopup = () => {
    setDeletePopupModal(false);
  }

  const handleUpdateFarm = () => {

  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Picture</TableCell>
            <TableCell align="right">Farm ID</TableCell>
            <TableCell align="right">Farm Name</TableCell>
            <TableCell align="right">Lattitude</TableCell>
            <TableCell align="right">Longitute</TableCell>
            <TableCell align="right">No of Cages</TableCell>
            <TableCell align="right">Has Barge?</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
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
                  <TableCell align="right">{farm.id}</TableCell>
                  <TableCell align="right">{farm.name}</TableCell>
                  <TableCell align="right">{parseFloat(farm.latitude.toString())}</TableCell>
                  <TableCell align="right">{parseFloat(farm.longitude.toString())}</TableCell>
                  <TableCell align="right">{(farm.noOfCages)}</TableCell>
                  <TableCell align="right">{ farm.hasBarge.toString() === 'true'? "Yes": "No"}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained" 
                      onClick={null}
                    >
                      Workers
                    </Button>
                  </TableCell>
                  <TableCell >
                    <Button
                      variant="contained" 
                      onClick={null}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell >
                    <Button
                      variant="contained" 
                      onClick={
                        () => handleDeleteClick(farm)
                      }
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
      <Modal
        open = {Boolean(openDeleteModal)}
      >
          <ConfirmationPopup 

            confirmationMessage={"Are you sure you want to delete this farm?"}
            confirmButtonMessage={"Delete"}
            confirmedAction = {handleDeleteAction}
            openPopupModal ={setDeletePopupModal}
            closePopupModal= {handleCloseDeletePopup}
          />
        
      </Modal>
      <Modal
        open ={openEditModal}
      >
        <EditFarm
          OpenUpdatePopupModal={setEditPopupModal}
        ></EditFarm>
      </Modal>
    </TableContainer>
  );
}