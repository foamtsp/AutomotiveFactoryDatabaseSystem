var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/auth', function(request, response) {
	var username = request.body.id;
	var password = request.body.name;
	if (username && password) {
		response.locals.connection.query('SELECT * FROM employee WHERE SSN = ? AND FName = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				// request.session.id = results[0].SSN;
				request.session.loggedin = true;
				// request.session.username = results[0].FName;
				request.session.user = results[0];

				response.send({sta:"success"});
			} else {
				response.send({sta:"incorrect"});
			}			
			response.end();
		});
	} else {
		response.send({sta:"empty"});
	}
});

router.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send({sta : 1, user:request.session.user});
	} else {
		response.send({sta : 0});
	}
	response.end();
});

router.get('/home/logout', function(request, response) {
	if (request.session.loggedin) {
		// request.session.id = "";
		request.session.loggedin = false;
		// request.session.username = "";
		request.session.user = '';
		
	} 
	response.end();
});

router.post('/editprofile', function(request, response) {
	let data = {
		FName: request.body.firstname,
		LName: request.body.surname,
		Phone: request.body.phone_number,
		Specialize: request.body.specialize,
	  }
	  console.log('Accepted')
	  let sql = "UPDATE employee SET ?" + " WHERE SSN = "+request.session.user.SSN;
	  response.locals.connection.query(sql,data, function (error, results, fields) {
		  request.session.user.FName = request.body.firstname;
		  request.session.user.LName = request.body.surname;
		  request.session.user.Phone = request.body.phone_number;
		  request.session.user.Specialize = request.body.specialize;
		  if(error) throw error;
		  response.send(JSON.stringify(results));
	  });
});


// console page
router.get('/earning', function(request, response) {
	let today = new Date();
	let month = today.getMonth() + 1 ;
	let year = today.getFullYear();
	let sql = "SELECT totalIncome("+year+","+month+") as earning;";
  	response.locals.connection.query(sql, function (error, results, fields) {
	  if(error) throw error;
      response.send(JSON.stringify(results));
  });
});


router.get('/carstat', function(request, response) {
	let sql = "SELECT car.Brand as name, numCarBrand(car.Brand) as value From car GROUP BY car.Brand;";
  	response.locals.connection.query(sql, function (error, results, fields) {
	  if(error) throw error;
      response.send(JSON.stringify(results));
  });
});

router.get('/branchstatus', function(request, response) {
	let sql = "SELECT branch.BranchID,branchIsAvailable(branch.BranchID) as Status, orderInProcess(branch.BranchID) as Remain From branch;";
  	response.locals.connection.query(sql, function (error, results, fields) {
	  if(error) throw error;
      response.send(JSON.stringify(results));
  });
});


router.get('/orderamount', function(request, response) {
	let sql = "SELECT count_corder_thismonth() as amount;";
  	response.locals.connection.query(sql, function (error, results, fields) {
	  if(error) throw error;
      response.send(JSON.stringify(results));
  });
});

router.get('/remainsuporder', function(request, response) {
	let sql = "SELECT count_waiting_order() as amount;";
  	response.locals.connection.query(sql, function (error, results, fields) {
	  if(error) throw error;
      response.send(JSON.stringify(results));
  });
});

router.get('/monthlypayment', function(request, response) {
	let sql = "SELECT sum_supplier_pay() as amount;";
  	response.locals.connection.query(sql, function (error, results, fields) {
	  if(error) throw error;
      response.send(JSON.stringify(results));
  });
});

router.get('/earninggrowth', function(request, response) {
	let sql1 = "SELECT compare_sell() ;"
	let sql2 = "SELECT * FROM comparing_table ;";
  	response.locals.connection.query(sql1, function (error, results, fields) {
	  if(error) throw error;
  });
  response.locals.connection.query(sql2, function (error, results, fields) {
	if(error) throw error;
	response.send(JSON.stringify(results));
});
});


module.exports = router;
