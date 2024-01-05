import { Box, Button, Card, CardActionArea, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserService from "../api/Axios"
import ProjectNotFound from '../image/ProjectFound.svg'
import { Label } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { assignTask } from '../features/user'

export default function TeachTaskCompleted() {

    const statename = useSelector(state => state.user.value)
    const [tasks,setTasks] = useState([])
    const [nullTask,SetNullTask] = useState(false)
    const [grade,setGrade] = useState(0)
    const [userId,setUserId] = useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMyProject = () => {
        navigate('/student/my-projects')
    }
    
    const handlePostGrade =(pid) =>{
        const res = UserService.postGrade(pid,grade)
        res.then(data=>{
            if(data){
                const obj = localStorage.getItem("user")
                const taskid = JSON.parse(obj).uid
                const ans = UserService.getTeachCompletedProjects(taskid)
                ans.then(data=>{
                    setTasks(data);
                })
            }
        })
    }
    

    useEffect(()=>{
        try {
            const obj = localStorage.getItem("user")
            const taskid = JSON.parse(obj).uid
            setUserId(taskid)
            console.log(grade);
            const res = UserService.getTeachCompletedProjects(taskid);
            res.then((data)=>{
                setTasks(data)  
            })
            if(tasks==null){
                SetNullTask(true)
            }
            
        } catch (error) {
            console.log(error)
        }  
    },[])
    

   
    return (
        (  ! nullTask == true ?
            <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
            <Box  sx={{ m: 5, display: 'flex-box', gap: 5 ,flexWrap:"wrap",width:"90%"}}>

                
                
                <Box sx={{position:'relative',width:'100%', mt: '0px',m:5,flexDirection:'row', display: 'flex', gap: 5 ,flexWrap:"wrap"}}>
                    
                {
                    tasks?.map((project, id) => (
                        <div className="task-assigned" >
                        <Box sx={{ width: 345, maxHeight: 180,borderStyle:'groove' }}>
                            
                            <CardHeader
                                title={project.projectname}
                                subheader={<Typography mt={2}>{project.description}</Typography>}
                            />
                            <CardContent sx={{pb:2}}>
                                <input type='number'   max={10} min={1} onChange={(e)=>{setGrade(e.target.value)}} />
                                <Button variant='contained' sx={{ml:3}} onClick={()=>{handlePostGrade(project.pid)}}>Post Grade</Button>
                            </CardContent>
                            
                        </Box>
                        </div>
                    ))
                    }
                    
                </Box>
            
                
            </Box>
        </Box>
        :

            <div className="no-project-content" style={{ width:'100%', mt: '0px',display:'flex',flexDirection:'column',backgroundColor:""}}>
                <img src={ProjectNotFound} alt="No tasks Found" style={{width:'30%',left:'33%',top:'25px',position:'relative'}}/>
                <div className="project-content" style={{textAlign:'center',position:'relative',marginTop:'25px',color:'rgb(var(--zpOnDataLight))'}}>
                    <div class="emptyscreen h5  ">No Task Assined For You?</div>
                    <div class="emptyscreen h6 ">You have completed all your tasks</div>
                    <div class="emptyscreen h6">Go ahead and check Your tasks.</div>
                    <Button  sx={{color:'white',backgroundColor:'red',margin:'10px', padding:'10px',":hover":{backgroundColor:'blue'}}} onClick={handleMyProject} >Go to My-Project </Button>
                </div>
            </div>

        )
    );
}
