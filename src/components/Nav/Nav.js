import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Nav.css'

class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      menuActivated: false,
      navItems: [
        { title: 'Waldo Milanes', link: '/' },
        {
          title: 'My Work', link: '/portfolio', children: [
            { title: 'Node', link: '/node' },
            { title: 'Java', link: '/java' },
            { title: 'Vue', link: '/vue' },
            { title: 'React', link: '/React' },
          ]
        },
        { title: 'Articles', link: '/articles' },
        { title: 'Contacts', link: '/contacts' },
        { title: 'Be my supporter', link: '/supporters' },
      ]
    };
  }

  componentDidMount() {
    const nav = document.getElementById("navbar");
    const sticky = nav.offsetTop + nav.offsetHeight;
    const makeStick = () => { // make nav sticky
      if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
        nav.classList.remove("stuck");
      } else {
        nav.classList.remove("sticky");
        nav.classList.add("stuck");
      }
    }
    window.onscroll = () => makeStick();


    const activateNav = () => { //turn widescreen menu on and off.
      if (document.body.clientWidth >= 780) {
        this.setState({ menuActivated: true })
      } else {
        this.setState({ menuActivated: false })
      }
    };
    activateNav();
    window.addEventListener('resize', activateNav);


    document.addEventListener("click", (evt) => { //make the nav colapse if click away.
      if (document.body.clientWidth < 780) {
        const navItems = document.getElementById("nav");
        const innerNav = document.getElementById("with-children");
        let targetElement = evt.target;
        do {
          if (targetElement === navItems || targetElement === innerNav) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        this.setState({
          menuActivated: false
        })
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener('click');
    document.removeEventListener('resize');
  }
  render() {
    return (
      <nav id='navbar'>
        <div className='mid primary' id='nav'>
          <button className='fab-btn' onClick={() => {
            this.setState({
              menuActivated: !this.state.menuActivated
            });
          }}>
            {this.state.menuActivated
              ? <FontAwesomeIcon className='fa-lg' icon={faTimes} />
              : <FontAwesomeIcon className='fa-lg' icon={faBars} />}
          </button>
        </div>
        {
          this.state.menuActivated
            ? <ul className='navItems' id="navItems">
              {this.state.navItems.map((navItem) => <li key={navItem.title}>{this.listNavItems(navItem)}</li>)}
            </ul>
            : null
        }
      </nav>
    );
  }

  listNavItems(item) {
    if (item.children) {
      return <div className='btn nav-item-with-children' >
        <span id='with-children'>{item.title}</span>
        <ul className='inner-nav-item'>
          {item.children.map(child => {
            return <Link to={child.link} key={child.title}>
              <button className='btn spacious block'>
                {child.title}
              </button>
            </Link>
          })}
        </ul>
      </div>
    } else {
      return <Link to={item.link} >
        <button className='btn spacious'>
          {item.title}
        </button>
      </Link>
    }
  }

}


export default Navigation;