import React, {useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getToken } from '../../store/authSlice';
import { Link } from 'react-router-dom';
import checkAuth from '../auth/checkAuth';

axios.defaults.withCredentials = true;

function MovieList() {

    const [movies, setMovies] = useState([])
    const user = useSelector(store =>store.auth.user);
    const dispatch = useDispatch();

    useEffect(() =>{
       if(user){
        dispatch(getToken);
        var options = {
            headers:{'Authorization':'Token '+(user.token)}
        }
        console.log(options)
        axios.get('http://127.0.0.1:8000/api/list/',options
        ).then(response =>{
            setMovies(response.data)});
       }
    },[dispatch, user])

  return (
    <div>
        <Navbar></Navbar>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-sm-12 col-xs-12 col-md-12 col-xl-12 col-lg-12 mt-5'>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-xs-12 col-md-12 col-xl-12 col-lg-12  mb-3  bg-body-tertiary rounded'> 
                            <div id="demo" class="carousel slide" data-ride="carousel">
                                <ul class="carousel-indicators">
                                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                                    <li data-target="#demo" data-slide-to="1"></li>
                                    <li data-target="#demo" data-slide-to="2"></li>
                                </ul>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                    <img src="https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg?w=1380&t=st=1696995662~exp=1696996262~hmac=968c9bb5960a67cc7d2021b9efdaf3c313189378c7cc8c4bc308e03c528f26b7" className='img-fluid' alt="Alappuzha" width="1100" height="550"/>
                                    </div>
                                    <div class="carousel-item  className='img-fluid">
                                    <img src="https://wallpaperaccess.com/full/9335233.jpg" alt="Kovalam" width="1100" height="520" className='img-fluid'/>
                                    </div>
                                    <div class="carousel-item">
                                    <img src="https://i0.wp.com/moviegalleri.net/wp-content/uploads/2023/06/Thalapathy-Vijay-LEO-Movie-First-Look-Poster-HD.jpg?ssl=1" alt="Trivandrum" width="1100" height="520" className='img-fluid'/>
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                    <span class="carousel-control-prev-icon"></span>
                                </a>
                                <a class="carousel-control-next" href="#demo" data-slide="next">
                                    <span class="carousel-control-next-icon"></span>
                                </a>
                            </div>
                         
                        </div>                        
                        <div className='col-12 col-sm-12 col-xs-12 col-md-12 col-xl-12 col-lg-12 mt-5'>
                        {movies.map((movie) =>( 
                                <div className="card mb-3 shadow p-3 mb-5 bg-body rounded " key={movie.id}style={{maxWidth: "100%"}}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={movie.Image} className="img-fluid rounded-start" alt="..."/>
                                        </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title ml-3">{movie.Name}</h5>
                                            <div className="card-text">
                                                <table  className='table table-borderless m-3 '>
                                                    <tr >
                                                        <th className='mr-3'>Director  </th>
                                                        <td>{movie.Director}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='mr-3'>Date </th>
                                                        <td>{movie.Date}</td>   
                                                    </tr>
                                                    <tr>
                                                        <th className='mr-3'>Time </th>
                                                        <td>{movie.Time}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='mr-3'>Actors </th>
                                                        <td>{movie.Actors}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='mr-3'>Language</th>
                                                        <td>{movie.Language}</td>
                                                    </tr>
                                                
                                                </table>
                                                <Link to={'detail/'+movie.id} className='btn btn-outline-primary ml-3'>Book Now</Link>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                                </div>
                            ))} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
export default checkAuth(MovieList)
