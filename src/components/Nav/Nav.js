import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import "./Nav.scss";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import {Context} from '../../store/store'
import bannerImg from "../../static/banner.png";
import Avatar from '../Avatar/Avatar';
import Settings from '../Dashboard/Settings';
import Dashboard from '../Dashboard/Dashboard';
import ClickAwayCloser from './ClickAwayCloser'
import ListWithNavItems from "./ListWithNavItems";

const Navigation = () => {
 const [state] = useContext(Context);
const [showSideMenu, toggleSideMenu] = useState(false);
const [settingsActivated, toggleSettings] = useState(false);


const navItems = [
    { title: "Home", link: "/" },
    {
      title: "My Work",
      link: "/portfolio",
      children: [
        { title: "Node", link: "/project/node", icon: faNodeJs },
        { title: "Java", link: "/project/java", icon: faJava },
        { title: "Vue", link: "/project/vue", icon: faVuejs },
        { title: "React", link: "/project/react", icon: faReact },
      ],
    },
    { title: "Articles", link: "/articles" },
    { title: "Contacts", link: "/contacts" },
    { title: "followers", link: "/followers" },
    { title: "settings", icon: faEllipsisV, link: '/' },
  ];
  // turn icon .rotate and .closable
  const openInnerList = () => {
    const icon = document.querySelector(".drop-icon");
    const innerItems = document.querySelector(".inner-nav-item-list");
    icon.classList.toggle("rotate");
    innerItems.classList.toggle("closable");
  };
  const removeDisplayNone = (id) => {
    const hiddenelements = document.querySelectorAll('.display-none');
    hiddenelements.forEach((elem) => {
      if (elem.children[0].id === id) {
        elem.classList.remove('display-none');
      };
    })
  }


  useEffect(() => {
    const nav = document.getElementById("navbar");
    const navOriginalPositioin = nav.offsetTop;
    const makeNavSticky = () => {
      if (window.pageYOffset > navOriginalPositioin) {
        nav.classList.add("sticky");
        nav.classList.remove("stuck");
      } else {
        nav.classList.remove("sticky");
        nav.classList.add("stuck");
      }
    };
    window.onscroll = () => makeNavSticky();

    const activateSideNav = () => {
      if (document.body.clientWidth >= 780) {
        toggleSideMenu(true);
      } else {
        toggleSideMenu(false);
      }
    };
    activateSideNav();
    window.addEventListener("resize", activateSideNav);

    // make the nav colapse if click away.
    document.addEventListener("click", (evt) => {
      if (document.body.clientWidth <= 780) {
        const navElem = document.getElementById("nav");
        const innerNav = document.querySelector(".nav-item-with-children-span");
        let targetElement = evt.target;
        do {
          if (
            targetElement === navElem ||
            targetElement === innerNav
          ) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        toggleSideMenu(false);
      }
    });
  }, [])

  return (
    <nav id="navbar" className="primary shadow">
      <Link to="/" className="social-link link">
        <img
          src={bannerImg}
          alt="W Programming icon"
          className="small-w-programming-img"
        />
      </Link>

      <div className="mid primary" id="nav">
        <div
          onClick={() => toggleSideMenu(!showSideMenu)}
          onKeyDown={() => toggleSideMenu(!showSideMenu)}
          className={showSideMenu ? 'menu-btn open' : 'menu-btn'}
        >
          <div className="menu-btn__burger" />
        </div>
      </div>

      {showSideMenu ? (
        <div className="nav-items-main-wrapper">
          <div className="nav-items-container primary">
            {" "}
            <ul className="nav-items-list" id="nav-items-list">
              {navItems.map((navItem) => (
                // eslint-disable-next-line no-nested-ternary
                (state.isLoggedIn && navItem.title === 'followers')
                  ? (
                    <div
                      key={navItem.title}
                      className='avatar-wrapper'
                      id='avatar-wrapper'
                      onClick={() => removeDisplayNone('dashboard-dialog')}
                      onKeyDown={() => removeDisplayNone('dashboard-dialog')}
                    >
                      <Avatar user={state.profile} size={38} key={navItem.title} />
                    </div>
                  )
                  // eslint-disable-next-line no-nested-ternary
                  : (navItem.title === 'settings')
                    ? (state.isLoggedIn)
                      ? null
                      : <FontAwesomeIcon key={navItem.title} id='setting-btn' className="fa-lg setting-btn" icon={navItem.icon} onClick={toggleSettings} />
                    : <li key={navItem.title}><ListWithNavItems item={navItem} openInnerList={openInnerList} /></li>
              ))}

            </ul>
          </div>
        </div>
      ) : null}
      {(settingsActivated) ? <ClickAwayCloser exceptionById='setting-btn'> <Settings /> </ClickAwayCloser> : null}
      {(state.isLoggedIn) ? <ClickAwayCloser exceptionById='avatar-wrapper'> <Dashboard toggleSettings={toggleSettings} /> </ClickAwayCloser> : null}
    </nav>
  );
}

export default Navigation;
