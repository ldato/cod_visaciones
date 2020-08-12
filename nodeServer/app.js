var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());

// var puerto = nro_puerto;

var con = mysql.createConnection({
  host: "10.0.220.33",
  user: "sa",
  password: "Softland@1",
  database: "CAC_TST"
});

con.connect(function (error) {
  if (error) throw error;
  console.log("Conexión Establecida");

  app.listen(3306, function (error) {
    if (error) throw error;
    console.log("Programa conectado escuchando en el puerto 3306");
  });

app.get('/FontVisac', function (req, res) {
  con.query(`SELECT * from FrontVisac`, function (error, result) {
    if (error) throw error;
    res.send(result);
  })
});


});
