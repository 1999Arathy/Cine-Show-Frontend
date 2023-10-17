import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from '../../store/authSlice';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function signin(){
        axios.post('http://127.0.0.1:8000/api/',{
            username:username,
            password:password
        }).then(response =>{
            setErrorMessage('')
            console.log(response.data.token) 
            var user = {
                username : username,
                token : response.data.token
            }
            dispatch(setUser(user));
            navigate('list/')

        }).catch(error=>{
            
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login.')
            }
        })
    }
        const myStyle={
            backgroundImage: 
            "url('https://c1.wallpaperflare.com/preview/330/534/353/seat-chair-theatre-dark.jpg')",
            height:'100vh',
            marginTop:'0px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

        };
    
  return (
    <div style={myStyle}>  
        <div className='container-fluid' >
            <div className='row'>
                <div className='col-12 col-12-xs col-12-sm col-12-md col-12-lg col-12-xl mt-5'>
                    <div className='row mt-5 pt-3'>
                        <div className='col-6 col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-5 offset-lg-3 offset-xl-3 mx-auto d-block'>
                            <div className='text-light pt-5  mb-3 text-center'><h3>Sign In</h3></div>
                                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}

                                <div className='form-group  mt-5 mx-5 '>
                                    <input type='text' className='form-control' placeholder='Enter User Name' value={username} onInput = {(event)=>setUserName(event.target.value)}/>
                                </div>
                                
                                <div className='form-group mx-5 my-5'>
                                    <input type='password' className='form-control' placeholder='Enter password' value={password} onInput = {(event)=>setpassword(event.target.value)}/>
                                </div>
                                
                                <div className='form-group mt-3 '>
                                    <button className='btn btn-light align-center mx-auto d-block' onClick={signin}>Sign In</button>
                                </div>

                                <div className='form-group '>
                                    <p className='text-white text-center '>don't have an account?<Link to = 'register/'>Sign In</Link></p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


