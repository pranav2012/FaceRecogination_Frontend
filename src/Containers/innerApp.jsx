import React from 'react';
import Rank from '../Components/MainApp/Rank';
import Box from '../Components/MainApp/Box';
import Logo from '../Components/MainApp/Logo';
import Nav from '../Components/MainApp/Nav';
import ImgBox from '../Components/MainApp/ImgBox';


function InnerApp({faces,logout,onInputChange,onSubmit,ImgURL,boxes}) {
    return (
      <>
        <Nav logout={logout}/>
        <Rank/>
        <Logo/>
        <Box onInputChange={onInputChange} faces={faces} onSubmit={onSubmit}/>
        <ImgBox boxes={boxes} ImgURL={ImgURL}/>
      </>
    );
  }
  
  export default InnerApp;
  