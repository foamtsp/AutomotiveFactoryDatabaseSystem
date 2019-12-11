import React,{Component} from 'react';
import{
  withRouter
} from 'react-router-dom'
import '../CSS/sidebar.css';

function Sidebar(props) { 

return (
<nav id="sidebar" className = "">
    <div className="sidebar-header">
        <h3>Dashboard</h3>
    </div>

    <ul className="list-unstyled components">
        <p>Welcome <b>{props.username==="Database"? "Admin": props.username}</b></p>
        <li className = "list-group-item-warning">
            <a href="/editprofile">Edit Profile</a>
        </li>
        <li className="active">
            <a href="/">Console</a>
        </li>
        <li>
            <a href="/users">Employees</a>
        </li>
        <li>
            <a href="/customers">Customers</a>
        </li>
        <li>
            <a href="#orderSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Orders</a>
            <ul className="collapse list-unstyled" id="orderSubmenu">
                <li>
                    <a href="/custorders">Customer Orders</a>
                </li>
                <li>
                    <a href="/suporders">Supllier Orders</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="/cars">Cars</a>
        </li>
        <li>
            <a href="#partSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Parts</a>
            <ul className="collapse list-unstyled" id="partSubmenu">
                <li>
                    <a href="/mainparts">Main Parts</a>
                </li>
                <li>
                    <a href="/subparts">Sub Parts</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="/suppliers">Supplier</a>
        </li>
    </ul>
    <button className="btn btn-lg btn-danger btn-block" type="submit"  onClick={props.onClick}>Sign out</button>
</nav>)
}


class HomePage extends Component{
    render(){
        return(
            <div className = "wrapper">
                 <Sidebar username = {this.props.username} onClick = {this.props.onClick}></Sidebar>
                 <div className = "container-fluid">
                 {this.props.children}
                 </div>
            </div>
        )
    }

}

export default withRouter(HomePage);