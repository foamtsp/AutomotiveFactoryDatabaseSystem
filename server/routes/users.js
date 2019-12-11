var express = require('express');
var router = express.Router();
/* GET users listing. */

router.get('/user', function(req, res, next) {
  res.locals.connection.query('select * from employee where SSN != 7777777777777', function(error, results, fields){
    if(error) throw error;
    res.send(JSON.stringify(results))
  });
});


router.post('/new', function(req, res, next) {
    let data = {
      SSN: req.body.ssn,
      FName: req.body.firstname,
      LName: req.body.surname,
      Phone: req.body.phone,
      Position: req.body.position,
      Salary: req.body.salary,
      StartDate: req.body.startdate,
      DeptID: req.body.deptid,
      BranchID: req.body.branchid,
      OrdinaryFlag: req.body.position === "Technician" ? false:true,
      TechnicianFlag: req.body.position === "Technician" ? true:false,
      Specialize: req.body.specialize
    };
    console.log(data)
    let sql = "INSERT INTO employee SET ?";
    res.locals.connection.query(sql, data, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/edit', function(req, res, next) {
  let data = {
    SSN: req.body.ssn,
    FName: req.body.firstname,
    LName: req.body.surname,
    Phone: req.body.phone,
    Position: req.body.position,
    Salary: req.body.salary,
    StartDate: req.body.startdate,
    DeptID: req.body.deptid,
    BranchID: req.body.branchid,
    OrdinaryFlag: req.body.position === "Technician" ? false:true,
    TechnicianFlag: req.body.position === "Technician" ? true:false,
    Specialize: req.body.specialize
  };
  console.log(data)
  console.log('Accepted')
  let sql = "UPDATE employee SET ?"+" WHERE SSN = "+ data.SSN;
  res.locals.connection.query(sql,data, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

router.post('/delete', function(req, res, next) {
  let data = {id:req.body.id};
  console.log('Accepted')
  let sql = "DELETE FROM employee WHERE SSN = ?";
  res.locals.connection.query(sql, data.id,function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

module.exports = router;
