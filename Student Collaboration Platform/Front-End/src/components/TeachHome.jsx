import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East';
import UserService from "../api/Axios"
import { Link, useNavigate } from 'react-router-dom';
import aTaskImage from '../image/Assigned Task.svg'
import finishedImage from '../image/taskCompleted-teach.svg'
import gradeImage from '../image/grade.svg'
import count from '../image/number.png'
import IncompleteTask from '../image/Incomplete.svg'
import Badge from '@mui/material/Badge';

export default function TeachHome(props) {
    
    const navigate = useNavigate();

    const[assignedCount,setAssignedCount]=useState("")
    const[completedCount,setCompletedCount] = useState("");

    const handleTaskAssigned = () => {
        navigate('/teacher/createTask')
    }

    const handleTaskCompleted = () => {
        navigate('/teacher/task-assigned')
    }
    
    const handleGrade = () => {
        navigate('/teacher/task-completed')
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
                            title='Assign Task'
                            action={
                                <IconButton>
                                    <Badge badgeContent={assignedCount==0?"*":assignedCount}  color="warning" sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 31, minWidth: 30,borderRadius:10,textAlign:'center',justifyContent:'center' } }}  />
                                </IconButton>
                            }
                        />
                        <CardMedia
                            component='img'
                            height='100'
                            image={aTaskImage}
                            sx={{ objectFit: 'contain' }}
                        />
                        
                        <CardContent >
                            <Typography variant='h6' sx={{p:'50px 0px 50px 0px'}}>
                                Here You can assign tasks for your students   
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                </div>
              
                <div className="task-completed" onClick={handleTaskCompleted}>
                <Card sx={{ maxWidth: 345, maxHeight: 385 }}>
                    <CardActionArea>
                        <CardHeader
                            title='On Progress Tasks'
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
                            image={IncompleteTask}
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
                               title='Task Completed '
                               action={
                                   <IconButton sx={{maxHeight:'10px'}} >
                                       <Badge badgeContent={assignedCount} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 31, minWidth: 30,borderRadius:10,textAlign:'center',justifyContent:'center' } }} />
                                   </IconButton>
                               }
                           />
                           <CardMedia
                               component='img'
                               height='100'
                               image={finishedImage}
                               sx={{ objectFit: 'contain' }}
                           />
                           
                           <CardContent>
                               <Typography variant='h6' sx={{p:'50px 0px 50px 0px'}}>
                                Give Marks to Completed Students
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
