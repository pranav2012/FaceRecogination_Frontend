import React, { useState } from "react";

function ImageFile ({resetval,setimgurl,setuploadstate}) {
    let [isimage, setbool] = useState(false);
    let [uploadclicked, setupload] = useState(false);
    const filehandler = (event) => {
        resetval();
        setupload(uploadclicked=true);
        if(/\.(jpe?g|png|gif|bmp)$/i.test(event.target.files[0].name)){
            setbool(isimage=true);
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                setuploadstate(isimage,uploadclicked,reader.result.replace(/^data:.+;base64,/, ''));
            }
            setimgurl(URL.createObjectURL(event.target.files[0]));
        }
        else{
            setbool(isimage=false);
        }
    }

        return(
            <div className='inpct' >
                <label className='inpimg'> Pick a File
                    <input type='file' style={{display:'none'}} accept="image/*" onChange={filehandler}></input>
                </label> 
            </div>
        );
}

export default ImageFile;