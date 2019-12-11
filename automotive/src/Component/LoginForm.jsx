import React,{Component} from 'react';
import logo from '../car-logo.png';
import HomePage from './HomePage';
import{
    Switch,
    Route,
  withRouter
} from 'react-router-dom'

import QueryTable from "./QueryTable";
import Console from "./Console";
import EditProfile from "./EditProfilePage";


class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            id: "",
            password: "",
            isLogin: "",
            user:'',
        }
        
        this.submitform = this.submitform.bind(this);
        this.submitLogout = this.submitLogout.bind(this);
    }

    componentDidMount(){
        let self = this;
        fetch("/home", {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
           if (data.sta > 0) {
                self.setState({
                    id: data.user.SSN,
                    isLogin: true,
                    password: data.user.FName,
                    user: data.user
                });
           }
           else{
            self.setState({
                isLogin: false,
            });
           }
        }).catch(err => {
        console.log('caught it!',err);
        })
    }


    submitform(event){
        event.preventDefault()
        let self  = this;

        var data = {
            id: this.state.id,
            name: this.state.password
        }
        console.log(data)

        fetch("/auth", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
               if(data.sta === "success"){
                   self.setState({
                    isLogin : true,
                    msg: "Login succeed"
                    });
               }
               else if(data.sta === "incorrect") alert("Incorrect id or password!");
               else alert("Please enter your id and password");
               
        }).catch(function(err) {
            console.log(err)
        });
       
        
    }

    submitLogout(event){
        alert("You have been logged out!");
        event.preventDefault()
        this.setState({
            id: "",
            password:"",
            isLogin:false,
            user:''
        });
        fetch("/home/logout", {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log('logged out succeed')
        }).catch(err => {
        console.log('caught it!',err);
        })
        this.props.history.push('/');
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        if (this.state.isLogin === "") return null
        if (!this.state.isLogin){
        return (
            <div className = "row d-flex justify-content-center">
             <div className = "col-md-4">
            <form>
                    <img className="mb-4" src={logo} alt="" width="144" height="144"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div className = "form-group">
                    <label htmlFor="inputID" className="sr-only">ID</label>
                    <input type="id" id="inputID" onChange = {(e)=>this.logChange(e)} name = "id" className="form-control" placeholder="ID" required="" autoFocus=""/>
                    </div>
                    <div className = "form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" onChange = {(e)=>this.logChange(e)} name = "password" className="form-control" placeholder="Password" required=""/>
                    </div>
            <div className="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(event)=>this.submitform(event)}>Sign in</button>
                {/* <a href = "/">Not register?</a> */}
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
            </form>
            </div>
      </div>
        );
    }
    else{
        return (
        <HomePage username = {this.state.password} onClick = {(event)=>this.submitLogout(event)} position = {this.state.user.Position}>
            <Switch>
            <Route  path="/subparts">
              <QueryTable tableType = "Sub Part" position = {this.state.user.Position}/>
             </Route>
            <Route  path="/mainparts">
              <QueryTable tableType = "Main Part" position = {this.state.user.Position}/>
             </Route>
             <Route  path="/cars">
              <QueryTable tableType = "Car" position = {this.state.user.Position}/>
             </Route>
            <Route  path="/suporders">
              <QueryTable tableType = "Supplier Order" position = {this.state.user.Position}/>
             </Route>
            <Route  path="/custorders">
              <QueryTable tableType = "Customer Order" position = {this.state.user.Position}/>
             </Route>
             <Route  path="/customers">
              <QueryTable tableType = "Customer" position = {this.state.user.Position}/>
             </Route>
            <Route  path="/suppliers">
              <QueryTable tableType = "Supplier" position = {this.state.user.Position}/>
             </Route>
            <Route path="/users">
                <QueryTable tableType = "Employee" position = {this.state.user.Position}/>
            </Route>
            <Route path="/editprofile">
              <EditProfile user = {this.state.user}/>
            </Route>
            <Route path="/">
              <Console/>
            </Route>
          </Switch>
        </HomePage>
        )
    }
}
}

export default withRouter(LoginForm);