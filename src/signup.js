import React, {useState} from 'react';
import './components/css/login.css';
import Axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const Signup = () => {
    const [userdata, setUserData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    })
    const history = useHistory();
    
    const register = () => {
        Axios.post('http://localhost:3001/api/register', {
            name: userdata.name,
            email: userdata.email,
            username: userdata.username,
            password: userdata.password
        }).then((res)=>{
            if  (res.data){
                localStorage.setItem('user', userdata.username);
                history.push('/your_work');
                
            }
        })
    }

    return (
        <div className='shand'>
            <div  className='p-3'>
                <span className='display-4'>Sign up</span>
            </div>
            <div className='pl-3 pr-3 pt-3'>
                <label> Name </label>
                <input type='text' onChange={(e) => {setUserData({...userdata, name: e.target.value})}} className='form-control' />
            </div>
            <div className='pl-3 pr-3 pt-3'>
                <label> Email </label>
                <input type='email' onChange={(e) => {setUserData({...userdata, email: e.target.value})}} className='form-control' />
            </div>
            <div className='pl-3 pr-3 pt-3'>
                <label> Username </label>
                <input type='text' onChange={(e) => {setUserData({...userdata, username: e.target.value})}} className='form-control' />
            </div>
            <div className='p-3'>
                <label> Password </label>
                <input type='password' onChange={(e) => {setUserData({...userdata, password: e.target.value})}} className='form-control' />
            </div>
            <div className='p-3'>
                <button onClick={register} className='mr-3 btn btn-primary'>Sign up</button>
                
            </div>
        </div>
    );
}

export default Signup;