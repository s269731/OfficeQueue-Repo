import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Components/Home.js';
import Navbars from './Components/Officer/Navbar.js'
import OfficerPage from './Components/Officer/OfficerPage.js';
import {Switch} from 'react-router';
import {withRouter,Redirect, Route} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
  return (
    <>
    <Navbars path={this.props.location.pathname}></Navbars>
    <Switch>
        <Route exact path='/home'>
          <Home></Home>
        </Route>
        <Route exact path='/officer'>
          <OfficerPage></OfficerPage>
        </Route>
        <Route><Redirect to='/home'/></Route>
        </Switch>
   </>
  );
}
}
export default withRouter(App);
