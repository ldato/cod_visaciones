const XLSX = require('xlsx');
const sql = require('mssql');
var workbook = XLSX.readFile('excel_to_json.xlsx');
var sheetNames = workbook.SheetNames;
var sheetIndex = 1;
//var factNro;
var dbConfig = {
    user:  "sistvisac",
    password: "Cac.2020",
    server: "SOFTLAND\\TESTING",
    database: "CAC_TST",
    options: {
      port: 1433,
     // instancename: 'SQLEXPRESS',
      encrypt: false
    }
};

var df = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex-1]]);
//console.log(df);
/*for (let nro of df){
    console.log(nro.NroFactura);
    factNro = nro.NroFactura;*/
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(function () {
        //var request = new sql.Request(dbConn);
        //var factNro;
        for (let nro of df){
            var request = new sql.Request(dbConn);
            console.log(nro.NroFactura);
            //factNro = nro.NroFactura;
      //  var arrayNumero = [numero];
        request.input(`numero`, nro.NroFactura);
        request.query(`INSERT INTO CONT_VISAC.dbo.Trx_Visac1 (NroFact, Fecha, Nombre, CantCert, ImpTotal, Estado) 
        SELECT
            NroFact,
            FORMAT (GETDATE(), 'dd/MM/yyyy HH:mm:ss'),
            Nombre,
            CantCert,
            ImpTotal,
            'Liberado'
        FROM
        CONT_VISAC.dbo.Trx_Visac1
             WHERE numero = @numero;`).then(function (resp) {
            console.log("Se ha cambio es el estado de la factura nro: "+nro.NroFactura);
            //res.send("Se ha cambio es el estado de la factura nro: "+factNro);
            dbConn.close();
  });
  };
})
