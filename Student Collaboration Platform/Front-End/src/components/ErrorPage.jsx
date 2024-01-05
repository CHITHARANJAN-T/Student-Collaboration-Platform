
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const isLogin = localStorage.getItem('isLogin');
  const navigate = useNavigate();

  useEffect(() => {

    const delay = 3000;
    const timeoutId = setTimeout(() => {
      navigate(-1);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isLogin, navigate]);

  return (
    <>
      
        <div className="error-404"  style={{width:'100%',height:'90%'}}>
            <div className="error-image"style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
            <img alt='Hi' width="80%"   src='https://cdn2.hubspot.net/hubfs/242200/shutterstock_774749455.jpg'  ></img>
            </div>
        </div>
    </>
  );
}
