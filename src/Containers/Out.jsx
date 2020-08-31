import React from 'react';
import LoginForm from '../Components/Authantication/LoginForm';


function Out({resetpass,loaduser,signclick,backend_url}){

     return(
            <>
            <LoginForm resetpass={resetpass} loaduser={loaduser} signclick={signclick} backend_url={backend_url} />
            </>
        );
}

export default Out;