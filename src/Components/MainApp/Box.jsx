import React from 'react';
import 'tachyons';
function Box({faces,onInputChange,onSubmit}) {
    return(
        <>
            <p className='inf tc'>"This Artificial Intelegence Model will detect Faces from your Pictures"</p>
            <div className='box'>
                <input id='inbox' className='nbt' type='tsx' placeholder='Enter any image url' onChange={onInputChange}/>
                <button id='btn' onClick={onSubmit}>Detect</button>
            </div>
            <p className={`inf tc`}>Number of faces detected: <span className='yellow'>{faces}</span></p>
        </> 
    );
}
export default Box;