$(document).ready(function() { //INICIO DOCUMENT.READY

  $('#boton-consulta').on('click', function(e) {//INICIO CLICK BOTON
    e.preventDefault();
    $('#boton-entrega').addClass('invisible');
    $("#nroFactura").empty();
    $("#nombreEmp").empty();
    $("#estadoPago").empty();
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
          nombre = result[0].nombre
          if (estado== "liberado") {
            $('#boton-entrega').removeClass('invisible');
          };
          $("#nroFactura").append(nroFactura);
          $("#nombreEmp").append(nombre);
          $("#estadoPago").append(estado);
          if (estado== "Entregado") {
            $("#estadoPago").addClass('fondo-verde');
          }
        }
      }
    )

  }); // FIN CLICK BOTON

  $('#boton-entrega').on('click', function(e) { // INICIO BOTON ENTREGA
    e.preventDefault();
    var numero1 = $("#input-nro").val();
    $.ajax({
        type: "PUT",
        url: "http://localhost:3006/pagos/"+numero1,
        contentType : 'application/json',

        success: function(response) {
          alert(response);
          console.log(response);
          $("#estadoPago").text("Entregado");
          $("#estadoPago").addClass('fondo-verde');
          $('#boton-entrega').addClass('invisible');
        }

    });

  });// FIN BOTON ENTREGA


});//FIN DOCUMENT.READY
