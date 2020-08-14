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


//GET API----------------------------------------------------------------
app.get("/facturas", function(req , res){
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn.connect().then(function () {
      var request = new sql.Request(dbConn);
      request.query("select * from pagos where estado ='liberado';").then(function (resp) {
          console.log(resp.recordset);
          res.send(resp.recordset);
          dbConn.close();
});
});
});
//FIN GET API---------------------------------------------------------


// PUT API
app.put("/pagos/:numero",function (req , res) {
//  var numero = req.params.numero;
//  var arrayNumero = [numero];
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn.connect().then(function () {
      var request = new sql.Request(dbConn);

      var numero = req.params.numero;
      var arrayNumero = [numero];
      request.query("update pagos set estado='En proceso' where numero = "+numero).then(function (resp) {
          console.log("Se ha cambio es el estado de la factura nro: "+arrayNumero[0]);
          res.send("Se ha cambio es el estado de la factura nro: "+arrayNumero[0]);
          dbConn.close();
});
});
});
//FIN PUT API
