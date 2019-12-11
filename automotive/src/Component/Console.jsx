import React, { Component } from 'react';

import {
  PieChart, Pie, Legend, Tooltip,LineChart,CartesianGrid,XAxis,YAxis,Line, Cell
} from 'recharts';

import{
  withRouter
} from 'react-router-dom'


function CarPieChart(props){

  
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
  }

    const data01 = props.value;
  
    return (

      <div class="col-xl-4 col-lg-6">
              <div class="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Total Car</h6>
                  <div class="dropdown no-arrow">
                  </div>
                </div>
                {/* <!-- Card Body --> */}
                <div class="card-body">
                  <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                  <PieChart width={400} height={400}>
                      <Pie dataKey="value" isAnimationActive={true} data={data01} cx={150} cy={150} outerRadius={90} fill="#8884d8" label >
                      {
                            data01.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getRandomColor()}/>
                            ))
                      }
                      </Pie>
                      <Tooltip />
                      <Legend width = {320} height = {90}/>
                  </PieChart>
                  </div>
                </div>
              </div>
            </div>
    );
  
}


function Card(props){

  
  return(
            // <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.title}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{props.value}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

function OrderChart(props){

  // const data = 
  // [
  //   {
  //     month: 'Jan', Lastyear: 14000, Thisyear: 12400,
  //   },
  //   {
  //     month: 'Feb', Lastyear: 13000, Thisyear: 11398,
  //   },
  //   {
  //     month: 'Mar', Lastyear: 12000, Thisyear: 19800, 
  //   },
  //   {
  //     month: 'Apr', Lastyear: 12780, Thisyear: 13908,
  //   },
  //   {
  //     month: 'May', Lastyear: 11890, Thisyear: 14800,
  //   },
  //   {
  //     month: 'Jun', Lastyear: 12390, Thisyear: 13800,
  //   },
  //   {
  //     month: 'Jul', Lastyear: 13490, Thisyear: 14300,
  //   },
  //   {
  //     month: 'Aug', Lastyear: 15151, Thisyear: 16212,
  //   },
  //   {
  //     month: 'Sep', Lastyear: 16124, Thisyear: 14551,
  //   },
  //   {
  //     month: 'Oct', Lastyear: 14512, Thisyear: 16541,
  //   },
  //   {
  //     month: 'Nov', Lastyear: 15200, Thisyear: 16500,
  //   },
  // ];


  let data = props.value;



  return(
    <div class="col-xl-8 col-lg-7">
    <div class="card shadow mb-4">
      {/* <!-- Card Header - Dropdown --> */}
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">Earning Growth</h6>
        <div class="dropdown no-arrow">
        </div>
      </div>
      {/* <!-- Card Body --> */}
      <div class="card-body">
        <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
            <LineChart
              width={650}
              height={400}
              data={data}
              margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="LastYear" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="ThisYear" stroke="#82ca9d" />
            </LineChart>
        </div>
      </div>
    </div>
  </div>
  )
}

function FactoryStatus(props){

  let status = props.status? "Available":"Unavailable";

  return(
    <div className = "col-lg-6 mb-4">
    <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Factory Branch {props.branch}</h6>
                </div>
                
                <div class="card-body">
                  <h5>Status: <b className={status==="Available"? "text-success":"text-danger"}>{status}</b></h5>
                  <h4 class="small font-weight-bold">Remaining Order<span class="float-right"></span></h4>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">{props.remain}</div>
                  {/* <div class="progress mb-4">
                    <div class="progress-bar bg-danger" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                  </div> */}

                </div>
              </div>
            </div>
  )
}


class Console extends Component {
    constructor(props){
        super(props);
        this.state = {
          monthlyEarn:0,
          carStat:[],
          factoryStatus:[],
          orderAmount:0,
          remainSupOrder:0,
          monthlyPayment:0,
          earningGrowth:[],
        }
    }

    getMonthlyEarning(){
      let self = this;
        fetch('/earning', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ monthlyEarn: data[0].earning });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getcarStat(){
      let self = this;
        fetch('/carstat', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ carStat: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getBranchStatus(){
      let self = this;
        fetch('/branchstatus', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ factoryStatus: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getOrderAmount(){
      let self = this;
        fetch('/orderamount', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ orderAmount: data[0].amount });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getRemainSupOrder(){
      let self = this;
        fetch('/remainsuporder', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ remainSupOrder: data[0].amount });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getMonthlyPayment(){
      let self = this;
        fetch('/monthlypayment', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ monthlyPayment: data[0].amount });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }


    getEarningGrowth(){
      let self = this;
        fetch('/earninggrowth', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({ earningGrowth: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    

    componentDidMount(){
      this.getMonthlyEarning();
      this.getcarStat();
      this.getBranchStatus();
      this.getOrderAmount();
      this.getRemainSupOrder();
      this.getMonthlyPayment();
      this.getEarningGrowth();
    }

    render(){
      return (
        <div className = "container-fluid">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Console</h1>
          </div>
          <div className="row">
            <Card title = "Monthly Earning (฿)" value = {this.state.monthlyEarn}/>
            <Card title = "Monthly Ordering" value = {this.state.orderAmount}/>
            <Card title = "Remaining Supplier Order" value = {this.state.remainSupOrder}/>
            <Card title = "Monthly Payment (฿)" value = {this.state.monthlyPayment}/>
          </div>

          <div className = "row">
          {this.state.factoryStatus.map(member =>
                <FactoryStatus branch = {member.BranchID} status = {member.Status} remain = {member.Remain}/>

          )}
          </div>

          <div className = "row">
            <OrderChart value = {this.state.earningGrowth}/>
            <CarPieChart value = {this.state.carStat}/>
          </div>

          
        </div>
      )
    }
    
}

export default withRouter(Console);