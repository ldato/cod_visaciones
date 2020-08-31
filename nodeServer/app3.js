var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var cors = require('cors');
var app = express();


app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
      request.query("select * from pagos1 where estado is null or estado = 'En proceso';").then(function (resp) {
          console.log(resp.recordset);
          res.send(resp.recordset);
          dbConn.close();
});
});
});
//FIN GET API---------------------------------------------------------

//GET API----------------------------------------------------------------
app.get("/facturas/:numero", function (req , res) {
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn.connect().then(function () {
      var request = new sql.Request(dbConn);

      var numero = req.params.numero;
    //  var arrayNumero = [numero];
      request.query("select * from pagos1 where numero = "+numero).then(function (resp) {
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
    //  var arrayNumero = [numero];
      request.query("update pagos1 set estado='Entregado', fecha_actualizacion = GETDATE() where numero = "+numero).then(function (resp) {
          console.log("Se ha cambio es el estado de la factura nro: "+numero);
          res.send("Se ha cambio es el estado de la factura nro: "+numero);
          dbConn.close();
});
});
});
//FIN PUT

// PUT API
app.put("/pagados/:factura", function (req , res) {
   var dbConn = new sql.ConnectionPool(dbConfig);
   dbConn.connect().then(function () {
     var request = new sql.Request(dbConn);
     var numero2 = req.params.factura;
     request.query("update pagos1 set estado='Liberado' where numero = "+numero2).then(function (resp) {
       console.log("Se ha cambio es el estado de la factura nro: "+numero2);
       res.send("Se ha cambio es el estado de la factura nro: "+numero2);
       dbConn.close();
     })
   })
})
// FIN PUT API
