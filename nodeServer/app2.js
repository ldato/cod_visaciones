//var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mssql = require('mssql');


var app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());

// var puerto = nro_puerto;

var con = mysql.createConnection({
  /* host: "10.0.220.33",
  user: "sa",
  password: "Softland@1",
  database: "CAC_TST" */
  //host: "10.0.220.33",
  userName: 'sa',
  password: 'Softland@1',
  server: '10.0.220.33',

  options: {
       port: 3001,
       database: 'CAC_TST',
       instancename: 'TESTING'
     }
});

con.connect(function (error) {
  if (error) throw error;
  console.log("Conexión Establecida");

  app.listen(3001, function (error) {
    if (error) throw error;
    console.log("Programa conectado escuchando en el puerto 3001");
  });

app.get('/FontVisac', function (req, res) {
  con.query(`SELECT * from FrontVisac`, function (error, result) {
    if (error) throw error;
    res.send(result);
  })
});


});
