var express = require('express');
var router = express.Router();
/* GET suppliers listing. */

router.get('/listing', function(req, res, next) {
  res.locals.connection.query('select * from subpart', function(error, results, fields){
    if(error) throw error;
    res.send(JSON.stringify(results))
  });
});

router.post('/new', function(req, res, next) {
    let data = {
      SPName: req.body.subpartname,
      Width: req.body.width,
      Height: req.body.height,
      Depth: req.body.depth,
      Radius: req.body.radius,
      BuyPrice: req.body.buyprice,
      SellPrice: req.body.sellprice,
      MPid: req.body.mpid,
      OrderID: req.body.orderid,
    };
    console.log(data)
    let sql = "INSERT INTO subpart SET ?";
    res.locals.connection.query(sql, data, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/edit', function(req, res, next) {
  let data = {
    SPName: req.body.subpartname,
    Width: req.body.width,
    Height: req.body.height,
    Depth: req.body.depth,
    Radius: req.body.radius,
    BuyPrice: req.body.buyprice,
    SellPrice: req.body.sellprice,
    MPid: req.body.mpid,
    OrderID: req.body.orderid,
  };
  console.log('Accepted')
  let sql = "UPDATE subpart SET ?"+" WHERE SPid = "+req.body.spid;
  res.locals.connection.query(sql,data, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/delete', function(req, res, next) {
  let data = {id:req.body.id};
  console.log('Accepted')
  let sql = "DELETE FROM subpart WHERE SPid = ?";
  res.locals.connection.query(sql, data.id,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;

