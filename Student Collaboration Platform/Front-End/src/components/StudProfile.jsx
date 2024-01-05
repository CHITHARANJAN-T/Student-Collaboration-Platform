import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogActions from '@mui/material/DialogActions';
import UserService from "../api/Axios"
import ProjectNotFound from '../image/ProjectFound.svg'
import { Label } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {assign} from '../features/user'

export default function StudProfile() {

    const naviagate  =  useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [checked,setChecked] = useState(false);
    const [hide,setHide] = useState(false)
    const [user,setUser] = useState({})
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [nameExist,setNameExist]= useState(false)
 
    const handleSwitch = () => {
        setHide(!hide)
        setChecked(!checked)
    }

    const handleDialogOpen = () => {
      setOpen(true);
    };
  
    const handleDialogClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
        const updatedUser = {};
        updatedUser['name'] = userName;
        updatedUser['password']=password;
        console.log(updatedUser);

        try {
            const obj = localStorage.getItem("user")
            const id = JSON.parse(obj).uid

            
            const res = UserService.updateUser(id,updatedUser)
            res.then((data)=>{
                if(!data){
                    console.log(data);
                    setNameExist(true)
                }
                else{
                    console.log(data);
                    const name = userName.toUpperCase()
                    // dispatch(login({name}));
                    naviagate(-1)
                }
                
            })
            
        } catch (error) {
            console.log(error);
        }

        
    };


    useEffect(()=>{
        try {
            const obj = localStorage.getItem("user")
            const id = JSON.parse(obj).uid
            const res = UserService.getUserById(id)
            res.then((data)=>{
                setUser(data)
                
                
            })
            
        } catch (error) {
            console.log(error)
        }
        
    },[])

   
    return (
        <>
           <Container sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)',display:'flex',justifyContent:'center',alignItems:'center'}}>

           <Card sx={{width:'50%',height:'80%',backgroundColor:'#ededed'}}>
                <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',pt:3,backgroundColor:'#dddada'  }}>
                    <Typography  sx={{width:'30%',height:'50px',fontSize:'20px',fontWeight:'600'}} ><span>Personal Details</span></Typography>
                </Box>
                <Divider sx={{backgroundColor:'black',t:1}} />
            <form  onSubmit={{}}style={{maxWidth:'100%',display:'flex',justifyContent:'left',margin:50,padding:20}}>
            
                
                <Grid container spacing={2}>
                    <Grid item sx={{width:'80%'}}>
                    <TextField label="Name" variant="outlined" value={userName} placeholder={user.name}  onChange={(e)=>{setUserName(e.target.value)}} color={ !nameExist ? "info": "warning"} focused sx={{mt:0.5}} fullWidth />

                    </Grid>
                    
                    
                    <Grid item  sx={{width:'80%'}}>
                        <TextField
                            // label="Email"
                            variant="outlined"
                            value={user.email}
                            disabled
                            fullWidth
                            
                            sx={{mt:2}}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <Button sx={{backgroundColor:'#F40009',color:'#fff',":hover":{backgroundColor:'#F40009'}}} onClick={handleDialogOpen} >
                            Change Password
                        </Button>
                        <Dialog open={open} >
                                <DialogTitle>PassWord Change</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please Remember your new Password
                                    </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Password"
                                    type={!hide?'password':'text'}
                                    fullWidth
                                    variant="outlined"
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                />
                                <Switch checked={checked} onChange={handleSwitch}   ></Switch>
                                <Typography >Show Password</Typography>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleDialogClose}>Cancel</Button>
                                <Button onClick={handleDialogClose}>Save Changes</Button>
                                </DialogActions>
                            </Dialog> 
                </Grid>
                    
                    
                </Grid>
                
                </form>
                <Grid item xs={12} sx={{mt:2,marginLeft:'40%'}}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                </Grid>
                        
           </Card>

           </Container>
        </>
    );
}
