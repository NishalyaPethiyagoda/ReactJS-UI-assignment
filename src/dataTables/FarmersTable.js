

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
import UpdateFarm from '../components/farmers/UpdateFarm';


export default function FarmersTable(props) {

  const localFarmList = props.farmList;
  
  const [deletingFarm, setDeletingFarm] = useState(null);
  const [openDeleteModal, setDeletePopupModal] = useState(false);
  const [openUpdateModal, setUpdatePopupModal] = useState(false);

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
      <Modal
        open = {openDeleteModal}
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
        open = {openUpdateModal}
      >
        <UpdateFarm
          //farm={farm}
          openPopupModal={setUpdatePopupModal}
        >

        </UpdateFarm>
      </Modal>
    </TableContainer>
  );
}




// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
// //    {
// //     id: 'picUrl',
// //     label: 'Image',
// //     minWidth: 170,
// //     align: 'right',
// //     // format: (value) => value.toFixed(2),
// //   },
//   { 
//     id: 'Id', 
//     label: 'ID', 
//     minWidth: 170,
//     format: (value) => value.toLocaleString('en-US'), },
//   { 
//     id: 'name', 
//     label: 'Name', 
//     minWidth: 170, 
//     format: (value) => value.toLocaleString('en-US'),},
//   {
//     id: 'lattitude',
//     label: 'Lattitude',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),    },
//   {
//     id: 'longitute',
//     label: 'Longitute',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),      },
//   {
//     id: 'NoOfCages',
//     label: 'No of Cages',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'), },
//   {
//     id: 'HasBarge',
//     label: 'Has Barge',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),     },

// ];

// function createData(ID, Name, Lattitude, Longitute, NoOfCages, HasBarge) {

//   return { ID, Name, Lattitude, Longitute, NoOfCages, HasBarge};
// }

// const rows = [
//   createData(1, 'farm1', 13.24171354, 12.87263, 5, 1),
//   createData(2, 'farm2', 23.24171354, 22.87263, 1, 0),
//   createData(3, 'farm3', 33.24171354, 32.87263, 2, 1),
//   createData(4, 'farm4', 43.24171354, 42.87263, 3, 1),
//   createData(5, 'farm5', 53.24171354, 52.87263, 4, 0),

// ];

// export default function FarmersTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 520 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// }