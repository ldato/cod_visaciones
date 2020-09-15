$(document).ready(function() { //INICIO DOCUMENT.READY

  $('#boton-consulta').on('click', function(e) {//INICIO CLICK BOTON
    e.preventDefault();
    //$('#boton-entrega').addClass('invisible');
    $("#nroFactura").empty();
    $("#nombreEmp").empty();
    $("#estadoPago").empty();
    $("#fechaFact").empty();
    $("#cantidad").empty();
    $("#total1").empty();
    $("#fecha_entrega").empty();
    $("#estadoPago").removeClass('fondo-verde');
    //$('#boton-entrega').removeClass('invisible');
    var numero = $('#input-nro').val();
    if (numero=="") {
      alert("Debe ingresar un numero de factura");
    };

    $.ajax(
      {
        url: "http://10.0.220.55:3006/facturas/"+numero,
        //headers: {"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjY3OTc4OTEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJsdWNpYW5vZGF0bzgyQGdtYWlsLmNvbSJ9.gbMWucBo7a3ck3gDFxDGD6qZPihZ1rovYhDSEjowAO1vUDy5kHyCXsbmqg7TV5D3wlNrZvmy8YPPfk_xunnieg"},
        method: "GET",
        dataType: "json",
        success: function  (result) {
          console.log(result[0]);
          nroFactura = result[0].NroFact;
          estado = result[0].Estado;
          nombre = result[0].Nombre;
          cantidad = result[0].CantCert;
          importe = result[0].ImpTotal;
          fecha = result[0].Fecha;
          fecha_actualizacion = result[0].fecha_actualizacion;
          if (estado== "Liberado") {
            //$('#boton-entrega').removeClass('invisible');

          };
          $("#nroFactura").append(nroFactura);
          $("#nombreEmp").append(nombre);
          $("#estadoPago").append(estado);
          $("#fechaFact").append(fecha);
          $("#cantidad").append(cantidad);
          $("#total1").append(importe);
          if (estado=="Liberado") {
            //$("#estadoPago").addClass('fondo-verde');
            //$("#fecha_entrega").append(fecha_actualizacion);
            $("#boton-entrega").removeClass('invisible');
            $("#boton-entrega").removeAttr('disabled');
          } else {
            $("#boton-entrega").attr('disabled', 'disabled');
          }
          if (estado=="Entregado" || estado=="Pendiente de pago") {
            $("#fecha_entrega").append(fecha_actualizacion);
            $("#boton-entrega").addClass('invisible');
          }

        }
      }
    )
    $("#input-nro").val("");
  }); // FIN CLICK BOTON

  $(document).on('click', '#boton-entrega', function(e) { // INICIO BOTON ENTREGA
    e.preventDefault();
    let numero1 = $("#nroFactura").text();
    let nombreCli = $("#nombreEmp").text();
    //let fecha1 = $("#fechaFact").text();
    let cantidadIn = $("#cantidad").text();
    let importeTot = $("#total1").text();
    $.ajax({
        type: "POST",
        url: "http://10.0.220.55:3006/facturas/entregar",
        contentType : 'application/json',
        data: JSON.stringify(
          {
            "NroFact": numero1,
            "Nombre": nombreCli,
            "CantCert": cantidadIn,
            "ImpTotal": importeTot
          }
        ),
        beforeSend:function(){
          return confirm("Esta seguro de marcar entregado la factura nro: "+numeroFact);
       },
        success: function(response) {
          alert(response);
          console.log(response);
          $("#estadoPago").text("Entregado");
          $("#estadoPago").addClass('fondo-verde');
          $("#boton-entrega").attr('disabled', "disabled");
          //$('#boton-entrega').addClass('invisible');
        }

    });
    $("#input-nro").val("");
    console.log(numero1, nombreCli);
  });// FIN BOTON ENTREGA


});//FIN DOCUMENT.READY
