import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Icon, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import AddFriend from '../image/AddFriend.svg'
import { useNavigate } from 'react-router-dom';

export default function TeachAddStudents() {

    const [users,setUsers] = useState([])
    const [noUsers,setNoUsers] = useState(false)
    const [searchUser,setSearchUser] = useState(null)
    const navigate = useNavigate();


    const handleAddStudent = (uid,name) =>{
        const stud={};
        stud["studname"]=name;
        stud['uid']=uid;
        localStorage.setItem("stud",JSON.stringify(stud))
        console.log( JSON.stringify(stud));
        navigate(-1)
    };

    useEffect(()=>{
        const id = JSON.parse(localStorage.getItem('user')).uid;
        const res = UserService.getAllNonFriends(id)
        res.then(data => {
            setUsers(data)
            if(!users)
                navigate(-1)
        })

        
    },[])
    

    return (
       
            <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
                <Box  sx={{ m: 5, display: 'flex-box', gap: 5 ,flexWrap:"wrap",width:"90%"}}>

                

                    <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                        
                        {/* <Box sx={{display:'flex',width:'50%',height:'75px'}}>
                            <Typography sx={{m:'20px 20px 0px 0px',color:'black',fontWeight:'500',fontFamily:'',fontSize:"17px"}}>Search for users :</Typography>
                            <TextField  label="Search" variant="standard" value={searchUser} sx={{borderRadius:"100px"}}  type="search" onChange={(e)=>{setSearchUser(e.target.value)}}  /> 
                            <IconButton color="primary" sx={{backgroundColor:'#ADD8E6',m:1,height:'50%',":hover":{backgroundColor:'#fd5c63',color:'#fff'}}} ><SearchIcon/></IconButton>
                        </Box> */}
                        
                    </Box>
                    
                    <Box sx={{position:'relative',width:'100%', mt: '0px',m:5,flexDirection:'row', display: 'flex', gap: 5 ,flexWrap:"wrap"}}>
                    {
                        users?.map((friend,id)=>(
                            <Card sx={{ width: 345, height: 150,display:'flex',justifyContent:'space-between' }}>
                        <CardActionArea sx={{width:'90%',pl:2}}>
                            <CardHeader
                                title={friend.name}
                                
                                subheader={
                                    <Typography mt={2}>{friend.email}</Typography>
                                }

                            />
                            
                            
                        </CardActionArea>
                        <Button variant='contained'sx={{mt:5,mr:2,height:'35%',borderRadius:'50px' ,":hover":{backgroundColor:'red'}}} onClick={()=>{handleAddStudent(friend.uid,friend.name)}} endIcon={<PersonAddIcon/>} >
                             ADD 
                        </Button>
                    </Card>

                        ))
                    
                    }
                    </Box>
                
                    
                </Box>
            </Box>
            
           
            
        )
    
}
