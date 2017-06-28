import React from 'react'
import {Router, Route,  IndexRoute, Redirect, hashHistory} from 'react-router'
import HomeContainer from '../containers/HomeContainer'


const RootRoter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ HomeContainer }>
    </Route>
  </Router>
)
export default RootRoter
