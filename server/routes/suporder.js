var express = require('express');
var router = express.Router();
/* GET suppliers listing. */

router.get('/listing', function(req, res, next) {
  res.locals.connection.query('select * from _order where SorderFlag = true', function(error, results, fields){
    if(error) throw error;
    res.send(JSON.stringify(results))
  });
});

router.post('/new', function(req, res, next) {
  let data = {
    TotalPrice: req.body.totalprice,
    Status: req.body.status,
    Paymethod: req.body.paymethod,
    StartDate: req.body.startdate,
    EndDate: null,
    PaymentDate: null,
    EmployeeSSN: req.body.employeessn,
    SorderFlag: true,
    Amount: req.body.amount,
    SupplierSSN: req.body.supplierssn,
    CorderFlag: false,
    ServiceType: null,
    CustomerSSN: null,
  };
    console.log(data)
    let sql = "INSERT INTO _order SET ?";
    res.locals.connection.query(sql, data, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/edit', function(req, res, next) {
  let data = {
    OrderID: req.body.orderid,
    TotalPrice: req.body.totalprice,
    Status: req.body.status,
    Paymethod: req.body.paymethod,
    StartDate: req.body.startdate,
    EndDate: req.body.enddate,
    PaymentDate: req.body.paymentdate,
    EmployeeSSN: req.body.employeessn,
    SorderFlag: true,
    Amount: req.body.amount,
    SupplierSSN: req.body.supplierssn,
    CorderFlag: false,
    ServiceType: null,
    CustomerSSN: null,
  };
  console.log('Accepted')
  let sql = "UPDATE _order SET ? WHERE OrderID = " + data.OrderID;
  res.locals.connection.query(sql,data, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/delete', function(req, res, next) {
  let data = {id:req.body.id};
  console.log('Accepted')
  let sql = "DELETE FROM _order WHERE OrderID = ?";
  res.locals.connection.query(sql, data.id,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});


router.post('/updatestatus', function(req, res, next) {
  let data = {OrderID:req.body.orderid, Status:req.body.status};
  if (req.body.status === "Waiting"){
      data.Status = "Transporting"
  }
  else if (req.body.status === "Transporting"){
      data = {OrderID:req.body.orderid, Status:"Received", EndDate: new Date()}
  }
  else if(req.body.status === "Received"){
      data = {OrderID:req.body.orderid, PaymentDate: new Date()}
  }
  
  console.log('Accepted')
  let sql = "UPDATE _order SET ?" + " WHERE OrderID = "+data.OrderID;
  res.locals.connection.query(sql, data,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;
