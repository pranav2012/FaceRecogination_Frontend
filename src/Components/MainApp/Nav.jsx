import React from 'react';
import 'tachyons';

function Nav({logout}) {
    return(
        <>
            <nav >
                <ul className='nav'>
                    <li className='navlogo'>Face Recogination</li>
                    <li className='navp' onClick={logout}>Log-Out</li>
                </ul>
            </nav>
        </>
    );
}

export default Nav;