import React, { Component } from 'react';
import {
    withRouter
} from 'react-router-dom'

import NewForm from './CreateForm';

class QueryTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            modalIsOpen: false,
            modalType: '',
            msg: '',
            editMem: '',
        }
        this.openModal.bind(this);
        this.closeModal.bind(this);
        this.deleteMember.bind(this);
        this.updateMember.bind(this);
        this.handleSubmit.bind(this);
        this.renderCreateBtn.bind(this);
    }

    componentDidMount() {

        this.updateMember();
    }

    openModal(e, member, type) {
        e.preventDefault();
        if (type === "E") {
            this.setState({ editMem: member });
        }
        this.setState({
            name: member.FName,
            id: member.SSN,
            modalIsOpen: true,
            modalType: type === "C" ? "Create " + this.props.tableType : "Edit " + this.props.tableType
        });
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({
            name: "",
            id: "",
            modalIsOpen: false,
            editMem: ''
        });
        this.updateMember();
    }

    updateMember() {
        let url = '';
        let state = this.props.tableType;

        if (state === 'Customer') url = 'customers/listing'
        else if(state === 'Customer Order') url = 'custorders/listing'
        else if(state === 'Supplier Order') url = 'suporders/listing'
        else if(state === 'Car') url = 'cars/listing'
        else if(state === 'Main Part') url = 'mainparts/listing'
        else if(state === 'Sub Part') url = 'subparts/listing'
        else if(state === 'Supplier') url = 'suppliers/listing'
        else url = 'users/user' 

        let self = this;
        fetch(url, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ users: data });
            console.log(data);
        }).catch(err => {
            console.log('caught it!', err);
        })
    }


    handleSubmit(values) {

        let url = '';
        let state = this.props.tableType;
        
        if (state === 'Customer') url = '/customers'
        else if(state === 'Customer Order') url = '/custorders'
        else if(state === 'Supplier Order') url = '/suporders'
        else if(state === 'Car') url = '/cars'
        else if(state === 'Main Part') url = '/mainparts'
        else if(state === 'Sub Part') url = '/subparts'
        else if(state === 'Supplier') url = '/suppliers'
        else url = '/users' 
        
        console.log(this.state.modalType)

        if (this.state.modalType === "Create " + this.props.tableType) {

            fetch(url + "/new", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                console.log(data)
                if (data === "success") {
                    this.setState({ msg: "Thanks for registering" });
                }
            }).catch(function (err) {
                console.log(err)
            });

            alert("New "+this.props.tableType+" has been created!")
        }
        else {
            fetch(url + "/edit", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                console.log(data)
                if (data === "success") {
                    this.setState({
                        msg: "User has been edited."
                    }
                    );
                }
            }).catch(function (err) {
                console.log(err)
            });

            alert("Succesfully edited this "+this.props.tableType+"!")
        }
        this.updateMember();
        window.location.replace(url);
    }


    updateStatus(key,status,isCOrder,isPaid){
        let data = {orderid:key,status:status}
        if (isPaid) alert("This order is paid!") 
        else if (isCOrder){
                fetch('custorders/updatestatus', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).catch(function (err) {
                    console.log(err)
                });
    
                alert("Update status success!")
            
        }
        else{
            fetch('suporders/updatestatus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).catch(function (err) {
                console.log(err)
            });

            alert("Update status success!")
        }
        this.updateMember();
    }



    deleteMember(member) {

        var ID = {
            id: '',
        }

        let url = '';

        const members = this.state.users;
        let filterdMembers = [];

        let state = this.props.tableType;

        var sure = window.confirm("Are you sure you want to delete this row?");
        
        if (sure){
            
        if (state === 'Customer'){ 
            url = '/customers/'
            ID.id = member.SSN
            filterdMembers = members.filter(mem => { return mem.SSN !== member.SSN })
        }
        else if(state === 'Customer Order'){
            url = '/custorders/'
            ID.id = member.OrderID
            filterdMembers = members.filter(mem => { return mem.OrderID !== member.OrderID })
        }
        else if(state === 'Supplier Order'){
            url = '/suporders/'
            ID.id = member.OrderID
            filterdMembers = members.filter(mem => { return mem.OrderID !== member.OrderID })
        }
        else if(state === 'Car'){
            url = '/cars/'
            ID.id = member.LicensePlate
            filterdMembers = members.filter(mem => { return mem.LicensePlate !== member.LicensePlate })
        }
        else if(state === 'Main Part'){
            url = '/mainparts/'
            ID.id = member.MPid
            filterdMembers = members.filter(mem => { return mem.MPid !== member.MPid })
        }
        else if(state === 'Sub Part'){
            url = '/subparts/'
            ID.id = member.SPid
            filterdMembers = members.filter(mem => { return mem.SPid !== member.SPid })
        }
        else if(state === 'Supplier'){
            url = '/suppliers/'
            ID.id = member.SSN
            filterdMembers = members.filter(mem => { return mem.SSN !== member.SSN })
        }
        else{
            url = '/users/'
            ID.id = member.SSN
            filterdMembers = members.filter(mem => { return mem.SSN !== member.SSN })
        }


        alert("This " + this.props.tableType + " has been deleted!")

        this.setState({ users: filterdMembers })


        fetch(url + "delete", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ID)
        }).then(function (response) {
            console.log(response)
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been deleted."
                }
                );
            }
        }).catch(function (err) {
            console.log(err)
        });
    }
    }
    
    renderCol() {

        let pos = this.props.position
        switch (this.props.tableType) {
            case 'Customer':
                return(
                    <tr>
                        <th>SSN</th>
                        <th>Name</th>
                        <th>Phone</th>
                        {(pos !== "Technician") && <th>Action</th>}
                    </tr>
                )
            case 'Customer Order':
                return(
                    <tr>
                        <th>ID</th>
                        {/* <th>License Plate</th> */}
                        <th>Service</th>
                        <th>Customer Name</th>
                        {/* <th>CustomerSSN</th> */}
                        <th>Price</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Payment Date</th>
                        {<th>Action</th>}
                    </tr>
                )
            case 'Supplier Order':
                return(
                    <tr>
                        <th>ID</th>
                        <th>SupplierSSN</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Payment Date</th>
                        {(pos !=="Technician") && <th>Action</th>}
                    </tr>
                )
            case 'Car':
                return(
                    <tr>
                        <th>License Plate</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Customer Name</th>
                        <th>Customer SSN</th>
                        <th>OrderID</th>
                        {(pos !=="Technician") && <th>Action</th>}
                    </tr>
                )
            case 'Main Part':
                return(
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size (W x H x D)</th>
                        <th>Radius</th>
                        <th>Sell Price</th>
                        <th>Buy Price</th>
                        <th>OrderID</th>
                        {(pos !== "Ordinary") && <th>Action</th>}
                    </tr>
                )
            case 'Sub Part':
                return(
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size (W x H x D)</th>
                        <th>Radius</th>
                        <th>Sell Price</th>
                        <th>Buy Price</th>
                        <th>OrderID</th>
                        {(pos !== "Ordinary") && <th>Action</th>}
                    </tr>
                )
            case 'Supplier':
                return(
                    <tr>
                        <th>SSN</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>City</th>
                        {(pos==="Admin") && <th>Action</th>}
                    </tr>
                )
            default:
                return( 
                    <tr>
                        <th>SSN</th>
                        <th>Firstname</th>
                        <th>Surname</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Specialize</th>
                        <th>Branch</th>
                        {(pos==="Admin") && <th>Action</th>}
                    </tr>
                    ) 
        }
    }


    renderRow(member) {
        let pos = this.props.position;
        let key = '';
        let status = '';
        let isCOrder = '';
        let isPaid = '';
        switch (this.props.tableType) {
            case 'Customer':
                return(
                    <tr key={member.SSN}>
                        <td>{member.SSN}</td>
                        <td>{member.Name}</td>
                        <td>{member.Phone}</td>
                        {(pos !=="Technician") &&
                        <td>
                            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title="Edit User" onClick={(e) => this.openModal(e, member, "E")}>Edit</button>
                            <button type="button" class="btn btn-danger btn-sm" onClick={() => this.deleteMember(member)}>Delete</button>
                        </td>}
                    </tr>
                )
            case 'Customer Order':
                key = member.OrderID
                status = member.Status
                isCOrder = member.CorderFlag
                isPaid = member.PaymentDate === null? false:true; 
               return(
                    <tr key={member.OrderID}>
                        <td>{member.OrderID} </td>
                        {/* <td>{member.LicensePlate}</td> */}
                        <td>{member.ServiceType}</td>
                        <td>{member.Name}</td>
                        {/* <td>{member.CustomerSSN}</td> */}
                        <td>{member.TotalPrice}</td>
                        <td>{member.Status}</td>
                        <td>{member.StartDate}</td>
                        <td>{member.EndDate}</td>
                        <td>{member.PaymentDate}</td>
                        <td>
                            {<button type="button" class="btn btn-success btn-sm" data-title = "Update Order" onClick = {(e)=>this.updateStatus(key,status,isCOrder,isPaid)}>Update Status</button>}
                            {(pos ==="Ordinary" || pos === "Admin") && <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title = "Edit Order" onClick = {(e)=>this.openModal(e,member,"E")}>Edit</button>}
                            {(pos ==="Ordinary" || pos === "Admin") && <button type="button" class="btn btn-danger btn-sm" onClick = {()=>this.deleteMember(member)}>Delete</button>}
                        </td>
                    </tr>
                )
            case 'Supplier Order':
                key = member.OrderID
                status = member.Status
                isCOrder = member.CorderFlag
                isPaid = member.PaymentDate === null? false:true; 
                return(
                    <tr key={member.OrderID}>
                        <td>{member.OrderID} </td>
                        <td>{member.SupplierSSN}</td>
                        <td>{member.TotalPrice}</td>
                        <td>{member.Status}</td>
                        <td>{member.StartDate}</td>
                        <td>{member.EndDate}</td>
                        <td>{member.PaymentDate}</td>
                        {(pos !== "Technician")  &&
                        <td>
                            {(pos!=="Technician") &&<button type="button" class="btn btn-success btn-sm" data-title = "Update Order" onClick = {(e)=>this.updateStatus(key,status,isCOrder,isPaid)}>Update Status</button>}
                            {(pos==="Admin") &&<button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title = "Edit Order" onClick = {(e)=>this.openModal(e,member,"E")}>Edit</button>}
                            {(pos==="Admin") && <button type="button" class="btn btn-danger btn-sm" onClick = {()=>this.deleteMember(member)}>Delete</button>}
                        </td>}
                    </tr>
                )
            case 'Car':
                return(
                    <tr key={member.LicensePlate}>
                        <td>{member.LicensePlate} </td>
                        <td>{member.Brand}</td>
                        <td>{member.Model}</td>
                        <td>{member.Color}</td>
                        <td>{member.Name}</td>
                        <td>{member.CustomerSSN}</td>
                        <td>{member.OrderID}</td>
                        {(pos !== "Technician") &&
                        <td>
                            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title = "Edit Order" onClick = {(e)=>this.openModal(e,member,"E")}>Edit</button>
                            <button type="button" class="btn btn-danger btn-sm" onClick = {()=>this.deleteMember(member)}>Delete</button>
                        </td>}
                    </tr>
                )
                
            case 'Main Part':
                return(
                    <tr key={member.MPid}>
                        <td>{member.MPid} </td>
                        <td>{member.MPName}</td>
                        <td>{member.Width} x {member.Height} x {member.Depth}</td>
                        <td>{member.Radius}</td>
                        <td>{member.SellPrice}</td>
                        <td>{member.BuyPrice}</td>
                        <td>{member.OrderID}</td>
                        {(pos !=="Ordinary") &&<td>
                            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title = "Edit User" onClick = {(e)=>this.openModal(e,member,"E")}>Edit</button>
                            {(pos==="Admin") && <button type="button" class="btn btn-danger btn-sm" onClick = {()=>this.deleteMember(member)}>Delete</button>}
                        </td>}
                    </tr>
                )
            case 'Sub Part':
                return(
                    <tr key={member.SPid}>
                        <td>{member.SPid} </td>
                        <td>{member.SPName}</td>
                        <td>{member.Width} x {member.Height} x {member.Depth}</td>
                        <td>{member.Radius}</td>
                        <td>{member.SellPrice}</td>
                        <td>{member.BuyPrice}</td>
                        <td>{member.OrderID}</td>
                        {(pos !=="Ordinary") &&<td>
                            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title = "Edit User" onClick = {(e)=>this.openModal(e,member,"E")}>Edit</button>
                            {(pos==="Admin") && <button type="button" class="btn btn-danger btn-sm" onClick = {()=>this.deleteMember(member)}>Delete</button>}
                        </td>}
                    </tr>
                )
            case 'Supplier':
                return(
                    <tr key={member.SSN}>
                            <td>{member.SSN}</td>
                            <td>{member.Name}</td>
                            <td>{member.Phone}</td>
                            <td>{member.City}</td>
                            {(pos==="Admin") &&<td>
                                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title="Edit User" onClick={(e) => this.openModal(e, member, "E")}>Edit</button>
                                <button type="button" class="btn btn-danger btn-sm" onClick={() => this.deleteMember(member)}>Delete</button>
                            </td>}
                    </tr>
                )
            default:
                return( 
                    <tr key={member.SSN}>
                        <td>{member.SSN} </td>
                        <td>{member.FName}</td>
                        <td>{member.LName}</td>
                        <td>{member.Phone}</td>
                        <td>{member.Position}</td>
                        <td>{member.Specialize}</td>
                        <td>{member.BranchID}</td>
                        {(pos==="Admin") &&<td>
                            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#editModal" data-title={"Edit " + this.props.tableType} onClick={(e) => this.openModal(e, member, "E")}>Edit</button>
                            <button type="button" class="btn btn-danger btn-sm" onClick={() => this.deleteMember(member)}>Delete</button>
                        </td>}
                    </tr>
                ) 
        }
    }

    renderCreateBtn() {
        if (this.props.position === "Admin"){
            return (<button type="button" class="btn btn-primary btn" data-toggle="modal" data-target="#editModal" 
                        data-title={"Create " + this.props.tableType} 
                         onClick={(e) => this.openModal(e, { id: "", name: "" }, "C")}>
                            Create {this.props.tableType}
                    </button>)
        }
        else if (this.props.position === "Ordinary"){
            if (this.props.tableType === "Customer")
                return (<button type="button" class="btn btn-primary btn" data-toggle="modal" data-target="#editModal" 
                data-title={"Create " + this.props.tableType} 
                 onClick={(e) => this.openModal(e, { id: "", name: "" }, "C")}>
                    Create {this.props.tableType}
                </button>)
            else if (this.props.tableType === "Customer Order"){
                return (<button type="button" class="btn btn-primary btn" data-toggle="modal" data-target="#editModal" 
                data-title={"Create " + this.props.tableType} 
                 onClick={(e) => this.openModal(e, { id: "", name: "" }, "C")}>
                    Create {this.props.tableType}
                </button>)
            }
            else if (this.props.tableType === "Car"){
                return (<button type="button" class="btn btn-primary btn" data-toggle="modal" data-target="#editModal" 
                data-title={"Create " + this.props.tableType} 
                 onClick={(e) => this.openModal(e, { id: "", name: "" }, "C")}>
                    Create {this.props.tableType}
                </button>)
            }
            else return null
        }
        else return null
        
    }

    render() {


        return (
            <div className="container-fluid">
                <div className="row">
                    <h2>{this.props.tableType} List</h2>
                    <div className="col">
                        {this.renderCreateBtn()}
                    </div>
                </div>
                <br />
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            {this.renderCol()}
                        </thead>
                        <tbody>
                            {this.state.users.map(member =>
                                this.renderRow(member)

                            )}
                            {this.state.modalIsOpen && <div class="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!this.state.modalIsOpen}>
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">{this.state.modalType}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={(e) => this.closeModal(e)}>
                                                <span aria-hidden="false">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <NewForm type={this.props.tableType} bfEdit={this.state.editMem} onSubmit={(values) => this.handleSubmit(values)} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={(e) => this.closeModal(e)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    

    

    
}
export default withRouter(QueryTable);