import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EastIcon from '@mui/icons-material/East';
import UserService from "../api/Axios"
import { useNavigate } from 'react-router-dom';

export default function AdminDash() {
    

    const[userCount,setUserCount]=useState("")
    const[projectCount,setProjectCount] = useState("");
    const navigate = useNavigate()
    

    useEffect(() => {
        const user = UserService.getUserCount()
            user.then(data => {
                setUserCount(data);
        });

        const proj = UserService.getProjectCount()
            proj.then(data =>{
                setProjectCount(data);
            })
          });

    return (
        <>
         <Box  sx={{  mt: '95px', height: 'calc(100vh-95px)', display: 'flex',width:'100%'  }}>
            {/* <SidePanel /> */}
            <Box sx={{ m: 5, display: 'flex', gap: 5 }}>
                <Card sx={{ maxWidth: 345, maxHeight: 200 }} onClick={()=>{navigate("/admin/users")}} >
                    <CardActionArea>
                        <CardHeader
                            title='Users'
                            action={
                                <IconButton>
                                    <EastIcon />
                                </IconButton>
                            }
                            subheader={
                                <Typography mt={2}>{userCount}</Typography>
                            }
                        />
                        

                        
                        <CardContent>
                            <Typography variant='body2'>
                                This User Card has number of Users that have registered in TeamConnect Platform
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 345, maxHeight: 200 }} onClick={()=>{navigate("/admin/projects")}}>
                    <CardActionArea>
                        <CardHeader
                            title='Projects'
                            action={
                                <IconButton>
                                    <EastIcon />
                                </IconButton>
                            }
                            subheader={
                                <Typography mt={2}>{projectCount}</Typography>
                            }
                        />
                        
                        <CardContent>
                            <Typography variant='body2' >
                                This Project Card has the numbers of Projects that has been created in TeamConnect Platform
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
            
        </>
    )
}
