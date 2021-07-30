"use strict";
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.prototype.handleEvent = function (evt) {
        evt.preventDefault();
        var lista;
        var proximoId;
        var agregar = document.getElementById('btnAgregar');
        agregar.addEventListener("click", function (e) {
            e.preventDefault();
            //console.log(agregarDatos(evt));
            alta();
        });
        function alta() {
            var nuevo = agregarDatos();
            if (nuevo) {
                proximoId = Number(obtenerId());
                lista = obtenerLista();
                lista.push(nuevo);
                //console.log(lista);
                proximoId++;
                guardarDatos();
                mostrarDatos(lista);
                cerrarPopUp();
            }
            else {
                alert("error");
            }
        }
        function agregarDatos() {
            var nombre = document.getElementById('inputNombre');
            var apellido = document.getElementById('inputApellido');
            var edad = document.getElementById('inputEdad');
            var dni = document.getElementById('inputDni');
            var pais = document.getElementById('pais');
            var sexo = document.getElementsByName('inputSexo');
            var esMasculino = sexo[1].checked;
            var nuevo;
            proximoId = obtenerId();
            if (esMasculino) {
                nuevo = new Ciudadano(proximoId, nombre.value, apellido.value, Number(edad.value), Number(dni.value), pais.value, "Masculino");
            }
            else {
                nuevo = new Ciudadano(proximoId, nombre.value, apellido.value, Number(edad.value), Number(dni.value), pais.value, "Femenino");
            }
            return nuevo;
        }
        function obtenerId() {
            var aux = localStorage.getItem('nextId');
            return aux ? JSON.parse(aux) : 0;
        }
        function obtenerLista() {
            var lista = localStorage.getItem('lista');
            return lista ? JSON.parse(lista) : [];
        }
        function guardarDatos() {
            localStorage.setItem('lista', JSON.stringify(lista));
            localStorage.setItem('nextId', proximoId);
        }
    };
    return Manejadora;
}());
window.addEventListener('load', new Manejadora);
