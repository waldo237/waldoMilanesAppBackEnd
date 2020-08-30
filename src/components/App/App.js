/* eslint-disable no-shadow */
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Navigation from "../Nav/Nav";
import Routes from "../../Routes/Routes";
import Footer from "../Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { Context } from "../../store/store";
import { confirmLoggedIn, getIdFromLocalToken } from "../Supporters/utilities/authorizationFunctions";
import { fetchProfile } from "../Dashboard/profileFunctions";

const App = () => {
  const [state, dispatch] =useContext(Context);
  useEffect(()=>{
    new Promise((resolve, reject)=>{
    const confirmation = confirmLoggedIn();
    if(confirmation) return resolve(confirmation)
    return reject(new Error('The user is not logged in'));
  })
  .then( (confirmation)=> dispatch({type:'SET_USER_IS_LOGGED_IN', payload: confirmation}))
  .then(()=>{ const {_id} =  getIdFromLocalToken(); return _id})
  .then((_id)=>fetchProfile(`/user/profile/${_id}`, dispatch))  
  .catch((err)=>console.log(err.message));
  },[state.isLoggedIn])
  return (
    <Router>
      <ScrollToTop />
      <div className="app light">
        <header className="header primary " id="header">
          <Navigation />
        </header>
        <Routes className='main' />
        <Footer className='footer' />
      </div>
    </Router>
  );
};

export default App;
