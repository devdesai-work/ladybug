import React from "react";
import {Link}  from "react-router-dom";
import "./css/home.css"
import bug from './img/bug2.png';

function Home() {
  return (
    <div className='bhande'>
    <div className='d-flex justify-content-left'>
      <img src={bug} alt='call' style={{height:'100px', width:'100px'}}/>
      <span className='ml-3 display-1'>LadyBUG</span>
    </div>
    <div className='cors d-flex justify-content-center'>
      <span> Open Source Issue and Bug tracking Application </span>
    </div>
    <div className='chote d-flex justify-content-center'>
         <Link to='/login'> <button className='mr-3 btn btn-light'>Login </button> </Link>
         <Link to='/signup'> <button className='btn btn-primary'> Sign up </button> </Link>
    </div>
    </div>
  );
}

export default Home;