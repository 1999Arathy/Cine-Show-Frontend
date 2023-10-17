import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';


export default function Register() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errormsg, setErrorMsg] = useState('');
    const [successmsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    function signup(){
        var user = {
            username: username, email: email, password: password, password2: password2
        }
        axios.post('http://127.0.0.1:8000/api/register/',user).then(response =>{
            setSuccessMsg('successfully registered')
            // navigate('/')

        }).catch(error=>{
            
            if(error.response.data.errors){
                setErrorMsg(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMsg(error.response.data.message)
            }else{
                setErrorMsg('Failed to Register please try again.')
            }
        })
    }
    function success(){

        navigate('/')

    }

    const myStyle={
        backgroundImage: 
        "url('https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.webp?b=1&s=170667a&w=0&k=20&c=W__8iZMDp4XtPAMPRuTPPYzszc1A4fdajYGn0ox9kG4=')",
        height:'100vh',
        marginTop:'0px',
        // fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

    };

  return (
    <div style={myStyle}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-12-xs col-12-sm col-12-md col-12-lg col-12-xl mt-3'>
                <div className='row mt-5 pt-5'>
                        <div className='col-6 col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-5 offset-lg-3 offset-xl-4 mx-auto d-block'>
                            <div className='text-light pt-3 pb-2  mb-3 text-center'><h3>Sign Up</h3></div>
                            {errormsg?(<div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close"  data-dismiss="alert">&times;</button>
                                    {errormsg}
                                </div>):''}
                            {successmsg?
                                (<div className="alert alert-success alert-dismissible">
                                    <button type="button" className="close" onClick = {success} data-dismiss="alert">&times;</button>
                                    Registration successful
                                </div>):''}
                                <div className='form-group m-4'>
                                    <input type='text' className='form-control' placeholder='Enter User Name' value={username} onInput = {(event)=>setUserName(event.target.value)}/>
                                </div>
                                <div className='form-group m-4'>
                                    <input type='email' className='form-control' placeholder='Enter Email Id' value={email} onInput = {(event)=>setEmail(event.target.value)}/>
                                </div>
                                <div className='form-group m-4'>
                                    <input type='password' className='form-control' placeholder='Enter password' value={password} onInput = {(event)=>setpassword(event.target.value)}/>
                                </div>
                                <div className='form-group m-4'>
                                    <input type='password' className='form-control' placeholder='confirm password' value={password2} onInput = {(event)=>setPassword2(event.target.value)}/>
                                </div>
                                
                                <div className='form-group m-4'>
                                    <button className='btn btn-outline-light mx-auto d-block' onClick={signup}>Sign Up</button>
                                </div>
                                <div className='form-group mt-3 '>
                                    <p className='text-light text-center'>already have an account?<Link to = '/'>Sign Up</Link></p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
