var express = require('express');
var router = express.Router();
/* GET suppliers listing. */

router.get('/listing', function(req, res, next) {
  res.locals.connection.query('select * from customer', function(error, results, fields){
    if(error) throw error;
    res.send(JSON.stringify(results))
  });
});

router.post('/new', function(req, res, next) {
    let data = {
      SSN: req.body.ssn,
      Name: req.body.name,
      Phone: req.body.phone,
    };
    console.log(data)
    let sql = "INSERT INTO customer SET ?";
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
  };
  console.log('Accepted')
  let sql = "UPDATE customer SET ?" + " WHERE SSN = "+data.SSN;
  res.locals.connection.query(sql,data, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/delete', function(req, res, next) {
  let data = {id:req.body.id};
  console.log('Accepted')
  let sql = "DELETE FROM customer WHERE SSN = ?";
  res.locals.connection.query(sql, data.id,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;
