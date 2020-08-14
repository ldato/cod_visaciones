var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var cors = require('cors');
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors());

//Setting up server
 var server = app.listen(process.env.PORT || 3006, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

 //Initializing connection string
var dbConfig = {
    user:  "sa",
    password: "acevedo535",
    server: "DESKTOP-0S2D3E7",
    database: "prueba",
    options: {
      port: 1433,
      instancename: 'SQLEXPRESS',
      encrypt: false
    }
};

//GET API
app.get("/facturas", function(req , res){
	//getEmployees()
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn.connect().then(function () {
      var request = new sql.Request(dbConn);
      request.query("select * from facturas").then(function (resp) {
          console.log(resp.recordset);
          res.send(resp.recordset);
          dbConn.close();
});
});
});
/* function getEmployees() {
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query("select * from facturas").then(function (resp) {
            console.log(resp);
            res.send(resp);
            dbConn.close();

        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
} */
