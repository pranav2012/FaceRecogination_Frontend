import React from 'react';
import 'tachyons';
import '../../styles/facerec.css';

function ImgBox ({ImgURL,boxes,localinput}) {
        return(
            <div className = 'flex justify-center ma'>
                <div className ='absolute mt2'>
                     {/*eslint-disable-next-line*/}
                    <img id = 'inputimg' src={ImgURL === ''?localinput:ImgURL} height = 'auto' width = '500px'></img> 
                    {   
                        boxes !== undefined?
                        boxes.map((box,key) => {
                            return <div key={key} className='facebox' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
                        })
                        :console.log(boxes)
                    }
                </div>
            </div> 
        );
}
export default ImgBox;