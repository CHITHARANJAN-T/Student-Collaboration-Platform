import { Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import ProjectNotFound from '../image/ProjectFound.svg'
import { Label } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function StudCreateProjects() {

    const navigate = useNavigate();

    const [projectname,setProjectname] = useState('')
    const [description,setDescription] = useState('')
    const [file,setFile] =useState(null) 

    const handleFileChange = (e)=>{
        const f = e.target.files[0]
        setFile(f)
    };

    const handlSubmit = ()=>{
        const project = {};
        project['projectname']=projectname;
        project['description']=description;

        try {
            
            const userName = localStorage.getItem('username')
            console.log(project);
            const res = UserService.createProject(project,userName)
            res.then((data)=>{
                console.log(data);
                if(data!=null){
                    const formData = new FormData();
                    formData.append('file',file)

                    if(file==null){
                        const delRes = UserService.deleteProject(data.pid)
                    }
                    else{
                        const taskid  = JSON.parse(localStorage.getItem('taskid'))
                        const response = UserService.postProject(formData,data.pid,taskid)
                        response.then((data)=>{
                            if(data){
                                navigate(-1)
                            }
                            else{
                                const delRes = UserService.deleteProject(data.pid)
                            }
                        })
                    }
                }
            })

        } catch (error) {
            console.log(error);
        }
     }

   
    return (
        <>
           <Container sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)',display:'flex',justifyContent:'center',alignItems:'center'}}>

           <Grid sx={{width:'75%',height:'80%',backgroundColor:'aliceblue'}}>
                <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',mt:3}}>
                    <Typography variant='h4' sx={{width:'30%',height:'50px'}} ><span>New Project</span></Typography>
                </Box>
                <Divider sx={{backgroundColor:'black',mt:1}} />
           <form  onSubmit={{}}style={{maxWidth:'100%',display:'flex',justifyContent:'left',margin:50,padding:20}}>
                
                <Grid container spacing={2}>
                    <Grid item sx={{width: '250px'}}>
                    <Tooltip title="Project Name Should be Unique" sx={{fontWeight:600}} placement='top' >
                        <TextField label="Project Name" value={projectname} variant="outlined" color={ false ? "info" : "warning"} focused sx={{mt:2,width: '250px'}} onChange={(e)=>{setProjectname(e.target.value)}} />
                    </Tooltip>
                    </Grid>
                    
                        
                    <Grid item >
                    
                        <TextField
                            label="Owner"
                            variant="outlined"
                            // value={input2}
                            disabled
                            defaultValue={localStorage.getItem('username')}
                            onChange={{}}
                            sx={{mt:2,width: '250px'}}
                        />
                        
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <input type='file'  style={{ width: '250px', height: '30px',borderStyle:'outset' }} onChange={handleFileChange} ></input>
                    </Grid>
                    
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{overflow:'hidden',mt:2}}>
                            <textarea rows="6" cols="40" maxWidth="100px" value={description} placeholder="Descripton about Project" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    </Grid>
                </Grid>
                </form>
                <Grid item xs={12} sx={{mt:2,marginLeft:'40%'}}>
                        <Button type="submit" variant="contained" color="primary" onClick={handlSubmit}>
                            Submit
                        </Button>
                </Grid>
                        
           </Grid>

           </Container>
        </>
    );
}
