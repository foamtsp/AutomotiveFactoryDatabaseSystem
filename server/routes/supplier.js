var express = require('express');
var router = express.Router();
/* GET suppliers listing. */

router.get('/listing', function(req, res, next) {
  res.locals.connection.query('select * from supplier', function(error, results, fields){
    if(error) throw error;
    res.send(JSON.stringify(results))
  });
});

router.post('/new', function(req, res, next) {
    let data = {
      SSN: req.body.ssn,
      Name: req.body.name,
      Phone: req.body.phone,
      AddressNo: req.body.addressno,
      Street: req.body.street,
      Province: req.body.province,
      City: req.body.city,
      ZipCode: req.body.zipcode,
    };
    console.log(data)
    let sql = "INSERT INTO supplier SET ?";
    res.locals.connection.query(sql, data, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/edit', function(req, res, next) {
  let data = {
    SSN: req.body.ssn,
    Name: req.body.name,
    Phone: req.body.phone,
    AddressNo: req.body.addressno,
    Street: req.body.street,
    Province: req.body.province,
    City: req.body.city,
    ZipCode: req.body.zipcode,
  };
  console.log(data)
  console.log('Accepted')
  let sql = "UPDATE supplier SET ? WHERE SSN ="+data.SSN;
  res.locals.connection.query(sql,data, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/delete', function(req, res, next) {
  let data = {id:req.body.id};
  console.log('Accepted')
  let sql = "DELETE FROM supplier WHERE SSN = ?";
  res.locals.connection.query(sql, data.id,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;
