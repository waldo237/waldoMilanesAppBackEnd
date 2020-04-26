import React from 'react';
import { Link } from "react-router-dom";
import styles from './Navigation.css'
const Navigation = () => {
  return (
    <nav >
      <ul className={'navBar'}>
          <Link to="/">
          <button className={"navItem"} >Waldo Milanes</button>  
            </Link>
     
          <Link to="/portfolio"  >
        <button className={"navItem"}>
            My Work
          <ul>
            <Link to="/node" >
              <button className={"navItem"}>
                  Node
              </button>
            </Link>
            <Link to="/vue" >
              <button className={"navItem"}>
                  Vue
              </button>
            </Link>
            <Link to="/react" >
              <button className={"navItem"}>
                  React
              </button>
            </Link>
      
          </ul>
        </button>
            </Link>
          <Link to="/articles" >
            <button className={"navItem"}>
                Articles
            </button>
          </Link>
          <Link to="/contacts" >
          <button className={"navItem"}>
              Contacts
          </button>
          </Link>
          <Link to="/supporters" >
            <button className={"navItem"}>
                Be my supporter
            </button>
          </Link>
      </ul>
  </nav>
  );
}


export default Navigation;