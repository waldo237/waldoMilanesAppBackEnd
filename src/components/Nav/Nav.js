import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import bannerImg from "../../static/banner.png";
import Avatar from '../Avatar/Avatar';
import Settings from '../Dashboard/Settings';
import Dashboard from '../Dashboard/Dashboard';
import {confirmLoggedIn} from '../Supporters/utilities/authorizationFunctions';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      showSideMenu: false,
      isLoggedIn: false,
      settingsActivated: false,
      navItems: [
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
        { title: "followers", link: "/supporters" },
        { title: "Contacts", link: "/contacts" },
        {title: "settings", icon: faEllipsisV  },
      ],
      // turn icon .rotate and .closable
      openInnerList: () => {
        const icon = document.querySelector(".drop-icon");
        const innerItems = document.querySelector(".inner-nav-item");
        icon.classList.toggle("rotate");
        innerItems.classList.toggle("closable");
      },
    };
  }

  async componentDidMount() {
    this.setState({ isLoggedIn: await confirmLoggedIn() });
    const nav = document.getElementById("navbar");
    const navOriginalPositioin = nav.offsetTop + nav.offsetHeight;
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
        this.setState({ showSideMenu: true });
      } else {
        this.setState({ showSideMenu: false });
      }
    };
    activateSideNav();
    window.addEventListener("resize", activateSideNav);

    // make the nav colapse if click away.
    document.addEventListener("click", (evt) => {
      if (document.body.clientWidth < 780) {
        const navItems = document.getElementById("nav");
        const innerNav = document.querySelector(".span-with-children");
        let targetElement = evt.target;
        do {
          if (
            targetElement === navItems ||
            targetElement === innerNav
          ) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        this.setState({ showSideMenu: false });
      }
    });
    // make the settings colapse if clicked away.
    document.addEventListener("click", (evt) => {
        const settingsContainer = document.getElementById("settings-container");
        const dotsBtn = document.getElementById('setting-btn');
        let targetElement = evt.target;
        do {
          if (targetElement === settingsContainer || targetElement ===dotsBtn){
            return;
          } 
          targetElement = targetElement.parentNode;
        } while (targetElement);
        this.setState({ settingsActivated: false });
    });
  }

  componentWillUnmount() {
    document.removeEventListener("click");
    document.removeEventListener("resize");
  }

  listNavItems(item) {
    const { openInnerList } = this.state;
    if (item.children) {
      return (
        <div
          id="with-children"
          className="nav-item-with-children"
        >
          <span
            className="span-with-children"
            onClick={openInnerList}
            onKeyDown={openInnerList}
          >
            {item.title}
            <FontAwesomeIcon className=" drop-icon" icon={faChevronDown} />
          </span>
          {!item.icon ? (
            <ul className="inner-nav-item">
              {item.children.map((child) => (
                <NavLink
                  activeClassName="active"
                  exact
                  to={child.link}
                  key={child.title}
                >
                  <button type="button" className="btn spacious block ">
                    {!item.icon ? (
                      <FontAwesomeIcon className="fa-lg" icon={child.icon} />
                    ) : null}{" "}
                    {child.title}
                  </button>
                </NavLink>
              ))}
            </ul>
          ) : null}
        </div>
      );
    }
    return (
      <NavLink activeClassName="active" exact to={item.link}>
        <button type="button" className="btn spacious">
          {item.title}
        </button>
      </NavLink>
    );
  }

  render() {
    const { showSideMenu, navItems, isLoggedIn, settingsActivated } = this.state;
    return (
      
      <nav id="navbar" className="primary shadow">
        <img
          src={bannerImg}
          alt="W Programming icon"
          className="small-w-programming-img"
        />
        <div className="mid primary" id="nav">
          <div
            onClick={() => {this.setState({ showSideMenu: !showSideMenu });}}
            onKeyDown={() => {this.setState({ showSideMenu: !showSideMenu }); }}
            className={showSideMenu ?'menu-btn open':'menu-btn'}
          >
            <div className="menu-btn__burger" />
          </div>
        </div>
        
        {showSideMenu ? (
          <div className="navItems-outer-wrapper">
            <div className="navItems-container primary">
              {" "}
              <ul className="navItems" id="navItems">
                {navItems.map((navItem) => (
                 // eslint-disable-next-line no-nested-ternary
                 (isLoggedIn && navItem.title === 'followers')
                  ?<Avatar user={{photoURL:'https://lh3.googleusercontent.com/ogw/ADGmqu93dmNB10G5iAvsETm2tDsVefUNE3oDWzGW0Iav=s83-c-mo', firstName:'Jose', LastName: 'Taveras', email:'ajo@.fo.com'}} size={38} key={navItem.title} />
                  :(!isLoggedIn && navItem.title === 'settings')
                  ?<FontAwesomeIcon key={navItem.title} id='setting-btn' className="fa-lg btn setting-btn" icon={navItem.icon} onClick={()=> this.setState({ settingsActivated: !settingsActivated })} />
                  :<li key={navItem.title}>{this.listNavItems(navItem)}</li>
                ))}
              
              </ul>
            </div>
          </div>
        ) : null}
        { (settingsActivated)?  <Settings />: null}
        {/* <Dashboard /> */}
      </nav>
    );
  }
}

export default Navigation;
