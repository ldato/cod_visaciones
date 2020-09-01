$(document).ready(function() { //INICIO DOCUMENT.READY

  $('#boton-consulta').on('click', function(e) {//INICIO CLICK BOTON
    e.preventDefault();
    $('#boton-entrega').addClass('invisible');
    $("#nroFactura").empty();
    $("#nombreEmp").empty();
    $("#estadoPago").empty();
    $("#estadoPago").removeClass('fondo-verde');
    $("#tabla1").empty();

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
          if (estado== "En Proceso") {
            $('#boton-pago').removeClass('invisible');
          };
        // $("#nroFactura").append(nroFactura);
        // $("#nombreEmp").append(nombre);
        // $("#estadoPago").append(estado);
        // if (estado== "Entregado") {
        //   $("#estadoPago").addClass('fondo-verde');
        //  }
        $("#tabla1").append(`      <tr>  <td id="nroFactura">`+result[0].numero+`</td>
        <td id="nombreEmp">`+result[0].nombre+`</td>
        <td id="estadoPago">`+result[0].estado+`</td>
        <td>
          <button type="button" class="btn btn-secondary" id="boton-proceso">Procesar</button>
          <button type="button" class="btn btn-success" id="boton-pago">Marcar Pagado</button>
        </td>     </tr>    `);

        if (estado=="En proceso") {
          $("#boton-pago").removeClass('disabled');
          $("#boton-proceso").addClass('disabled');
        }
        }
      }
    )

  }); // FIN CLICK BOTON

  //--------------------------------------------------------------------------------------------------
  $('#boton-ultimas10').on('click', function(e) {//INICIO CLICK BOTON
    e.preventDefault();
  //  $('#boton-entrega').addClass('invisible');
    $("#nroFactura").empty();
    $("#nombreEmp").empty();
    $("#estadoPago").empty();
    $("#estadoPago").removeClass('fondo-verde');
    $("#tabla1").empty();

    //$('#boton-entrega').removeClass('invisible');
    //var numero = $('#input-nro').val();
    //if (numero=="") {
      //alert("Debe ingresar un numero de factura");
    //};

    //-----------------------EVENTO CLICK PAGO ADENTRO


    //-----------------------FIN EVENTO CLICK PAGO ADENTRO

    $.ajax(
      {
        url: "http://localhost:3006/facturas",
        //headers: {"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjY3OTc4OTEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJsdWNpYW5vZGF0bzgyQGdtYWlsLmNvbSJ9.gbMWucBo7a3ck3gDFxDGD6qZPihZ1rovYhDSEjowAO1vUDy5kHyCXsbmqg7TV5D3wlNrZvmy8YPPfk_xunnieg"},
        method: "GET",
        dataType: "json",
        success: function  (result) {
          console.log(result);
          for (var i = 0; i < result.length; i++) {
            //result[i]
            nroFactura = result[i].numero;
            estado = result[i].estado;
            nombre = result[i].nombre;
            $("#tabla1").append(`      <tr>  <td id=nroFact`+nroFactura+`>`+nroFactura+`</td>
            <td id=nomEmp`+nroFactura+`>`+nombre+`</td>
            <td id=estPago`+nroFactura+`>`+estado+`</td>
            <td>
              <button type="button" class="btn btn-success boton-pago" id=`+nroFactura+`>Marcar Pagado</button>
            </td>     </tr>    `);

            if (estado=="Liberado" || estado=="Entregado") {
              $("#"+nroFactura).attr('disabled', 'disabled');
            } ;


          }
         // nroFactura = result[0].numero;
          //estado = result[0].estado;
          //nombre = result[0].nombre
          //if (estado== "En Proceso") {
          //  $('#boton-pago').removeClass('invisible');
          //};
          //$("#nroFactura").append(nroFactura);
          //$("#nombreEmp").append(nombre);
          //$("#estadoPago").append(estado);
          //if (estado== "Entregado") {
          //  $("#estadoPago").addClass('fondo-verde');
          //}
        }
      }
    )

  }); // FIN CLICK BOTON

  //--------------------------------------------------------------------------------------------------

  /* $('.boton-pago----').on('click',function(e) { // INICIO BOTON ENTREGA
    e.preventDefault();
    var numero2 = this.id;
    console.log(numero2);
    $.ajax({
        type: "PUT",
        url: "http://localhost:3006/pagados/"+numero2,
        contentType : 'application/json',

        success: function(response) {
          alert(response);
          console.log(response);
          $("#estadoPago").text("Liberado");
          $("#estadoPago").addClass('fondo-verde');
          $('#boton-pago').addClass('invisible');
        }

    });

  });*/ // FIN BOTON ENTREGA

$(document).on('click', '.boton-pago', function() {
  var numeroFact = $(this).attr('id');
  $(this).attr('disabled', 'disabled');
  console.log(numeroFact);
  $.ajax({
      type: "POST",
      url: "http://localhost:3006/pagados/"+numeroFact,
      contentType : 'application/json',

      success: function(response) {
        alert(response);
        console.log(response);
        $("#estadoPago"+numeroFact).text("Liberado");
        $("#estadoPago"+numeroFact).addClass('fondo-verde');
      //  $('#'+numeroFact).addClass('invisible');
      }

  });
});


});//FIN DOCUMENT.READY
