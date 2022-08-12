var UrlDocentes ='http://20.216.41.245:90/G7_19/controller/docentes.php?op=GetDocentes';
var UrlInsertDocente='http://20.216.41.245:90/G7_19/controller/docentes.php?op=InsertDocente';
var UrlGetDocente='http://20.216.41.245:90/G7_19/controller/docentes.php?op=GetDocente';
var UrlUpdateDocente='http://20.216.41.245:90/G7_19/controller/docentes.php?op=UpdateDocente';
var UrlDeleteDocente='http://20.216.41.245:90/G7_19/controller/docentes.php?op=DeleteDocente'

$(document).ready(function(){
      CargarDocentes();
});

function CargarDocentes(){
    $.ajax({
        url: UrlDocentes,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].Numero_Docente +'</td>'+
                '<td>'+ MiItems[i].Nombre +'</td>'+
                '<td>'+ MiItems[i].Apellidos +'</td>'+
                '<td>'+ MiItems[i].Fecha_Contratacion +'</td>'+
                '<td>'+ MiItems[i].Direccion +'</td>'+
                '<td>'+ MiItems[i].Salario +'</td>'+
                '<td>'+ MiItems[i].Profesion +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarDocente('+ MiItems[i].Numero_Docente+')">Editar</button>'+
                '<td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarDocente('+ MiItems[i].Numero_Docente+')">Eliminar</button>'+
                '<td>'+

              '</tr>';
              $('#DataDocentes').html(Valores);

            }

        

        }
    });
}

function AgregarDocente(){
    var datosdocentes = {
        Numero_Docente: $('#Numero_Docente').val(),
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_Contratacion: $('#Fecha_Contratacion').val(),
        Direccion: $('#Direccion').val(),
        Salario: $('#Salario').val(),
        Profesion: $('#Profesion').val()
    };
    var datosdocentesjson = JSON.stringify(datosdocentes);

    $.ajax({
        url: UrlInsertDocente,
        type: 'POST',
        data:datosdocentesjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
            alert('Docente agregado con exito');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar docente'+ textStatus + errorThrown);

        }
    });
    alert('Aviso');

}

function CargarDocente(numerodocente){
    var datosdocentes = {
        Numero_Docente: numerodocente
    };
    var datosdocentejson = JSON.stringify(datosdocentes);

    $.ajax({
        url: UrlGetDocente,
        type: 'POST',
        data:datosdocentejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response) {
            var MiItems = response;
            $('#Numero_Docente').val(MiItems[0].Numero_Docente);
            $('#Nombre').val(MiItems[0].Nombre);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#Fecha_Contratacion').val(MiItems[0].Fecha_Contratacion);
            $('#Direccion').val(MiItems[0].Direccion);
            $('#Salario').val(MiItems[0].Salario);
            $('#Profesion').val(MiItems[0].Profesion);
            var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarDocente(' + MiItems[0].Numero_Docente + ')"'+
            'value="Actualizar Docente" class="btn btn-primary"></input>';
            $('#btnagregardocente').html(btnactualizar);
        }
    });

}

function ActualizarDocente(numerodocente){
    var datosdocente = {
        Numero_Docente: numerodocente,
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_Contratacion: $('#Fecha_Contratacion').val(),
        Direccion: $('#Direccion').val(),
        Salario: $('#Salario').val(),
        Profesion: $('#Profesion').val()
    };
    var datosdocentejson = JSON.stringify(datosdocente)

    $.ajax({
        url: UrlUpdateDocente,
        type: 'PUT',
        data:datosdocentejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
            alert('Docente actualizado con exito');
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar docente'+ textStatus + errorThrown);

        }
    });
    alert('Aviso');

}

function EliminarDocente(numerodocente){
    var datosdocentes = {
        Numero_Docente: numerodocente
    };
    var datosdocentejson = JSON.stringify(datosdocentes);

    $.ajax({
        url: UrlDeleteDocente,
        type: 'DELETE',
        data:datosdocentejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar docente'+ textStatus + errorThrown);
        }

    });
    alert("Docente Eliminado");
    CargarDocentes();     

    

}
