import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Title from '../Title/Title.js'
import Navigation from '../Nav/Nav.js'
import Routes from '../../Routes/Routes.js'
import Footer from '../Footer/Footer.js'
import { useTransition, useSpring, animated } from 'react-spring'

const App = () => {
  const transitions = useTransition([1], item => item.key, {
    from: { transform: 'translate3d(0,-500px,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    leave: { transform: 'translate3d(0,-500px,0)' },

  })
  const props = useSpring({
    from: {opacity: 0, marginRight: '500px' },
    to: {opacity: 1,marginRight: '0px'  },
  })
  
  return (
    <Router>
      <div className="app light">
        <header className="header primary shadow" id='header'>
          {transitions.map(({ item, props, key }) =>
            <animated.div key={key} style={props}>
              <Title />
            </animated.div>

          )}
         <animated.div style={props}>
           <Navigation />
          </animated.div> 
        </header>
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}


export default App;
