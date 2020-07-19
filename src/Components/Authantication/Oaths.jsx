import React from 'react';

const sg = () =>{}

const lg = () =>{}

const sgi = () =>{}

const lgi = () =>{}

const sf = () =>{}

const lf = () =>{}

const butn = (g,gi,f) =>{
    return (
        <div className='oth'>
            <button onClick={g}><i className="fa fa-google"> <span className='authname'>Google</span></i></button>
            <button onClick={gi}><i className="fa fa-github"> <span className='authname'>Github</span></i></button>
            <button onClick={f}><i className="fa fa-facebook-square"> <span className='authname'>Facebook</span></i></button>
        </div>
    );
}

export const SOaths = () => {
   return butn(sg,sgi,sf);
}

export const LOaths = () => {
    return butn(lg,lgi,lf);
}