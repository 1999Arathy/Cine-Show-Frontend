import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams} from 'react-router-dom';
import Navbar from '../Navbar';
import { getToken, getUser } from '../../store/authSlice';
import checkAuth from '../auth/checkAuth';

function DetailView() {
    var {movieId} = useParams()
    const [movies, setMovies] = useState([])
    const user = useSelector(store =>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [successMsg, setSuccessMsg] = useState();
    const [errorMsg, setErrorMsg] = useState();
    
    function book(){  
        if(user){
            dispatch(getToken);
            dispatch(getUser);
            
            var options = {
                headers:{'Authorization':'Token '+(user.token)}
            }
            console.log('token from detail : ', user.token)       
            if(count>0){
                var details = {Movie_Name:movies.Name, Date:movies.Date, Time:movies.Time, Seat_count:count, User_name:user.username}
                setErrorMsg('')
                axios.post('http://127.0.0.1:8000/api/booking/',details,options)
                .then(response =>{   
                    setSuccessMsg('Booking successful! Enjoy ur movie ...')
            })
            }else if(count<=0){
                setErrorMsg('Number of tickets cannot be 0')
            }
            
        }
    } 

    // function success(){
    //     navigate('link/')
    // }

    useEffect(() =>{
    
        dispatch(getToken);
        var options = {
            headers:{'Authorization':'Token '+(user.token)}
        }
       if(user){
            console.log('token from view : ',user.token)
            axios.get('http://127.0.0.1:8000/api/detail_view/'+movieId,options
            ).then(response =>{
                setMovies(response.data)});
        }
    },[dispatch, movieId, user])
  
    return (
    <div>
        <Navbar></Navbar>
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-12 col-sm-12 col-xs-12 col-md-12 col-xl-12 col-lg-12 mt-5'>
                    <h2>Grab your tickets...</h2>
                    {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}
                    {/* {successMsg? (<div className="alert alert-success "> {successMsg} </div>):''} */}
                    <div className="card " style={{width: "18rem;", border:'none'}}>
                        <div className="card-body">
                            <div className="card-title">
                                <table className='table table-borderless'>
                                    <tr>
                                        <th>Movie Name</th>
                                        <td>
                                            <h3>{movies.Name}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Date </th>
                                        <td>
                                            {movies.Date}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Time</th>
                                        <td>
                                            {movies.Time}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>No: Tickets</th>
                                        <td>
                                            <button type='button' className = 'btn btn-outline-warning m-2' onClick={()=> setCount(count-1)}><i class="fa fa-minus"></i></button>
                                            {count} 
                                            <button type='button' className = 'btn btn-outline-primary m-2' onClick={()=> setCount(count+1)}><i class="fa fa-plus"></i></button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <button className='btn btn-primary  ml-3' onClick={book} data-toggle="modal" data-target="#demo">Book Ticket</button>  
                            
                            <div class="modal" id="demo">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            {successMsg}
                                        {/* </div>
                                        <div class="modal-footer"> */}
                                            <button type="button" class="btn btn-danger float-right"  data-dismiss="modal">Ok</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default checkAuth(DetailView)