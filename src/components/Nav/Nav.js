import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons'
import './Nav.css'
import { faNodeJs, faJava, faVuejs, faReact, } from '@fortawesome/free-brands-svg-icons';

class Navigation extends Component {
  constructor() {

    super()
    this.state = {
      menuActivated: false,
      navItems: [
        { title: 'Waldo Milanes', link: '/' },
        {
          title: 'My Work', link: '/portfolio', children: [
            { title: 'Node', link: '/project/node', icon: faNodeJs },
            { title: 'Java', link: '/project/java', icon: faJava },
            { title: 'Vue', link: '/project/vue', icon: faVuejs },
            { title: 'React', link: '/project/react', icon: faReact },
          ]
        },
        { title: 'Articles', link: '/articles' },
        { title: 'Contact me', link: '/contacts' },
        { title: 'Be my supporter', link: '/supporters' },
        {
          title: '', link: '/React', icon: faLanguage, children: [
            { title: 'español', link: '/', },
            { title: 'English', link: '/', },
            { title: 'français', link: '/', },
          ]
        },
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
      <nav id='navbar' className='primary'>
        <div className='mid primary' id='nav'>
          <button className='fab-btn' onClick={() => { this.setState({ menuActivated: !this.state.menuActivated }); }}>
            {this.state.menuActivated
              ? <FontAwesomeIcon className='fa-lg' icon={faTimes} />
              : <FontAwesomeIcon className='fa-lg' icon={faBars} />}
          </button>
        </div>
        {
          this.state.menuActivated
            ? <div className='navItems-outer-wrapper'>
              <div className='navItems-container primary'> <ul className='navItems' id="navItems">
                {this.state.navItems.map((navItem) => <li key={navItem.title}>{this.listNavItems(navItem)}</li>)}
              </ul>
              </div>
            </div>

            : null
        }
      </nav>
    );
  }

  listNavItems(item) {
    if (item.children) {
      return <div className={`btn ${(!item.icon) ? 'nav-item-with-children' : 'translator'}`}>
        <span className='span-with-children'>{item.title}
          {(item.icon)
            ? <FontAwesomeIcon className='fa-lg' icon={item.icon} />
            : <FontAwesomeIcon className='fa-lg drop-icon' icon={faCaretDown} />}

        </span>
        <ul className='inner-nav-item'>
          {item.children.map(child => {
            return <NavLink activeClassName="active" exact={true} to={child.link} key={child.title}>
              <button className='btn spacious block '>
                {(!item.icon) ? <FontAwesomeIcon className='fa-lg ' icon={child.icon} /> : null}   {child.title}
              </button>
            </NavLink>
          })}
        </ul>
      </div>
    } else {
      return <NavLink activeClassName="active" exact={true} to={item.link} >
        <button className='btn spacious'>
          {item.title}
        </button>
      </NavLink>
    }
  }

}


export default Navigation;