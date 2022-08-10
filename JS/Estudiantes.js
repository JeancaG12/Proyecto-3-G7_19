var UrlEstudiantes = 'http://20.216.41.245:90/G7_19/controller/estudiantes.php?op=GetEstudiantes';
var UrlInsertarEstudiantes = 'http://20.216.41.245:90/G7_19/controller/estudiantes.php?op=InsertEstudiante';
var UrlGetEstudiante = 'http://20.216.41.245:90/G7_19/controller/estudiantes.php?op=GetEstudiante';
var UrlUpdateEstudiante = 'http://20.216.41.245:90/G7_19/controller/estudiantes.php?op=UpdateEstudiante';
var UrlDeleteEstudiante = 'http://20.216.41.245:90/G7_19/controller/estudiantes.php?op=DeleteEstudiante'

$(document).ready(function(){
    CargarEstudiantes();
});

function CargarEstudiantes(){
    $.ajax({
        url: UrlEstudiantes, 
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MisItems = reponse;
            var Valores= '';
            for(i=0; i<MisItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MisItems[i].Numero_Alumno +'</td>'+
                '<td>'+ MisItems[i].Nombre +'</td>'+
                '<td>'+ MisItems[i].Apellidos +'</td>'+
                '<td>'+ MisItems[i].Fecha_Nacimiento +'</td>'+
                '<td>'+ MisItems[i].Direccion +'</td>'+
                '<td>'+ MisItems[i].Altura +'</td>'+
                '<td>'+ MisItems[i].Carrera +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarEstudiante('+ MisItems[i].Numero_Alumno+')">Editar</button>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarEstudiante('+ MisItems[i].Numero_Alumno+')">Eliminar</button>'+
                '<td>'+
                '</tr>';
            $('#DataEstudiantes').html(Valores);
            }
        }
    });
}

function AgregarAlumno(){
    var datosAlumnos = {
        Numero_Alumno: $('#Numero_Alumno').val(),
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_Nacimiento: $('#Fecha_Nacimiento').val(),
        Direccion: $('#Direccion').val(),
        Altura: $('#Altura').val(),
        Carrera: $('#Carrera').val()
    };
    var datosEstudianteJson = JSON.stringify(datosAlumnos);

    $.ajax({
        url: UrlInsertarEstudiantes,
        type: 'POST',
        data: datosEstudianteJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Estudiante agregado con exito!');
        },
        error: function(textstatus, errorThrown){
            alert('Error! el estudiante no se pudo agregar!' + textstatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarEstudiante(idEstudiante){
    var datosAlumnos = {
        Numero_Alumno: idEstudiante
    };
    var datosEstudianteJson = JSON.stringify(datosAlumnos);

    $.ajax({
        url: UrlGetEstudiante,
        type: 'POST',
        data: datosEstudianteJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            var MisItems = reponse;
            $('#Numero_Alumno').val(MisItems[0].Numero_Alumno);
            $('#Nombre').val(MisItems[0].Nombre);
            $('#Apellidos').val(MisItems[0].Apellidos);
            $('#Fecha_Nacimiento').val(MisItems[0].Fecha_Nacimiento);
            $('#Direccion').val(MisItems[0].Direccion);
            $('#Altura').val(MisItems[0].Altura);
            $('#Carrera').val(MisItems[0].Carrera);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarEstudiante(' + MisItems[0].Numero_Alumno + ')"'+
            'value="Actualizar Estudiante" class="btn btn-primary"></imput>';
            $('#btnagregarestudiantes').html(btnactualizar);
        }
    });
}

function ActualizarEstudiante(idEstudiante){
    var datosAlumnos = {
        Numero_Alumno: idEstudiante,
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_Nacimiento: $('#Fecha_Nacimiento').val(),
        Direccion: $('#direccion').val(),
        Altura: $('#Altura').val(),
        Carrera: $('#Carrera').val()
    };
    var datosEstudianteJson = JSON.stringify(datosAlumnos);

    $.ajax({
        url: UrlUpdateEstudiante,
        type: 'PUT',
        data: datosEstudianteJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Estudiante Actualizado");
        },
        error: function(textstatus, errorThrown){
            alert('Error al actualizar estudiante' + textstatus + errorThrown);
        }
    });
    alert('Aviso');
}

 function EliminarEstudiante(idEstudiante){
    var datosAlumnos = {
        Numero_Alumno: idEstudiante
    };
    var datosEstudianteJson = JSON.stringify(datosAlumnos);

    $.ajax({
        url: UrlDeleteEstudiante,
        type: 'DELETE',
        data: datosEstudianteJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert('Estudiante Eliminado');
            CargarEstudiante();
        },
        error: function(textstatus, errorThrown){
            alert('Error al eliminar estudiante' + textstatus + errorThrown);
        }
    });

 }