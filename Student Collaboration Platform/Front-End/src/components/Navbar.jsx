import { useState } from 'react';
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/user';
import { useNavigate } from 'react-router-dom';

function Navbar  ({user, username, setUsername})  {   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/userlogin');
}


  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
    <img src={user.avatar_url}
    width={'50'}
    height={'50'}
    className='mr-1 avatar'
    alt='Profile'
    />
    <h3 style={{color:'white' ,marginLeft:10}}>{user.name}</h3>

    <p className='ml-auto d-flex align-items-center search-user'> Search User:<input id='search-user-input' type='text' className='search-user-input' /></p>
    <div className="nav-search">
      <button className='search-button' 
      onClick={()=>{
        setUsername(document.getElementById('search-user-input').value)
        console.log(100)
        dispatch(login({username}))
        navigate( `/${username}`);
      }}>search</button>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  </nav>
  );
};

export default Navbar;
