import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material"
import "./dashboard.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom";
import {logout} from '../features/user';
import UserNavBar from "./UserNavBar";
import GridViewIcon from '@mui/icons-material/GridView';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3Icon from '@mui/icons-material/Diversity3';
// import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Footer from "./Footer";
import UserService from "../api/Axios"
import AdminHome from "./AdminHome";
import AdminUser from "./AdminUser";
import AdminProjects from "./AdminProjects";
import StudHome from "./StudHome";
import StudProjects from "./StudProjects";
import StudFriends from "./StudFriends";
// import Navbar from "./Navbar";

export default function AdminDashboard() {
    
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isAdminHome,setAdminHome] = useState(true)
    const [isAdminUser,setAdminUser] = useState(false)
    const [isAdminProjects,setAdminProjects] = useState(false)  

    const [isStudHome,setStudHome] = useState(true)
    const [isStudFriend,setStudFriend] = useState(false)
    const [isStudProjects,setStudProjects] = useState(false)  

    const [isTeachHome,setTeachHome] = useState(true)
    const [isTeachUser,setTeachUser] = useState(false)
    const [isTeachProjects,setTeachProjects] = useState(false)  

    const [role,setRole] = useState('')
   

    useEffect(()=>{
        setRole(()=>localStorage.getItem('role'))
    },[])

    const handleLogout = () => {
        localStorage.setItem('isLogin', 'false');
        dispatch(logout());
        navigate('/userlogin');
    }

    return (
        <>
        
            <div className="admin-dash">
            <UserNavBar user="Admin"/>
            <Box sx={{width:'100%',height: '84%', position: 'absolute',display:'flex',marginTop:'1px',flexDirection:'row-reverse'}}>    
                <Paper sx={{ position:'static',width: '275px', display: 'flex', flexDirection:'column',justifyContent:'space-between', backgroundColor:'#2e7eee', alignItems: 'center', pt:6,color:'white' }} elevation={2}>
                    <List>
                        <ListItem onClick={() => {
                            navigate('/admin/dashboard')
                        }}>
                            <ListItemButton>
                                <GridViewIcon backgroundColor='blue'sx={{mr:'5px'}}/>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                        </ListItem>

                        <ListItem onClick={() => {
                            navigate('/admin/projects')
                        }}>
                        <ListItemButton>
                            <SchoolIcon sx={{mr:'5px'}}/>
                            <ListItemText  primary='Projects' />
                        </ListItemButton>
                        </ListItem>

                        <ListItem onClick={() => {
                            navigate('/admin/users')
                        }}>
                        <ListItemButton>
                            <Diversity3Icon sx={{mr:'5px'}}/>
                            <ListItemText primary='Users' />
                        </ListItemButton>
                        </ListItem>

                    </List>
                    
                    <Button sx={{backgroundColor:'red',fontFamily:'san-serif',letterSpacing:'1px',color:'white',width:'55%', mb: 10,":hover":{backgroundColor:'blue'}}} onClick={handleLogout}>
                        Logout<ExitToAppIcon sx={{ml:'5px'}}/>
                    </Button>
                </Paper>
                {/* <Box sx={{width:"10%",height:'100%',backgroundColor:'rgba(255, 255, 255, 0.807)',position:'relative',alignItems:'center',justifyContent:'center'}} elevation={2}>
                    <h2  alignItems='center' justifyContent='center'backgroundColor='red' >welcome {user.email} chitharanjannvnvnvnvnvnvnvnvnvnvnnvnvnnvnvnvnvnvnvnvnvnvnvnvsdfghjkl,mnbvcxzsadfghjkmnbvcx!</h2>
                </Box> */}
                    <Routes>
                         <Route path="/dashboard" element={<AdminHome/>} />
                         <Route path="/projects" element={<AdminProjects/>} />
                         <Route path="/users" element={<AdminUser/>} />
                    </Routes>
            
                </Box>
            <Footer/>
            </div>
                
        
        </>
    )
}

