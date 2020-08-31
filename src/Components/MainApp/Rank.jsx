import React from 'react';
import 'tachyons';

function Rank() {
    return(
        <>
            <p className='tc userg'>Hey, <span className='nameusr'>{localStorage.getItem('username')}</span> Your Current Score is</p>
            <p className='tc rank'>{localStorage.getItem('enteries')}</p>
        </> 
    );
}
export default Rank;