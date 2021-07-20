import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './components/css/login.css';
import Axios from 'axios';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [invalid, setInvalid] = useState('');
    const history = useHistory();

    const verify = () => {
        Axios.post('http://localhost:3001/api/login', {
            email: data.email,
            password: data.password
        }).then((res)=>{
            if (res.data.message === 'Wrong email/password combination' || res.data.message === "User doesn't exist"){
                setInvalid(res.data.message)
            }
            else {
                const data = res.data[0].username;
                console.log(data)
                localStorage.setItem('user', data);
                history.push('/your_work');
            }
        })
    }

    return (
        <div className='bhand'>
            <div  className='p-3'>
                <span className='display-4'>Login</span>
            </div>
            <div className='pl-3 pr-3 pt-3'>
                <label> Email </label>
                <input onChange={(e)=>{setData({...data, email:e.target.value})}} type='email' className='form-control' />
            </div>
            <div className='p-3'>
                <label> Password </label>
                <input onChange={(e)=>{setData({...data, password:e.target.value})}} type='password' className='form-control' />
            </div>
            <div className='p-3'>
                <button onClick={verify} className='mr-3 btn btn-primary'>Login</button>
                <a href="#">Forgot password</a>
            </div>
            {invalid}
        </div>
    );
}

export default Login;