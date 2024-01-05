import { Box, Button, Card, CardActionArea, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserService from "../api/Axios"
import ProjectNotFound from '../image/ProjectFound.svg'
import { useNavigate } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';

export default function StudProjects(props) {

    const [projects,setProjecs] = useState([])
    const [nullProject,SetNullProject] = useState(false)
    const [pdfViewer,SetPdfViewer] = useState(null)
    const [pdf,setPdf] = useState(false)
    const [messages, setMessages] = useState([])
    const [selected,SetSelected] = useState([])
    const [pj,setPj] = useState(null)
    const [newMessage,setNewMessage] = useState(null)
    const innerboxref = useRef();
    const navigate = useNavigate();

    const handleAddFeedback = (feedbackText)=>{
        const projectname = pj.projectname;
        const res = UserService.addFeedbacks(projectname,feedbackText)
        res.then(data=>{
            console.log(data);
            if(data){
                setNewMessage('')
                const res1 = UserService.getFeebacks(projectname)
                res1.then(data=>{ 
                    SetSelected(data);
            })
            }
        })
    }

    useEffect(()=>{
        innerboxref.current.scrollTop = innerboxref.current.scrollHeight
      },[selected,newMessage])

    const handleFileContent = (pid,project) => {
        const res = UserService.getProjectFile(pid);
        res.then(data => {
            // console.log(typeof data);
            if (data instanceof Blob) {
                SetNullProject(true)
                setPdf(true);
                setPj(project);
                const pdfUrl = URL.createObjectURL(data);
                SetPdfViewer(pdfUrl);

                const res1 = UserService.getFeebacks(project.projectname)
                res1.then(data=>{ 
                    SetSelected(data);
            })
            }
        });
    };

    useEffect(()=>{
        const res = UserService.getAllProjects()
        res.then(data => {
            // console.log(data)    
            setProjecs(data)

            // console.log(!projects);

            if(!projects){
                SetNullProject(true)
            }
        }
        )   
    },[])
    

   
    return (
        (  !nullProject == true ?
            <Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' }}>
            <Box  sx={{ m: 5, display: 'flex-box', gap: 5 ,flexWrap:"wrap",width:"90%"}}>

                {/* <Box sx={{display:'flex',justifyContent:'space-between'}}>
                

                    <Box sx={{display:'flex',maxWidth:'400px'}}>
                        <Typography sx={{m:'20px 20px 0px 0px',color:'black',fontWeight:'500',fontFamily:'',fontSize:"17px"}}>Search for Project :</Typography>
                        <TextField label="Search" variant="outlined" sx={{borderRadius:"100px"}} type="search"/>
                    </Box>
                </Box> */}
                
                <Box ref={innerboxref} sx={{position:'relative',width:'100%', mt: '0px',m:5,flexDirection:'row', display: 'flex', gap: 5 ,flexWrap:"wrap"}}>
                    {
                        projects?.map((project,id)=>(
                        <Card sx={{ width: 345, maxHeight: 150 }} onClick={()=>{handleFileContent(project.pid,project)}}>
                                <CardActionArea>
                            <CardHeader
                                title={project.projectname}
                                
                                subheader={
                                    <Typography mt={2}>{project.description}</Typography>
                                }
                            />
                            
                            <CardContent>
                                <Typography variant='body2'>
                                    Grade : Not Graded
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                        ))
                    
                    }
                </Box>
            
                
            </Box>
        </Box>
        :( pdf?<Box  sx={{ width:'100%', mt: '0px', height: 'calc(100vh - 95px)' ,display:'flex'}}>
                <Box sx={{width:'60%',height:'100%'}}>
                    <embed src={pdfViewer} type="application/pdf" backgroundColor="red" width= "100%" height = '100%'/>
                </Box>
                <Box sx={{position:'relative',width:'40%', mt: '0px',m:5,flexDirection:'row', display: 'flex',flexDirection:'column',justifyContent:'center', gap: 5 ,flexWrap:"wrap"}}>
                    <Typography variant='h4' color={'red'}>Feedbacks</Typography>
                    <Box ref={innerboxref} sx={{ borderRadius: 2,position:'relative', p: '21px 0px 0px 0px', height:'500px', gap: 1, backgroundColor: '#F4F3FF', display: 'flex', flexDirection: 'column',overflowY:"scroll" }} >
                        {
                            selected?.map((feedback,id)=>(
                            <div className='community' style={{padding: '21px 33px 0px 33px'}}>
                                    <Typography key={id} textAlign= 'left'>
                                    <Typography sx={{ fontSize: '10px' }}></Typography>
                                    {feedback.feedbackText}
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
                                        <Button variant='contained' onClick={()=>{handleAddFeedback(newMessage)}} endIcon={<SendIcon />}>Send</Button>
                                        </Box>
                                    </Box>
                        </Box>
                </Box>
            </Box>

            :<div className="no-project-content" style={{ width:'100%', mt: '0px',display:'flex',flexDirection:'column',backgroundColor:""}}>
                <img src={ProjectNotFound} alt="No Projects Found" style={{width:'30%',left:'33%',top:'25px',position:'relative'}}/>
                <div className="project-content" style={{textAlign:'center',position:'relative',marginTop:'25px',color:'rgb(var(--zpOnDataLight))'}}>
                    <div class="emptyscreen h5  ">Ready to create your first project?</div>
                    <div class="emptyscreen h6 ">You do not have any active projects in your portal now.</div>
                    <div class="emptyscreen h6">Go ahead and create your first project.</div>
                    <Button  sx={{color:'white',backgroundColor:'red',margin:'10px', padding:'10px',":hover":{backgroundColor:'blue'}}} onClick={()=>{}} >Create Project </Button>
                </div>
            </div>
        )
        )
    );
}
