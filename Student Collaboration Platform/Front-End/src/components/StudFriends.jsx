import { Box, Button, Card, CardActionArea, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import EastIcon from '@mui/icons-material/East';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NoFriends from '../image/NoFriends.svg'
import { useNavigate } from 'react-router-dom';
import StudFriendProjects from './StudFriendProjects';

export default function StudFriends() {

    const [friends,setFriends] = useState([])
    const [noFriends,setNoFriends] = useState(false)
    const [noValues,setNoValues] = useState(true);
    const navigate = useNavigate();

    const hanleFriendProject = (friendName) => {
        // console.log(frienduid);
        navigate(`/student/friend/project/${friendName}`)
    }

    const handleRemoveFriend = (fid) =>{
        const uid = JSON.parse(localStorage.getItem('user')).uid;
        // console.log(fid,uid);
        const res = UserService.removeFriend(uid,fid)
        res.then(data => {
            const res = UserService.getAllFriends(uid)
        res.then(data => {
            if(data.length!=0){
                setFriends(data)
                setNoFriends(true)
            }
            else{
                setNoFriends(false)
            }
        })
        })

    };

    useEffect(()=>{
        const id = JSON.parse(localStorage.getItem('user')).uid;
        const res = UserService.getAllFriends(id)
        res.then(data => {
            if(data.length!=0){
                setFriends(data)
                setNoFriends(true)
            }
        })
        const but = UserService.getAllNonFriends(id)
        but.then(data=>{
            console.log(data);
            if(data==0){
                setNoValues(false)
            }
        })
    },[])
    

    return (
        ( noFriends ?
            <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
                <Box  sx={{ m: 5, display: 'flex-box', gap: 5 ,flexWrap:"wrap",width:"90%"}}>

                

                    <Box sx={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:'100%'}}>
                        <Typography  mt={2} variant='h3'>Your Friend List!!!</Typography>
                        {  noValues &&  <Button  sx={{color:'white',backgroundColor:'red',margin:'10px',fontSize:'12px', padding:'10px',":hover":{backgroundColor:'blue'}}} onClick={()=>{navigate('/student/addfriend')}} >
                            Add New Friend 
                        </Button>}
                        
                        
                    </Box>
                    
                    <Box sx={{position:'relative',width:'100%', mt: '0px',m:5,flexDirection:'row', display: 'flex', gap: 5 ,flexWrap:"wrap"}}>
                    {
                        friends?.map((friend,id)=>(
                            <div className="friends" >
                                <Card sx={{ width: 345, height: 150,display:'flex',justifyContent:'space-between' }}>
                        <CardActionArea>
                            <CardHeader
                                title={friend.name}
                                onClick={()=>{hanleFriendProject(friend.name)}} 
                                subheader={
                                    <Typography mt={2}>{friend.email}</Typography>
                                }
                            />
                            
                            <CardContent>
                                
                            </CardContent>
                        </CardActionArea>
                        <Button variant='contained'sx={{mt:5,mr:2,height:'28%',borderRadius:'50px',backgroundColor:'red',display:'flex',textAlign:'center',justifyContent:'center' ,":hover":{backgroundColor:'blue'}}} onClick={()=>{handleRemoveFriend(friend.uid)}} endIcon={<DeleteForeverIcon/>} >
                                <Typography variant='body2'  sx={{fontSize:'90%'}}>
                                {/* <img src={AddFriend} ></img> */} Remove
                                </Typography>
                        </Button>
                    </Card>
                            </div>

                        ))
                    
                    }
                    </Box>
                </Box>
            </Box>
            : 
           
            <div className="no-project-content" style={{ width:'100%', mt: '0px',display:'flex',flexDirection:'column',backgroundColor:""}}>
            <img src={NoFriends} alt="No Projects Found" style={{width:'20%',left:'40%',top:'34px',position:'relative'}}/>
            <div className="project-content" style={{textAlign:'center',position:'relative',marginTop:'45px',color:'rgb(var(--zpOnDataLight))'}}>
                <div class="emptyscreen h5  ">It's Sad to be alone</div>
                <div class="emptyscreen h5">Go ahead and Add New Homie.</div>
                <Button  sx={{color:'white',backgroundColor:'red',margin:'10px', padding:'10px',":hover":{backgroundColor:'blue'}}} onClick={()=>{navigate('/student/addfriend')}} >Add Friend
                 </Button>
            </div>
        </div>
        )
    )
}
