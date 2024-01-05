import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import UserService from "../api/Axios"
import { useState } from 'react';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  }
];


export default function StudGrade() {
  const [rows,setRows] = useState([])

  
 useEffect(()=>{
   const obj = JSON.parse(localStorage.getItem('user'))
   try {
    const res = UserService.getProjectByName(localStorage.getItem('username'))
    res.then((data)=>{
      console.log(data,typeof data);
      // for(const i=0;i<data.length;i++){
      //   if(data[i].)
      // }
      setRows(Object.values(data))
    },[])
    
  } catch (error) {
    console.log(error);
  }
 },[])
  
  

  return (
    <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
        <Box sx={{position:'relative',width:'90%', mt: '0px',m:5,flexDirection:'row', display: 'flex',justifyContent:'center', gap: 5 ,flexWrap:"wrap"}}>
                    <Paper sx={{ width: '40%',mt:5 }}>

                    <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead sx={{backgroundColor:'lightgrey'}}>
                    <TableRow>
                        <TableCell align='center' >Project Name</TableCell>
                        <TableCell align='center'>Grade</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows?.map((row) => (
                          <TableRow
                            key={row.projectname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                             <TableCell component="th" scope="row" >
                              <Typography sx={{ml:3}}>{row.projectname}</Typography>
                             </TableCell>
                            <TableCell align="center">{row.grade === 0 ?"Not Graded":row.grade }</TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
    </TableContainer>
                        
                    </Paper>
                </Box>
                </Box>
  );
}
