var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var cors = require('cors');
var app = express();
var path = require("path");


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
    user:  "sistvisac",
    password: "Cac.2020",
    server: "SOFTLAND\\TESTING",
    database: "CAC_TST",
    options: {
      port: 1433,
    //  instancename: 'SQLEXPRESS',
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
      request.query(`select NroFact, Fecha, Nombre, CantCert, ImpTotal, Estado from (select *,
    row_number() over (partition by Nrofact order by Fecha desc) as rn
    from CONT_VISAC.dbo.Trx_Visac1) t
  	where t.rn = 1 and NroFact = @numero4 order by Fecha desc;`).then(function (resp) {
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

      var factura = req.body;
      let factNro = factura.NroFact;
      //let fecha = factura.Fecha;
      let nomCli = factura.Nombre;
      let cantIns = factura.CantCert;
      let importeIn = factura.ImpTotal;
    //  var arrayNumero = [numero];
    request.input('numero4', factNro);
    request.input('nombre3', nomCli);
    //&request.input('fechaIn', fecha);
    request.input('cantIn', cantIns);
    request.input('totalIns', importeIn);
      request.query("insert into CONT_VISAC.dbo.Trx_Visac1 (NroFact, Fecha, Nombre, CantCert, ImpTotal, Estado) values (@numero4, GETDATE(),  @nombre3, @cantIn, @totalIns, 'Liberado');").then(function (resp) {
          console.log("Se ha cambio es el estado de la factura nro: "+numero);
          res.send("Se ha cambio es el estado de la factura nro: "+numero);
          dbConn.close();
});
});
});
//FIN POST

// PUT API
/* app.put("/pagados/:factura", function (req , res) {
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
}) */
// FIN PUT API
app.post("/facturas/entregar",function (req , res) {
//  var numero = req.params.numero;
//  var arrayNumero = [numero];
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn.connect().then(function () {
      var request = new sql.Request(dbConn);

      var factura = req.body;
      let factNro = factura.NroFact;
      //let fecha = factura.Fecha;
      let nomCli = factura.Nombre;
      let cantIns = factura.CantCert;
      let importeIn = factura.ImpTotal;
    //  var arrayNumero = [numero];
      request.input('numero4', factNro);
      request.input('nombre3', nomCli);
      //&request.input('fechaIn', fecha);
      request.input('cantIn', cantIns);
      request.input('totalIns', importeIn);
      request.query("insert into CONT_VISAC.dbo.Trx_Visac1 (NroFact, Fecha, Nombre, CantCert, ImpTotal, Estado) values (@numero4, GETDATE(),  @nombre3, @cantIn, @totalIns, 'Entregado');").then(function (resp) {
          console.log("Se ha cambio es el estado de la factura nro: "+factNro);
          res.send("Se ha cambio es el estado de la factura nro: "+factNro);
          dbConn.close();
});
});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////ENTREGAR LOS HTML/////////////////////////////////////////////
app.use(express.static('../public/visac'));
app.use("/backoffice", express.static('../public/backoffice'));
