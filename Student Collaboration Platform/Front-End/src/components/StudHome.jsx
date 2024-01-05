import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East';
import UserService from "../api/Axios"
import { Link, useNavigate } from 'react-router-dom';
import taskImage from '../image/Assigned.svg'
import finishedImage from '../image/finished.svg'
import gradeImage from '../image/grade.svg'
import count from '../image/number.png'
import Badge from '@mui/material/Badge';

export default function StudHome(props) {
    
    const navigate = useNavigate();

    const[assignedCount,setAssignedCount]=useState("")
    const[completedCount,setCompletedCount] = useState("");

    const handleTaskAssigned = () => {
        navigate('/student/task-assigned')
    }

    const handleTaskCompleted = () => {
        navigate('/student/task-completed')
    }
    
    const handleGrade = () => {
        navigate('/student/grades')
    }

    useEffect(() => {

        const obj = localStorage.getItem("user")
        const uid = JSON.parse(obj).uid

        const assign = UserService.getTaskCountById(uid);
        assign.then(data => {
                setAssignedCount(data);
        });

        const proj = UserService.getCompletedTaskCountById(uid);

            proj.then(data =>{
                setCompletedCount(data);
                console.log(data);
            })
          });

    return (
        <>
         <Box  sx={{  mt: '95px', height: 'calc(100vh-95px)', display: 'flex',width:'100%'  }}>
            {/* <SidePanel /> */}
            <Box sx={{ m: 5, display: 'flex', gap: 5 }}>
                
                <div className="task-assigned" onClick={handleTaskAssigned} >
                <Card sx={{ maxWidth: 345, maxHeight: 385 }} >
                    <CardActionArea>
                        <CardHeader
                            title='Tasks Assigned'
                            action={
                                <IconButton>
                                    <Badge badgeContent={assignedCount==0?"*":assignedCount}  color="warning" sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 31, minWidth: 30,borderRadius:10,textAlign:'center',justifyContent:'center' } }}  />
                                </IconButton>
                            }
                        />
                        <CardMedia
                            component='img'
                            height='100'
                            image={taskImage}
                            sx={{ objectFit: 'contain' }}
                        />
                        
                        <CardContent >
                            <Typography variant='h6' sx={{p:'50px 0px 50px 0px'}}>
                                Tasks Are Assigned Please Complete Your Tasks    
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                </div>
              
                <div className="task-completed" onClick={handleTaskCompleted}>
                <Card sx={{ maxWidth: 345, maxHeight: 385 }}>
                    <CardActionArea>
                        <CardHeader
                            title='Tasks Completed'
                            action={
                                <IconButton>
                                    <Badge badgeContent={completedCount} color="success" sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 31, minWidth: 30,borderRadius:10,textAlign:'center',justifyContent:'center' } }} />
                                </IconButton>
                            }
                            // subheader={
                                
                            // }
                        />
                        <CardMedia
                            component='img'
                            height='100'
                            image={finishedImage}
                            sx={{ objectFit: 'contain' }}
                        />
                        <CardContent>
                            <Typography variant='h6'sx={{p:'50px 0px 50px 0px'}} >
                                Tasks Assign to You are Completed   
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </div>

                <div className="stud-grade" onClick={handleGrade}>
                <Card sx={{  maxWidth: 345, maxHeight: 385,position:'relative' }}>
                       
                       <CardActionArea>
                           <CardHeader
                               title='Grades '
                            //    action={
                            //        <IconButton sx={{maxHeight:'10px'}} >
                            //            <Badge badgeContent={assignedCount} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 31, minWidth: 30,borderRadius:10,textAlign:'center',justifyContent:'center' } }} />
                            //        </IconButton>
                            //    }
                           />
                           <CardMedia
                               component='img'
                               height='100'
                               image={gradeImage}
                               sx={{ objectFit: 'contain' }}
                           />
                           
                           <CardContent>
                               <Typography variant='h6' sx={{p:'50px 0px 50px 0px'}}>
                                Marks Awarded to the Task You Completed
                               </Typography>
                           </CardContent>
                       </CardActionArea>
                   </Card>
                </div>
                
            </Box>
        </Box>
            
        </>
    )
}
