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
        url: "http://10.0.220.55:3006/facturas/"+numero,
        //headers: {"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjY3OTc4OTEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJsdWNpYW5vZGF0bzgyQGdtYWlsLmNvbSJ9.gbMWucBo7a3ck3gDFxDGD6qZPihZ1rovYhDSEjowAO1vUDy5kHyCXsbmqg7TV5D3wlNrZvmy8YPPfk_xunnieg"},
        method: "GET",
        dataType: "json",
        success: function  (result) {
          console.log(result[0]);
          nroFactura = result[0].NroFact;
          fecha = result[0].Fecha;
          nombre = result[0].Nombre;
          cantidad = result[0].CantCert;
          total = "$"+result[0].ImpTotal;
          estado = result[0].Estado;

          if (estado== "Pendiente de Pago") {
            $('#boton-pago').removeClass('invisible');
          };
        // $("#nroFactura").append(nroFactura);
        // $("#nombreEmp").append(nombre);
        // $("#estadoPago").append(estado);
        // if (estado== "Entregado") {
        //   $("#estadoPago").addClass('fondo-verde');
        //  }
        $("#tabla1").append(`      <tr>  <td id=nroFact`+nroFactura+`>`+nroFactura+`</td>
        <td id=nomEmp`+nroFactura+`>`+nombre+`</td>
        <td id=fecha`+nroFactura+`>`+fecha+`</td>
        <td id=cant`+nroFactura+`>`+cantidad+`</td>
        <td id=total`+nroFactura+`>`+total+`</td>
        <td>`+estado+`</td>
        <td>
          <button type="button" class="btn btn-success boton-pago" id=`+nroFactura+`>Marcar Pagado</button>
        </td>     </tr>    `);

        if (estado=="Liberado" || estado=="Entregado") {
          $("#"+nroFactura).attr('disabled', 'disabled');
        } ;

        }
      }
    )
    $('#input-nro').val("");
  }); // FIN CLICK BOTON

  //--------------------------------------------------------------------------------------------------
  $('#boton-ultimas10').on('click', function(e) {//INICIO CLICK BOTON
    e.preventDefault();
  //  $('#boton-entrega').addClass('invisible');
    $("#input-nro").val("");
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
        url: "http://10.0.220.55:3006/facturas",
        //headers: {"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjY3OTc4OTEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJsdWNpYW5vZGF0bzgyQGdtYWlsLmNvbSJ9.gbMWucBo7a3ck3gDFxDGD6qZPihZ1rovYhDSEjowAO1vUDy5kHyCXsbmqg7TV5D3wlNrZvmy8YPPfk_xunnieg"},
        method: "GET",
        dataType: "json",
        success: function  (result) {
          //console.log(result);
          for (var i = 0; i < result.length; i++) {
            //result[i]
          console.log(result[i]);
          nroFactura = result[i].NroFact;
          fecha = result[i].Fecha;
          nombre = result[i].Nombre;
          cantidad = result[i].CantCert;
          total = "$"+result[i].ImpTotal;
          estado = result[i].Estado;
          $("#tabla1").append(`      <tr>  <td id=nroFact`+nroFactura+`>`+nroFactura+`</td>
          <td id=nomEmp`+nroFactura+`>`+nombre+`</td>
          <td id=fecha`+nroFactura+`>`+fecha+`</td>
          <td id=cant`+nroFactura+`>`+cantidad+`</td>
          <td id=total`+nroFactura+`>`+total+`</td>
          <td>`+estado+`</td>
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
  let numeroFact = $(this).attr('id');
  let cantidadx = $("#cant"+numeroFact).text();
  let totalx = $("#total"+numeroFact).text();
  let nomEmp1 = $("#nomEmp"+numeroFact).text();
  $(this).attr('disabled', 'disabled');
  console.log(numeroFact);
  console.log(nomEmp1);
  $.ajax({
      type: "POST",
      url: "http://10.0.220.55:3006/pagos/efectuados",
      contentType : 'application/json',
      data: JSON.stringify(
        {
          "NroFact": numeroFact,
          "Nombre": nomEmp1,
          "CantCert": cantidadx,
          "ImpTotal": totalx
        }
      ),
      success: function(response) {
        alert(response);
        console.log(response);
        $("#estPago"+numeroFact).text("Liberado");
        $("#estPago"+numeroFact).addClass('fondo-verde');
      //  $('#'+numeroFact).addClass('invisible');
      }

  });
});


});//FIN DOCUMENT.READY
