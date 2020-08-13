/* eslint-disable no-shadow */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
// import { useTransition, useSpring, animated } from "react-spring";
import Banner from "../Banner/Banner";
import Navigation from "../Nav/Nav";
import Routes from "../../Routes/Routes";
import Footer from "../Footer/Footer";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  // const transitions = useTransition([1], (item) => item.key, {
  //   from: { transform: "translate3d(0,-500px,0)" },
  //   enter: { transform: "translate3d(0,0,0)" },
  //   leave: { transform: "translate3d(0,-500px,0)" },
  // });
  // const props = useSpring({
  //   from: { opacity: 0, marginRight: "500px" },
  //   to: { opacity: 1, marginRight: "0px" },
  // });

  return (
    <Router>
      <ScrollToTop />
      <div className="app light">
        <header className="header primary " id="header">
          {/* {transitions.map(({ props, key }) => (
            <animated.div key={key} style={props}>
              <Title />
            </animated.div>
          ))} */}
          {/* <animated.div style={props}> */}
          <Navigation />
          {/* </animated.div> */}
        </header>
        <Routes className='main' />
        <Footer className='footer' />
      </div>
    </Router>
  );
};

export default App;
