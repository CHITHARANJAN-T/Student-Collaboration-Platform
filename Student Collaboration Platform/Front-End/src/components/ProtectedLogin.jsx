// import { Alert, AlertTitle } from '@mui/material';
// import React from 'react'
// import { Navigate } from 'react-router-dom';

// export default function ProtectedLogin({element}) {

//     const isLogin = localStorage.getItem('isLogin')
//     console.log(isLogin);

//     if(isLogin == 'true'){
//         return element;
        
//     }    
    
//     return( 
//     <>
//         <Alert severity="warning" >
//             <AlertTitle>Warning</AlertTitle>
//             Please Kindly Login — <strong>check it out!</strong>
//         </Alert>

//         <Navigate to={"/userlogin"} />
//     </>
//     );
    
// }
import { Alert, AlertTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedLogin({ element }) {
  const isLogin = localStorage.getItem('isLogin');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === 'true') {
      return;
    }

    // Delay navigation for 3 seconds (adjust as needed).
    const delay = 3000; // 3 seconds
    const timeoutId = setTimeout(() => {
      // Navigate to the login page after the delay.
      navigate('/userlogin');
    }, delay);

    // Clean up the timeout when the component unmounts.
    return () => clearTimeout(timeoutId);
  }, [isLogin, navigate]);

  return (
    <>
      {isLogin === 'true' ? (
        element
      ) : (
        <div className="error-404"  style={{width:'100%',height:'90%'}}>
            <div className="error-image"style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
            <img alt='Hi' width="80%"   src='https://cdn2.hubspot.net/hubfs/242200/shutterstock_774749455.jpg'  ></img>
            </div>
        </div>
      )}
    </>
  );
}
