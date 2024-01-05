import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import ProjectNotFound from '../image/ProjectFound.svg'
import { Label } from '@mui/icons-material'
import TaskImage from "../image/TaskImage.jpg"
import { useNavigate } from 'react-router-dom'

export default function TeachCreateTask() {

    const navigate = useNavigate();

    const [projectname,setProjectname] = useState('')
    const [description,setDescription] = useState('')
    const [added,setAdded] =useState(false) 
    const [studname,setStudname]=useState('')

    // const handleFileChange = (e)=>{
    //     const f = e.target.files[0]
    //     setFile(f)
    // };

    const handleAddStudent = () =>{
        navigate("/teacher/addStudent")
    }

    const handlSubmit = ()=>{
        const project = {};
        project['task']=projectname;
        project['description']=description;

        try {
            const uid = JSON.parse(localStorage.getItem("stud")).uid
            const name = localStorage.getItem('username')
            console.log(project);
            const res = UserService.createTask(uid,name,project)
            res.then(data=>{
                if(data)
                    navigate(-1)
            })
            
        } catch (error) {
            console.log(error);
        }
     }

     useEffect (()=>{
        const stud = localStorage.getItem("stud")
        if(stud!=null){
            setStudname(JSON.parse(localStorage.getItem('stud')).studname)
            console.log(typeof JSON.parse(localStorage.getItem('stud')).studname);
            setAdded(true)
        }
     })

   
    return (
        <>
           <Container sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)',display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:`url(${TaskImage})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>

           <Grid sx={{width:'60%',height:'80%',backgroundColor:'rgb(232, 230, 230)',opacity:0.9}}>
                <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',mt:3}}>
                    <Typography variant='h5' sx={{width:'30%',height:'50px',color:'blue'}} ><span>Add New Task</span></Typography>
                </Box>
                <Divider sx={{backgroundColor:'blue',mt:1}} />
            <form  onSubmit={{}}style={{maxWidth:'100%',display:'flex',justifyContent:'left',margin:50,padding:20}}>
                    
                    <Grid container spacing={2}>
                        <Grid item sx={{width: '250px'}}>
                        <Tooltip title="Task Name Should be Unique" sx={{fontWeight:600}} placement='top' >
                            <TextField label="Task Name" value={projectname} variant="outlined" color= "info"  focused sx={{mt:2,width: '100%'}} onChange={(e)=>{setProjectname(e.target.value)}} />
                        </Tooltip>
                        </Grid>
                        
                            
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{overflow:'hidden',mt:2,ml:2}}>
                                    <textarea rows="3" cols="30" maxWidth="100px" value={description} placeholder="Task Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{mt:2}}>
                            <Button variant='outlined'sx={{backgroundColor:'blue',color:'white',":hover":{backgroundColor:'rgb(57, 179, 255)'}}} onClick={handleAddStudent}>{added?studname:"Add Student"}</Button>
                        </Grid>
                        
                    </Grid>
                    
                    </form>
                    <Grid item xs={12} sx={{mt:2,marginLeft:'40%'}}>
                        <Button type="submit" variant="contained" color="primary"  onClick={handlSubmit}>
                            Submit
                        </Button>
                </Grid>
                        
           </Grid>

           </Container>
        </>
    );
}
