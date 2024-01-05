import axios from 'axios';

const TEAMCONNECT_API_BASE_URL= "http://localhost:8080/api/v1";

   

const config = {
    headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type':'application/json'    
    }
  };

class UserService {
  
    createUser(user){
        return axios.post(TEAMCONNECT_API_BASE_URL + '/auth/register', user).then(res=>res.data);
    }

    deleteUser(uid){
        return axios.delete(TEAMCONNECT_API_BASE_URL+'/user/delete/'+uid,config).then(res=>res.data)
    }

    loginUser(user){
        return axios.post(TEAMCONNECT_API_BASE_URL + '/auth/login' , user).then(res=>res.data);
    }

    adminLogin(user){
        return axios.post(TEAMCONNECT_API_BASE_URL + '/auth/adminLogin' , user).then(res=>res.data);
    }

    updateUser(id,user){
        console.log(config);
        return axios.put(TEAMCONNECT_API_BASE_URL+'/user/edit/'+id,user,config).then(res => res.data)
    }

    getAllUser(){
        return axios.get(TEAMCONNECT_API_BASE_URL+'/user/get',config).then(res => res.data)
    }
    
    getUserById(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+'/user/find/'+id,config).then(res => res.data)
    }

    getAllFriends(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+'/user/getAllFriends/'+id,config).then(res => res.data)
    }
    
    getAllNonFriends(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+'/user/getAllNonFriends/'+id,config).then(res => res.data)
    }

    addFriend(uid,fid){
        return axios.get(`${TEAMCONNECT_API_BASE_URL}/user/addFriend/${uid}/${fid}`,config).then(res => res.data)
    }

    removeFriend(uid,fid){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/user/removeFriend/"+uid+"/"+fid,config).then(res => res.data)
    }

    //PROJECTS

    createProject(obj,name){
        return axios.post(TEAMCONNECT_API_BASE_URL+`/project/createProject?name=${name}`,obj,config).then(res=>res.data)
    }

    getAllProjects(){
        return axios.get(TEAMCONNECT_API_BASE_URL+'/project/getAllProject',config).then(res => res.data)
    }

    getProjectById(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/project/getProjectById/"+id,config).then(res=>res.data)
    }

    getProjectByName(name){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/project/getProjectByName/"+name,config).then(res=>res.data)
    }

    getUserCount(){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/user/getUserCount",config).then(res=>res.data);
    }

    getProjectFile(pid){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/project/getProjectFile/"+pid ,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/pdf'
            },responseType:'blob'
          }).then(res=>res.data);
    }

    postProject(formData,id,tid){
        return axios.post(TEAMCONNECT_API_BASE_URL+`/project/uploadProject/${id}/${tid}`,formData,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/pdf'  
            }
          }).then(res=>res.data)
    }
    deleteProject(id){
        return axios.delete(TEAMCONNECT_API_BASE_URL+"/project/deleteProject/"+id,config).then(res=>res.data)
    }

    getProjectCount(){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/project/getProjectCount",config).then(res=>res.data);
    }

    addFeedbacks(name,feedback){
        return axios.get(TEAMCONNECT_API_BASE_URL+`/feedback/addFeedback?feedback=${feedback}&projectname=${name}`,config).then(res=>res.data)
    }

    getFeebacks(name){
        console.log(name);
        return axios.get(TEAMCONNECT_API_BASE_URL+`/feedback/getFeedback?projectname=${name}`,config).then(res=>res.data)
    }
    //Tasks

    createTask(uid,name,obj){
        return axios.post(TEAMCONNECT_API_BASE_URL+`/task/createTask/${uid}?name=${name}`,obj,config).then(res=>res.data)
    }
    getTaskCountById(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/task/getTaskCount/"+id,config).then(res=> res.data)
    }
    
    getCompletedTaskCountById(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/task/getCompletedTaskCount/"+id,config).then(res=> res.data)
    }

    getIncompleteTask(uid){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/user/getAllTaskNC/"+uid,config).then(res=>res.data)
    }

    getAssignedTaskById(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/task/getTaskById/"+id,config).then(res=> res.data)
    }
    getCompletedTaskById(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/task/getCompletedTask/"+id,config).then(res=> res.data)
    }

    getTeachCompletedProjects(id){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/project/getTeacherProjectByUid/"+id,config).then(res=>res.data)
    }
    getMessages(){
        return axios.get(TEAMCONNECT_API_BASE_URL+`/community/getAllMessages`,config).then(res=>res.data)
    }

    addMessage(message,uid){
        console.log(TEAMCONNECT_API_BASE_URL+`/community/addMessage?message=${message}&uid=${uid}`);
        return axios.get(TEAMCONNECT_API_BASE_URL+`/community/addMessage?message=${message}&uid=${uid}`,config).then(res=>res.data)
    }

    postGrade(pid,grade){
        return axios.get(TEAMCONNECT_API_BASE_URL+`/project/postGrade/${pid}?grade=${grade}`,config).then(res=>res.data)
    }

    getGradedProjects(uid){
        return axios.get(TEAMCONNECT_API_BASE_URL+"/project/getGradedProject/"+uid,config).then(re=>re.data)
    }


}

export default new UserService();