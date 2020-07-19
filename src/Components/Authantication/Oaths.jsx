import React from 'react';

const sg = () =>{}
const lg = () =>{}

const butn = (g) =>{
    return (
        <div className='oth'>
            <button onClick={g}><i className="fa fa-google"> <span className='authname'>Google</span></i></button>
        </div>
    );
}

export const SOaths = () => {
   return butn(sg);
}

export const LOaths = () => {
    return butn(lg);
}