import { createBrowserRouter } from "react-router-dom";
import MovieList from "./components/movies/MovieList";
import Register from "./components/movies/Register";
import DetailView from "./components/movies/DetailView";
import MyBookings from "./components/movies/MyBookings.js";
// import Seat from './components/movies/Seat';
import Login from "./components/movies/Login";

const router = createBrowserRouter([
    { path: '', element : <Login/>},
    { path: 'register/', element : <Register/>},
    { path: 'list/', element: <MovieList/> },
    { path: 'list/detail/:movieId', element: <DetailView/> },
    { path: 'list/mybookings/', element: <MyBookings/> },
    { path: 'list/detail/:movieId/list', element: <MovieList/>},
    // { path: 'list/seat/', element: <Seat/>}

]);

export default router;