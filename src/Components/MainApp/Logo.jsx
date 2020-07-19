import React from 'react';
import logo from '../../images/chip.png';
import Tilt from 'react-tilt';

function Logo() {
    return(
        <div>
            <Tilt className='Tilt br2 shadow-1' options={{max:25}} style={{height:150, width: 190, background:'linear-gradient(89deg,#FF5DEF 0%,#04C8DE 100%)'}}>
                <img style={{height:130,width:170}} src={logo} alt='logo' />
            </Tilt>
        </div>
    );
}

export default Logo;