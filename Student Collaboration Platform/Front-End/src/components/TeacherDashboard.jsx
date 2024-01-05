import { Badge, Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material"
import "./dashboard.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {  Route, Routes, useNavigate } from "react-router-dom";
import {logout} from '../features/user';
import ForumIcon from '@mui/icons-material/Forum';
import UserNavBar from "./UserNavBar";
import GridViewIcon from '@mui/icons-material/GridView';
import GradingIcon from '@mui/icons-material/Grading';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Footer from "./Footer";
import UserService from "../api/Axios"
import ErrorPage from "./ErrorPage";
import TeachHome from "./TeachHome";
import TeachCreateTask from "./TeachCreateTask";
import TeachCommunity from "./TeachCommunity";
import TeachTaskAssigned from "./TeachTaskAssigned";
import TeachTaskCompleted from "./TeachTaskCompleted";
import TeachGradedTask from "./TeachGradedTask";
import TeachAddStudents from "./TeachAddStudents";


// import Navbar from "./Navbar";

export default function TeacherDashboard() {
    
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    

    const handleLogout = () => {
        localStorage.setItem('isLogin', 'false');
        dispatch(logout());
        navigate('/userlogin');
    }

    return (
        <>
        <div className="stud-dash">
            <UserNavBar user="TEACHER"/>
            <Box sx={{width:'100%',height: '84%', position: 'absolute',display:'flex',marginTop:'1px',flexDirection:'row'}}>    
                <Paper sx={{ position:'static',width: '275px', display: 'flex', flexDirection:'column',justifyContent:'space-between', backgroundColor:'#2e7eee', alignItems: 'center', pt:6,color:'white' }} elevation={2}>
                    <List>
                        <ListItem onClick={() => {
                          navigate('/teacher/dashboard')
                        }}>
                            <ListItemButton>
                                <GridViewIcon backgroundColor='blue'sx={{mr:'5px'}}/>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                        </ListItem>

                        <ListItem onClick={() => {
                            navigate('/teacher/Graded-task')
                        }}>
                        <ListItemButton>
                            <GradingIcon sx={{mr:'5px'}}/>
                            <ListItemText  primary='Graded Tasks' />
                        </ListItemButton>
                        </ListItem>

                        {/* <ListItem onClick={() => {
                            navigate('/teach/friends')
                        }}>
                        <ListItemButton>
                            <Diversity3Icon sx={{mr:'5px'}}/>
                            <ListItemText primary='Friends' />
                        </ListItemButton>
                        </ListItem> */}

                        <ListItem onClick={() => {
                            navigate("/teacher/community")
                        }}>
                        <ListItemButton>
                            <ForumIcon sx={{mr:'5px'}}/>
                            <ListItemText primary='Community' />
                        </ListItemButton>
                        </ListItem>

                    </List>
                    
                    <Button sx={{backgroundColor:'red',fontFamily:'san-serif',letterSpacing:'1px',color:'white',width:'55%', mb: 10,":hover":{backgroundColor:'blue'}}} onClick={handleLogout}>
                        Logout<ExitToAppIcon sx={{ml:'5px'}}/>
                    </Button>
                </Paper>    
                    <Routes>
                         <Route path="/dashboard" element={<TeachHome/>} />
                         <Route path="/Graded-task" element={<TeachGradedTask/>} />
                         {/* <Route path="/friends" element={<StudFriends/>} /> */}
                         <Route path='/createTask' element={<TeachCreateTask/>} />
                         <Route path="/addStudent" element={<TeachAddStudents/>}/>
                         {/* <Route path="/profile" element={<StudProfile/>}/> */}
                         <Route path="/task-assigned" element={<TeachTaskAssigned/>}/>
                         <Route path="/task-completed" element={<TeachTaskCompleted/>}/>
                         {/* <Route path="/friend/project/:friendName" element={<StudFriendProjects/>}/> */}
                         {/* <Route path="/task-completed" element={<StudTaskCompleted/>}/> */}
                         <Route path="/community" element={<TeachCommunity/>}/>

                         <Route path='/*' element={<ErrorPage/>} />
                    </Routes>
                </Box>
            <Footer/>
            </div>
        
        </>
    )
}

