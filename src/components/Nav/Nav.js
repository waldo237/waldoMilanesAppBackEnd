import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faLanguage, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './Nav.css'
import { faNodeJs, faJava, faVuejs, faReact, } from '@fortawesome/free-brands-svg-icons';

class Navigation extends Component {
  constructor() {

    super()
    this.state = {
      showSideMenu: false,
      navItems: [
        { title: 'Home', link: '/' },
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
            { title: 'English', link: '/', },
            { title: 'español', link: '/', },
            { title: 'français', link: '/', },
          ]
        },
      ],
          //turn icon .rotate and .closable
   openInnerList: ()=>{
      const icon = document.querySelector('.drop-icon');
      const innerItems = document.querySelector('.inner-nav-item');
       icon.classList.toggle('rotate');
       innerItems.classList.toggle('closable')
     }
    };
  }

  componentDidMount() {
    const nav = document.getElementById("navbar");
    const sticky = nav.offsetTop + nav.offsetHeight;
    const makeNavSticky = () => { 
      if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
        nav.classList.remove("stuck");
      } else {
        nav.classList.remove("sticky");
        nav.classList.add("stuck");
      }
    }
    window.onscroll = () => makeNavSticky();


    const activateSideNav = () => {
      if (document.body.clientWidth >= 780) {
        this.setState({ showSideMenu: true })
      } else {
        this.setState({ showSideMenu: false })
      }
    };
    activateSideNav();
    window.addEventListener('resize', activateSideNav);

    //make the nav colapse if click away.
    document.addEventListener("click", (evt) => { 
      if (document.body.clientWidth < 780) {
        const navItems = document.getElementById("nav");
        const innerNav = document.querySelector(".span-with-children");
        const translator = document.querySelector(".translator");
        let targetElement = evt.target;
        do {
          if (targetElement === navItems || targetElement === innerNav || targetElement === translator) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        this.setState({ showSideMenu: false })
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
          <button className='fab-btn' onClick={() => { this.setState({ showSideMenu: !this.state.showSideMenu }); }}>
            {this.state.showSideMenu
              ? <FontAwesomeIcon className='fa-lg' icon={faTimes} />
              : <FontAwesomeIcon className='fa-lg' icon={faBars} />}
          </button>
        </div>
        {
          this.state.showSideMenu
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
      return <div id='with-children' className={` ${(!item.icon) ? 'nav-item-with-children' : 'translator'}`}>
        <span className='span-with-children' onClick={this.state.openInnerList}>
        {item.title}
          {(item.icon)
            ? <div>
              <select id="selectbox" data-selected="" className='translator btn'>
                {item.children.map((child, i) => <option className='primary' key={i} value={child.title}>{child.title}</option>)
                }
              </select>
            </div>
            : <FontAwesomeIcon className=' drop-icon' icon={faChevronDown} />}
         
        </span>
        {(!item.icon)
          ? <ul className='inner-nav-item'>
            {item.children.map(child => {
              return <NavLink activeClassName="active" exact={true} to={child.link} key={child.title}>
                <button className='btn spacious block '>
                  {(!item.icon) ? <FontAwesomeIcon className='fa-lg' icon={child.icon} /> : null}   {child.title}
                </button>
              </NavLink>
            })}
          </ul>
          : null
        }

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