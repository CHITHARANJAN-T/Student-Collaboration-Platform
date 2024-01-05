import { Box, Button, Card, CardActionArea, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function AdminUser(props) {

    const [user,setuser] = useState([])

    const handleDeleteUser = (uid) =>{
        const res1 = UserService.deleteUser(uid)
        res1.then(data1=>{
            if(data1){
                const res = UserService.getAllUser()
            res.then(data => {
            console.log(data)
            setuser(data)
        })
            }
        })
    }

    useEffect(()=>{
        const res = UserService.getAllUser()
        res.then(data => {
            console.log(data)
            setuser(data)
        })
    },[])
    

    return (
        <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
            <Box  sx={{ m: 5, display: 'flex', gap: 5 ,flexWrap:"wrap",width:"100%"}}>
                
                {
                    user?.map((user,id)=>(
                        <Card sx={{ width: 345, maxHeight: 165 }}>
                    <CardActionArea>
                        <CardHeader
                            title={user.name}
                            
                            subheader={
                                <Typography mt={2}>{user.email}</Typography>
                            }
                        />
                        
                        <CardContent>
                            <Button variant='contained'  sx={{mb:3,backgroundColor:'red',":hover":{backgroundColor:'black',color:'white'}}}onClick={()=>{handleDeleteUser(user.uid)}}>Delete  <DeleteForeverIcon/></Button>

                        </CardContent>
                    </CardActionArea>
                </Card>

                    ))
                
                }
                
            </Box>
        </Box>
    )
}
