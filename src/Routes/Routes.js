import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Portfolio from "../components/Portfolio/Portfolio";
import Articles from "../components/Articles/Articles";
import SingleArticle from "../components/Articles/SingleArticle";
import Contacts from "../components/Contacts/Contacts";
import Follower from "../components/Supporters/Followers";
import PasswordReset from "../components/Supporters/PasswordResetInit";
import EnterNewPassword from "../components/Supporters/EnterNewPassword";
import ProjectViewer from "../components/ProjectViewer/ProjectViewer";
import Profile from "../components/Dashboard/Profile";
import NotFound from "../components/NotFound/NotFound";

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/Portfolio" component={Portfolio} />
    <Route path="/articles" component={Articles} />
    <Route path="/passwordReset" component={PasswordReset} />
    <Route path="/enterNewPassword/:token" component={EnterNewPassword} />
    <Route path="/article/:article" component={SingleArticle} />
    <Route path="/contacts" component={Contacts} />
    <Route path="/followers" component={Follower} />
    <Route path="/project/:language" component={ProjectViewer} />
    <Route path="/user/profile/:id" component={Profile} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
