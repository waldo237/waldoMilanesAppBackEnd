import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css'
const Navigation = () => {
  return (
    <nav >
      <ul className={"navBar"}>
        <li>
          <Link to="/">
            <button className={"navItem"} >Waldo Milanes</button>
          </Link>
        </li>
        <li>
          <Link to="/portfolio"  >
            <button className={"navItem"}>
              My Work
            </button>
          </Link>
        </li>
        <li>
          <Link to="/node" >
            <button className={"navItem"}>
              Node
                </button>
          </Link>
        </li>
        <li>
          <Link to="/vue" >
            <button className={"navItem"}>
              Vue
                </button>
          </Link>
        </li>
        <li>
          <Link to="/react" >
            <button className={"navItem"}>
              React
                </button>
          </Link>
        </li>
        <li>
          <Link to="/articles" >
            <button className={"navItem"}>
              Articles
              </button>
          </Link>

        </li>
        <li>
          <Link to="/contacts" >
            <button className={"navItem"}>
              Contacts
            </button>
          </Link>

        </li>
        <li>
          <Link to="/supporters" >
            <button className={"navItem"}>
              Be my supporter
              </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


export default Navigation;