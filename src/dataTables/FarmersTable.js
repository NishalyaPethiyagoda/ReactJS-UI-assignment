

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData( ID, Name, Lattitude, Longitute, NoOfCages, HasBarge) {
  return {  ID, Name, Lattitude, Longitute, NoOfCages, HasBarge };
}

const rows = [
    createData(1, 'farm1', 13.24171354, 12.87263, 5, 1),
    createData(2, 'farm2', 23.24171354, 22.87263, 1, 0),
    createData(3, 'farm3', 33.24171354, 32.87263, 2, 1),
    createData(4, 'farm4', 43.24171354, 42.87263, 3, 1),
    createData(5, 'farm5', 53.24171354, 52.87263, 4, 0),
];

export default function BasicTable() {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='right'>
              </TableCell>
              <TableCell align="right">{row.ID}</TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Lattitude}</TableCell>
              <TableCell align="right">{row.Longitute}</TableCell>
              <TableCell align="right">{row.NoOfCages}</TableCell>
              <TableCell align="right">{row.HasBarge}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
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