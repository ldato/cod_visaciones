$(document).ready(function() { //INICIO DOCUMENT.READY

  $('#boton-consulta').on('click', function(e) {//INICIO CLICK BOTON
    e.preventDefault();
    //$('#boton-entrega').addClass('invisible');
    $("#nroFactura").empty();
    $("#nombreEmp").empty();
    $("#estadoPago").empty();
    $("#fecha_entrega").empty();
    $("#estadoPago").removeClass('fondo-verde');
    //$('#boton-entrega').removeClass('invisible');
    var numero = $('#input-nro').val();
    if (numero=="") {
      alert("Debe ingresar un numero de factura");
    };

    $.ajax(
      {
        url: "http://localhost:3006/facturas/"+numero,
        //headers: {"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjY3OTc4OTEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJsdWNpYW5vZGF0bzgyQGdtYWlsLmNvbSJ9.gbMWucBo7a3ck3gDFxDGD6qZPihZ1rovYhDSEjowAO1vUDy5kHyCXsbmqg7TV5D3wlNrZvmy8YPPfk_xunnieg"},
        method: "GET",
        dataType: "json",
        success: function  (result) {
          console.log(result[0]);
          nroFactura = result[0].numero;
          estado = result[0].estado;
          nombre = result[0].nombre;
          fecha_actualizacion = result[0].fecha_actualizacion;
          if (estado== "Liberado") {
            //$('#boton-entrega').removeClass('invisible');

          };
          $("#nroFactura").append(nroFactura);
          $("#nombreEmp").append(nombre);
          $("#estadoPago").append(estado);
          if (estado=="Liberado") {
            //$("#estadoPago").addClass('fondo-verde');
            //$("#fecha_entrega").append(fecha_actualizacion);
            $("#boton-entrega").removeClass('invisible');
            $("#boton-entrega").removeAttr('disabled');
          } else {
            $("#boton-entrega").attr('disabled', 'disabled');
          }
          if (estado=="Entregado") {
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
    $.ajax({
        type: "POST",
        url: "http://localhost:3006/facturas/entregar",
        contentType : 'application/json',
        data: JSON.stringify(
          {
            "numero": numero1,
            "nombre": nombreCli
          }
        ),
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
