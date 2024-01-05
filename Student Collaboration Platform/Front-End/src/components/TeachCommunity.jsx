import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserService from "../api/Axios"
import SendIcon from '@mui/icons-material/Send';
import CommunityImg from "../image/community.jpg"


export default function TeachCommunity() {
    const [messages, setMessages] = useState([])
    const [newMessage,setNewMessage] = useState(null)
    const innerboxref = useRef();

    const handleNewMessage = (message)=>{
        if(message!=null){
            const uid = JSON.parse(localStorage.getItem('user')).uid;
            const res  = UserService.addMessage(message,uid)
            res.then(data=>{
                if(data){
                    setNewMessage('')
                    const res2 = UserService.getMessages();
                    res2.then(data =>{
                        if(data!=null){
                            console.log(data[0].username);
                            setMessages(data) 
                        }
                    })
                }
            })
        }
        
    }

    useEffect(()=>{
        const res = UserService.getMessages();
        res.then(data =>{
            if(data!=null){
                console.log(data[0].username);
                setMessages(data) 
            }
        })
    },[])

    useEffect(()=>{
      innerboxref.current.scrollTop = innerboxref.current.scrollHeight
    },[messages,newMessage])

    // useEffect(()=>{
    //     const id = JSON.parse(localStorage.getItem('user')).uid;
    //     const res = UserService.getAllNonFriends(id)
    //     res.then(data => {
    //         setUsers(data)
    //         if(!users)
    //             navigate(-1)
    //     })

        
    // },[])

    return (
        <>
        <Box  sx={{ width:'100%', mt: '0px',backgroundImage:`url(${CommunityImg})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat', height: 'calc(100vh - 95px)' }}>
            <Box sx={{display:'flex',textAlign:'center',justifyContent:'center',mt:5}}>
                <Typography variant='h4'>Welcome to our Community</Typography>
            </Box>

        <Box sx={{position:'relative',width:'90%', mt: '0px',m:5,flexDirection:'row', display: 'flex',justifyContent:'center', gap: 5 ,flexWrap:"wrap"}}>
                    
                    <Box ref={innerboxref} sx={{ borderRadius: 2,position:'relative', p: '21px 0px 0px 0px', height:'500px', gap: 1, backgroundColor: '#F4F3FF', display: 'flex', flexDirection: 'column',overflowY:"scroll" }} >
                        {
                            messages?.map((message,id)=>(
                            <div className='community' style={{padding: '21px 33px 5px 33px'}}>
                                    <Typography key={id} textAlign={(message.uid == JSON.parse(localStorage.getItem('user')).uid) ? 'right' : 'left'}>
                                    <Typography sx={{ fontSize: '10px' }}>{localStorage.getItem('username') === message.username ?"me":message.username}</Typography>
                                    {message.message}
                                    </Typography>
                                    


                                </div>

                            ))
                        
                        }
                        <Box sx={{ mt: 3,position:'sticky',backgroundColor:'#F4F3FF',bottom:0,m: '21px 33px 10px 33px'}}>
                                        <Box  sx={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TextField
                                            id='message'
                                            name='message'
                                            sx={{ width: '100%' }}
                                            size='small'
                                            placeholder='Message here' 
                                            //  variant='standard'
                                            value={newMessage}
                                            onChange={(e)=>{setNewMessage(e.target.value)}}
                                            />
                                        <Button variant='contained' onClick={()=>{handleNewMessage(newMessage)}} endIcon={<SendIcon />}>Send</Button>
                                        </Box>
                                    </Box>
                        </Box>
                </Box>
                </Box>
            
        </>
    )
}
