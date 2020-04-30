import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
const Navigation = () => {
  return (
    <nav>

      <ul >
        <li>
          <Link to='/'>
            <button className={'btn'} >Waldo Milanes</button>
          </Link>
        </li>
        <li>
          <Link to='/portfolio'  >
            <button className={'btn'}>
              My Work
            </button>
          </Link>
        </li>
        <li>
          <Link to='/node' >
            <button className={'btn'}>
              Node
                </button>
          </Link>
        </li>
        <li>
          <Link to='/vue' >
            <button className={'btn'}>
              Vue
                </button>
          </Link>
        </li>
        <li>
          <Link to='/react' >
            <button className={'btn'}>
              React
                </button>
          </Link>
        </li>
        <li>
          <Link to='/articles' >
            <button className={'btn'}>
              Articles
              </button>
          </Link>
        </li>
        <li>
          <Link to='/contacts' >
            <button className={'btn'}>
              Contacts
              </button>
          </Link>
        </li>
       
        <li>
          <Link to='/supporters' >
            <button className={'btn'}>
              Be my supporter
              </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


export default Navigation;