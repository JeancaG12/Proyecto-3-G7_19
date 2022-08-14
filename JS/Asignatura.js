var UrlAsignaturas = 'http://20.216.41.245:90/G7_19/controller/asignatura.php?opc=GetAsignaturas';
var UrlInsertAsignatura = 'http://20.216.41.245:90/G7_19/controller/asignatura.php?opc=InsertAsignatura';
var UrlGetAsignatura = 'http://20.216.41.245:90/G7_19/controller/asignatura.php?opc=GetAsignatura';
var UrlUpdateAsignatura = 'http://20.216.41.245:90/G7_19/controller/asignatura.php?opc=UpdateAsignatura';
var UrlDeleteAsignatura = 'http://20.216.41.245:90/G7_19/controller/asignatura.php?opc=DeleteAsignatura';

$(document).ready(function(){
    CargarAsignaturas();

});

function CargarAsignaturas(){
    $.ajax({
        url: UrlAsignaturas, 
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i = 0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].CodigoAsignatura +'</td>'+
                '<td>'+ MiItems[i].NombreAsignatura +'</td>'+
                '<td>'+ MiItems[i].Carrera +'</td>'+
                '<td>'+ MiItems[i].FechaCreacion +'</td>'+
                '<td>'+ MiItems[i].UnidadesVal +'</td>'+
                '<td>'+ MiItems[i].PromedioAprob +'</td>'+
                '<td>'+ MiItems[i].NumeroEdificio +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarAsignatura('+ MiItems[i].CodigoAsignatura +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarAsignatura('+ MiItems[i].CodigoAsignatura+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataAsignaturas').html(Valores);
            }
        }
    });
}

function AgregarAsignatura(){
    var datosasignatura = {
        CodigoAsignatura: $('#CodigoAsignatura').val(), 
        NombreAsignatura: $('#NombreAsignatura').val(), 
        Carrera: $('#Carrera').val(), 
        FechaCreacion: $('#FechaCreacion').val(), 
        UnidadesVal: $('#UnidadesVal').val(),
        PromedioAprob: $('#PromedioAprob').val(), 
        NumeroEdificio: $('#NumeroEdificio').val()
        
    };

    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlInsertAsignatura,
        type: 'POST',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Asignatura agregada correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar asignatura'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}  

function CargarAsignatura(codigoasignatura) {
    var datosasignatura = {
        CodigoAsignatura: codigoasignatura
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlGetAsignatura,
        type: 'POST',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#CodigoAsignatura').val(MiItems[0].CodigoAsignatura);
            $('#NombreAsignatura').val(MiItems[0].NombreAsignatura);
            $('#Carrera').val(MiItems[0].Carrera);
            $('#FechaCreacion').val(MiItems[0].FechaCreacion);
            $('#UnidadesVal').val(MiItems[0].UnidadesVal);
            $('#PromedioAprob').val(MiItems[0].PromedioAprob);
            $('#NumeroEdificio').val(MiItems[0].NumeroEdificio);
            var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarAsignatura(' + MiItems[0].CodigoAsignatura + ')"'+
            'value="Actualizar Asignatura" class="btn btn-primary"></input>';
            $('#btnagregarasignatura').html(btnactualizar);
        }
    });

}


function ActualizarAsignatura(codigoasignatura){
    var datosasignatura = {
        CodigoAsignatura: codigoasignatura, 
        NombreAsignatura: $('#NombreAsignatura').val(), 
        Carrera: $('#Carrera').val(), 
        FechaCreacion: $('#FechaCreacion').val(), 
        UnidadesVal: $('#UnidadesVal').val(),
        PromedioAprob: $('#PromedioAprob').val(), 
        NumeroEdificio: $('#NumeroEdificio').val()
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlUpdateAsignatura,
        type: 'PUT',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse) {
            console.log(reponse);
            alert('Asignatura Actualizada');
        },
        error: function(textStatus, errorThrown ){
            alert('Error al Actualizar Asignatura'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarAsignatura(codigoasignatura){
    var datosasignatura = {
        CodigoAsignatura: codigoasignatura
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlDeleteAsignatura,
        type: 'DELETE',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            alert('Asignatura eliminada correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar asignatura'+ textStatus + errorThrown);
        }
    });
    alert("Socio Eliminado");
    CargarAsignaturas();

}