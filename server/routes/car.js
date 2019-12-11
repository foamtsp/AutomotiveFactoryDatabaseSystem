var express = require('express');
var router = express.Router();
/* GET suppliers listing. */

router.get('/listing', function(req, res, next) {
  res.locals.connection.query('select * from car join customer on car.CustomerSSN = customer.SSN', function(error, results, fields){
    if(error) throw error;
    res.send(JSON.stringify(results))
  });
});

router.post('/new', function(req, res, next) {
    let data = {
      LicensePlate: req.body.licenseplate,
      Brand: req.body.brand,
      Model: req.body.model,
      Color: req.body.color,
      CustomerSSN: req.body.customerssn,
      OrderID: req.body.orderid,
    }
    console.log(data)
    let sql = "INSERT INTO car SET ?";
    res.locals.connection.query(sql, data, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/edit', function(req, res, next) {
  let data = {
    LicensePlate: req.body.licenseplate,
    Brand: req.body.brand,
    Model: req.body.model,
    Color: req.body.color,
    CustomerSSN: req.body.customerssn,
    OrderID: req.body.orderid,
  }
  console.log('Accepted')
  let sql = "UPDATE car SET ?" + " WHERE LicensePlate = "+"'"+data.LicensePlate+"'";
  res.locals.connection.query(sql,data, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/delete', function(req, res, next) {
  let data = {id:req.body.id};
  console.log('Accepted')
  let sql = "DELETE FROM car WHERE LicensePlate = ?";
  res.locals.connection.query(sql, data.id,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;

