import React, { useState } from "react"
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from '../api/Axios'
import { Alert} from "@mui/material";



function SignUp() {

    let [role, setRole] = useState("")
    let [email, setEmail] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [isVisible,setIsVisble] = useState(false)
    const [values, setValues] = useState(false)
    const [fault,setFault] = useState("")

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        const user = {};

        user['name'] = username;
        user['email'] = email;
        user['password'] = password;
        user['role'] = role;

        try {
            if (user.name == "" || user.email === "" || user.password == "" || user.role == "") {
                setFault("Please Fill All Inputs!!!")
                setValues(true)
            }
            else {
            const res = UserService.createUser(user);

            res.then(data=>{
                if(data==="User registered successfully"){
                    navigate('/userlogin');
                }
                else{
                    setFault("User Already Exists!!!")
                    setValues(true)
                }
            })}
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="login-container">
            <div className="sign-up">
                <h1>Sign-Up form</h1>
                <div className="login-inputs ">
                    <input className="name-input" type="text" placeholder="username" onChange={(e) => { setUsername(e.target.value); setValues(false)}} required />
                    <input className="mail-input" type="email" placeholder="e-mail" onChange={(e) => { setEmail(e.target.value);setValues(false) }} />
                    <input className="pass-input" type={isVisible?"text":"password"} placeholder="password" onChange={(e) => { setPassword(e.target.value);setValues(false) }} />
                    <label className="login-checkbox">
                        <input type="checkbox" onClick={()=>setIsVisble((pre)=>!pre)}/>
                        <p>Show Password</p>
                    </label>  
                    <div className="select-container">
                        <select for="user-select" className="user-select" value={role} onChange={(e) => { setRole(e.target.value);setValues(false) }}>
                            <option value="" className="user-options">Type of USER</option>
                            <option value="STUDENT" className="user-options">I AM STUDENT</option>
                            <option value="TEACHER" className="user-options">I AM TEACHER</option>
                        </select>
                    </div>
                </div>
                <div className="login-button">
                    <button className="but-log" onClick={handleSignUp}>Sign-In</button>
                </div>
                <div className="sign-in" >
                    <h5 className="log-h5">Already Have an Account ?</h5><Link to='/userlogin'>Login</Link>
                </div>
            </div>
            {/* {values && */}
                <div className="alert alertHolderDiv" style={{left:`${values ? 65:100}%`}}>
                    <Alert variant="filled" severity="warning" sx={{ width: '30%', position: 'fixed' }}>
                        {fault}
                    </Alert>
                </div>
            {/* } */}
        </main>



    )
}

export default SignUp;