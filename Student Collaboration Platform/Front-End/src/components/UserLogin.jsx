import React, { useState } from "react"
import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {assign} from '../features/user'
import Footer from "./Footer"
import UserService from "../api/Axios"
import { Alert } from "@mui/material"


function UserLogin() {
    
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [isVisible,setIsVisble] = useState(false)
    const [values, setValues] = useState(false)
    const [fault,setFault] = useState("")

    const store = useSelector(state => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {};
        user['email'] = email;
        user['password'] = password;

        try{
            if ( user.email === "" || user.password == "" ) {
                setFault("Please Fill All Inputs!!!")
                setValues(true)
            }
            else{
                    const res = UserService.loginUser(user);
                    
                    res.then(data=>{
                        console.log(data);
                        if(data.token===null){
                            setFault("Invalid Credentials!!!")
                            setValues(true)
                        }
                        else {
                                const role = JSON.parse(atob(data.token.split('.')[1]))
                                localStorage.setItem("token",data.token)
                                localStorage.setItem('user',JSON.stringify(role.user))
                                localStorage.setItem('role',role.user.role)
                                localStorage.setItem('isLogin', 'true');
                                localStorage.setItem('username',data.name)
                                const n1 = data.name.toUpperCase();
                                const storeValue = n1;
                                console.log(storeValue);
                                dispatch(assign({storeValue}));
                                if(role.user.role=="STUDENT")
                                    navigate( '/student/dashboard');
                                else if(role.user.role=="TEACHER")
                                    navigate("/teacher/dashboard")
                            }
                    })}
        }
        catch(err){
            console.log(err)
        }
    }

    

    return (
        <>
        <main className="login-container">
            <div className="login">
                <h1>Login form</h1>
                    <div className="login-inputs ">
                        <input className="name-input" value={email} type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value);setValues(false)} }/>
                        <input className="pass-input" value={password} type={isVisible?"text":"password"} placeholder="password" onChange={(e)=>{setPassword(e.target.value);setValues(false)} }/>
                    </div>
                    <label className="login-checkbox">
                        <input type="checkbox" onClick={()=>setIsVisble((pre)=>!pre)}/>
                        <p>Show Password</p>
                    </label>
                    <div className="login-button">
                        <button type="submit" className="but-log"
                        onClick={handleLogin}>Login</button>
                    </div>
                    <div className="sign-in">
                    <h5 className="log-h5" >New to the Platform ?</h5><Link to='/signup'> Register</Link>
                    </div>
                    <div className="admin-log">
                    <h5 className="admin-log-h5" ></h5><Link to='/adminlogin'>Admin Login</Link>
                    </div>
            </div>  
            <div className="alert alertHolderDiv" style={{left:`${values ? 65:100}%`}}>
                    <Alert variant="filled" severity="warning" sx={{ width: '30%', position: 'fixed' }}>
                        {fault}
                    </Alert>
                </div>          
        </main>
        <Footer/>
        </>

    )
}

export default UserLogin;