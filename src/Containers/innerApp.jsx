import React from 'react';
import Rank from '../Components/MainApp/Rank';
import Box from '../Components/MainApp/Box';
import Logo from '../Components/MainApp/Logo';
import Nav from '../Components/MainApp/Nav';
import ImgBox from '../Components/MainApp/ImgBox';

function InnerApp({resetval,localinput,setimgurl,faces,logout,onInputChange,onSubmit,ImgURL,boxes,backend_url,setuploadstate}) {
    return (
      <>
        <Nav logout={logout}/>
        <Rank/>
        <Logo/>
        <Box resetval={resetval} setuploadstate={setuploadstate} setimgurl={setimgurl} onInputChange={onInputChange} faces={faces} onSubmit={onSubmit}/>
        <ImgBox boxes={boxes} localinput={localinput} ImgURL={ImgURL}/>
      </>
    );
  }
  
  export default InnerApp;
  