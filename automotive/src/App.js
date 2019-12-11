import React,{Component} from 'react';
import './App.css';
import Login from './Component/LoginForm';
import Navbar from './Component/Navbar';
import {
  BrowserRouter as Router,
} from "react-router-dom";

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      id:"",
      name:"",
      isLogin: false,
    }
  }

  render(){
    return (
      <Router>
          <Home>
            <Navbar/>
          </Home>
          <br/>
    </Router>
  );
  }
}

function Home(props) {

    return (
    <div className = "container-fluid" >
          {props.children}
          <Login/>

    </div>
    
  );
}