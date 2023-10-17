import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/authSlice';
import axios from 'axios';
import { useState } from 'react'
import Navbar from '../Navbar';
import cineShow  from '../../cineshow.jpg';
import QRCode from 'react-qr-code';
import checkAuth from '../auth/checkAuth';

function MyBookings() {
  const user = useSelector(store =>store.auth.user);
  const dispatch = useDispatch();
  const [result, setResult] = useState()
  
  useEffect(() =>{
    if(user){
        var options = {
            headers:{'Authorization':'Token '+(user.token)}
        }
        console.log('token from ticket : ', user.token) 
        
        axios.get('http://127.0.0.1:8000/api/ticket/'+user.username,options
        ).then(response =>{
          setResult(response.data)});
          
       }dispatch(getToken);
    },[dispatch, user])
  
  return (
    <div>
      <Navbar></Navbar>
        <div className='container'>
            <div className='row'>
              <div className='col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-5'>
                <h2>Your Bookings.....</h2>
                {result?.map((r) =>( 
                  <div className='row'>
                  <div className='col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'> 
                    <div className="card bg-dark text-white mt-5">
                      <img src = {cineShow} className = 'card-image' alt = ''/>
                      <div className="card-img-overlay mt-3">
                        <div className='mt-5 pt-5'>
                          <span className= "card-title mt-5 pl-5 display-4">{r.Movie_Name}</span>
                          <span className = 'float-right mr-5 pr-4 mt-0'><QRCode title="Cine Show" value={r}
                                  bgColor='white' fgColor='black'
                                  size='150px'
                          /></span>
                        </div>
                        <div><span className="card-text ml-3 d-inline-block mt-3">Ticket No: {r.Ticket_id}</span> </div>
                        <span className="card-text ml-4 d-inline-block mt-5">{r.Date}</span>
                        <span className="card-text ml-4 pl-3 d-inline-block">{r.Time}</span>
                        <span className="card-text ml-5 pl-3 d-inline-block">No of seats {r.Seat_count}</span>
                          
                          
                      </div>
                      
                    </div>
                    </div>
                    </div>
                ))}
              </div>
          </div>
      </div>
    </div>
  )
}
export default checkAuth(MyBookings)