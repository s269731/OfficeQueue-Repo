import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Components/Home.js';
import Navbars from './Components/Officer/Navbar.js'
import OfficerPage from './Components/Officer/OfficerPage.js';
import {Switch} from 'react-router';
import {withRouter,Redirect, Route} from 'react-router-dom';
import API from './Api.js';
import {Row,Container,Alert,Button,Spinner, Navbar} from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={typesOfServices:[],serverErr:false,isLoading:true};
        
  }
  componentDidMount(){   
    API.getAllServices().then((services)=>{   
      this.setState({typesOfServices:services,serverErr:false,isLoading:false});
    }).catch((err)=>{
      this.setState({serverErr:true});
    });
  }
  render(){
  return (
    <>
    <Navbars path={this.props.location.pathname}></Navbars>
    <Switch>
        <Route exact path='/home'>
        {(this.state.isLoading && !this.state.serverErr) ? <><Alert variant="primary" className="below-nav"><Spinner animation="border" variant="primary"/>   Loading...</Alert></>:<>
       
          <Home typesOfServices={this.state.typesOfServices}></Home></>}
        </Route>
        <Route exact path='/officer'>
          {(this.state.isLoading && !this.state.serverErr) ? <><Alert variant="primary" className="below-nav"><Spinner animation="border" variant="primary"/>   Loading...</Alert></>:<>
       
          <OfficerPage typesOfServices={this.state.typesOfServices}></OfficerPage></>}
        </Route>
        <Route><Redirect to='/home'/></Route>
        </Switch>
   </>
  );
}
}
export default withRouter(App);
