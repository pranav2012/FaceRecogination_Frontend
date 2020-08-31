import React from 'react';
import 'tachyons';

function Nav1({login, register}) {
    const signup=()=>{
        login()
        register()
    }
    return(
        <>
            <nav >
                <ul className='nav'>
                    <li className='navlogo'>Face Recogination</li>
                    <li className='navp' onClick={login}>Log-In</li>
                    <li className='navp' onClick={signup}>Register</li>
                </ul>
            </nav>
        </>
    );
}

export default Nav1;