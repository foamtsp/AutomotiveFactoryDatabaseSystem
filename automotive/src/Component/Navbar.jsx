import React,{Component} from 'react';
export default class Navbar extends Component{

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
               </button>
              <a className="navbar-brand" href="/">AutomotiveSys</a>
              
            </nav>
        );
    }
}