import React from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom';
import Home from '../components/Home/Home.js'
import Portfolio from '../components/Portfolio/Portfolio.js'
import Articles from '../components/Articles/Articles.js'
import Contacts from '../components/Contacts/Contacts.js'
import Supporters from '../components/Supporters/Supporters.js'
import Node from '../components/Node/Node.js'
import NotFound from '../components/NotFound/NotFound.js'

const Routes = () => {
    return ( 
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/Portfolio' component={Portfolio} />
                <Route path='/articles' component={Articles} />
                <Route path='/contacts' component={Contacts} />
                <Route path='/supporters' component={Supporters} />
                <Route path='/node' component={Node} />
                <Route path="*" component={NotFound} />
            </Switch>
    )
}

export default Routes