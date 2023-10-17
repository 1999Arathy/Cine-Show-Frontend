import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { removeUser } from "../store/authSlice";
import { Link } from 'react-router-dom';




export default function App() {
  const user = useSelector(store =>store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function logout(){
    var options = {
      headers:{'Authorization':'Token '+(user.token)}
    }
    if(user){
      axios.post('http://127.0.0.1:8000/api/logout/',{},options)
    };
    dispatch(removeUser());
    navigate('/')
  }

  return (
    <>

      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <div  className="navbar-brand" >Cine Show</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="mybookings/">MyBookings</Link>
              </li>
            </ul>
            <div className='collapse navbar-collapse justify-content-end float-right' id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item m-2">
                  {user.username}
                </li>
                <li className="nav-item">
                  <button className='btn btn-outline-primary d-flex' onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}