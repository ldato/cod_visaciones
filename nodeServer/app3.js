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
      request.query(`insert into prueba.dbo.pagos1 (numero, nombre, fecha_actualizacion)
select vista.dbo.vista1.numero, vista.dbo.vista1.nombre, GETDATE() from vista.dbo.vista1
left join prueba.dbo.pagos1 on (prueba.dbo.pagos1.numero=vista.dbo.vista1.numero)
where prueba.dbo.pagos1.numero is null;`).then(function (resp) {
      //    console.log(resp);
      //    res.send(resp);
          dbConn.close();
});
});
dbConn.connect().then(function () {
    var request = new sql.Request(dbConn);
    request.query(`select numero, nombre, estado, fecha_actualizacion from (select *,
  row_number() over (partition by numero order by fecha_actualizacion desc) as rn
  from prueba.dbo.pagos1) t
	where t.rn = 1 order by fecha_actualizacion desc;`).then(function (resp) {
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
      request.input('numero4', numero)
      request.query(`select numero, nombre, estado, fecha_actualizacion from (select *,
    row_number() over (partition by numero order by fecha_actualizacion desc) as rn
    from prueba.dbo.pagos1) t
  	where t.rn = 1 and numero = @numero4 order by fecha_actualizacion desc;`).then(function (resp) {
          console.log(resp.recordset);
          res.send(resp.recordset);
          dbConn.close();
});
});
});
//FIN GET API---------------------------------------------------------



// POST API
app.post("/pagos/efectuados",function (req , res) {
//  var numero = req.params.numero;
//  var arrayNumero = [numero];
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn.connect().then(function () {
      var request = new sql.Request(dbConn);

      var cliente = req.body;
      let numero = cliente.numero;
      let nombre = cliente.nombre;
    //  var arrayNumero = [numero];
      request.input('numero3', numero);
      request.input('nombre2', nombre);
      request.query("insert into prueba.dbo.pagos1 (numero, nombre, estado, fecha_actualizacion) values (@numero3, @nombre2, 'Liberado', GETDATE());").then(function (resp) {
          console.log("Se ha cambio es el estado de la factura nro: "+numero);
          res.send("Se ha cambio es el estado de la factura nro: "+numero);
          dbConn.close();
});
});
});
//FIN POST

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
