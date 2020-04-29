import React from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from '../Home/Home.js'
import Navigation from '../Navigation/Navigation.js'
import Portfolio from '../Portfolio/Portfolio.js'
import Articles from '../Articles/Articles.js'
import Contacts from '../Contacts/Contacts.js'
import Supporters from '../Supporters/Supporters.js'
 const App = ()=> {
  return (
    <div className={"app"}>
      <Router>
      <Navigation />
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
            <Route path="/" component={Home} exact />
              <Route path="/portfolio" component={Portfolio}> </Route>
              <Route path="/articles" component={Articles}></Route>
              <Route path="/contacts" component={Contacts}> </Route>
              <Route path="/supporters" component={Supporters}></Route>
            </Switch>
        </Router>
      <footer></footer>
    </div>
  );
}


export default App;
