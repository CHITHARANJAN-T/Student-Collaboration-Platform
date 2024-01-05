import { Box, Button, Card, CardActionArea, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import EastIcon from '@mui/icons-material/East';
// import { Button } from '';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function AdminProjects(props) {

    const [projects,setProjecs] = useState([])

    const handleDeleteProject = (pid) =>{
        const res = UserService.deleteProject(pid)
        res.then(data=>{
            console.log(data);
            if(data){
                const res1 = UserService.getAllProjects()
                res1.then(data1 => {
                setProjecs(data1)
        })
            }
        })
    }

    useEffect(()=>{
        const res = UserService.getAllProjects()
        res.then(data => {
            console.log(data)
            setProjecs(data)
        })
    },[])
    

    return (
        <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
            <Box  sx={{ m: 5, display: 'flex', gap: 5 ,flexWrap:"wrap",width:"100%"}}>
                
                {
                    projects?.map((project,id)=>(
                        <Card sx={{ width: 345, maxHeight: 165 }}>
                    <CardActionArea>
                        <CardHeader
                            title={project.projectname}
                            
                            subheader={
                                <Typography mt={2}>{project.description}</Typography>
                            }
                        />
                        
                        <CardContent>
                            <Button variant='contained' color="warning" sx={{mb:3,":hover":{backgroundColor:'red'}}} onClick={()=>{handleDeleteProject(project.pid)}}>Delete  <DeleteForeverIcon/></Button>
                            {/* <Button></Button> */}
                        </CardContent>
                    </CardActionArea>
                </Card>

                    ))
                
                }
                
            </Box>
        </Box>
    )
}
