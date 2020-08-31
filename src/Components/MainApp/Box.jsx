import React from 'react';
import ImageFile from './imgupload';
import 'tachyons';

function Box({resetval,setuploadstate,setimgurl,faces,onInputChange,onSubmit}) {

    return(
        <>
            <p className='inf tc'>"This Artificial Intelegence Model will detect Faces from your Pictures"</p>
            <div className='box'>
                <input id='inbox' className='nbt' type='tsx' placeholder='Enter any image url' onChange={onInputChange}/>
                <button id='btn' onClick={onSubmit}>Detect</button>
            </div>
            <ImageFile resetval={resetval} setimgurl={setimgurl} setuploadstate={setuploadstate}/>
            <p className={`fdtct tc`}>Number of faces detected: <span className='yellow'>{faces}</span></p>
        </> 
    );
}
export default Box;