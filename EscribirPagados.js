const XLSX = require('xlsx');
const sql = require('mssql');
var workbook = XLSX.readFile('Inicio_Pagados_12-10-1010.xlsx');
var sheetNames = workbook.SheetNames;
var sheetIndex = 1;
//var factNro;
var dbConfig = {
    user:  "sistvisac",
    password: "Cac.2020",
    server: "10.0.220.33",
    database: "CAC",
    options: {
      port: 1433,
      instancename: 'SOFTLAND',
      encrypt: false
    }
};

var df = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex-1]]);
//console.log(df);
/*for (let nro of df){
    console.log(nro.NroFactura);
    factNro = nro.NroFactura;*/
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(async function () {
        //var request = new sql.Request(dbConn);
        //var factNro;
        for (let nro of df){
            var request = new sql.Request(dbConn);
            console.log(nro.NroFactura);
            //factNro = nro.NroFactura;
      //  var arrayNumero = [numero];
        request.input(`numero`, nro.NroFactura);
        await request.query(`INSERT INTO CONT_VISAC.dbo.Trx_Visac1 (NroFact, Fecha, Nombre, CantCert, ImpTotal, Estado) 
        SELECT
            NroFact,
            GETDATE(),
            Nombre,
            CantCert,
            ImpTotal,
            'Liberado'
        FROM
        CONT_VISAC.dbo.Trx_Visac1
             WHERE NroFact = @numero;`).then(function (resp) {
            console.log("Se ha cambio es el estado de la factura nro: "+nro.NroFactura);
            //res.send("Se ha cambio es el estado de la factura nro: "+factNro);
            
  });
  };
  dbConn.close();
})
