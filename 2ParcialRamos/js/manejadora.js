"use strict";
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.prototype.handleEvent = function (e) {
        var lista;
        var proximoId;
        var agregar = document.getElementById('btnAgregar');
        agregar.addEventListener("click", function () {
            altaVehiculo();
        });
        function altaVehiculo() {
            var nuevoVehiculo = agregarDatos();
            if (nuevoVehiculo) {
                proximoId = Number(obtenerId());
                lista = obtenerLista();
                lista.push(nuevoVehiculo);
                console.log(lista);
                proximoId++;
                guardarDatos();
                mostrarSeleccionados();
                cerrarPopUp();
            }
            else {
                alert("error");
            }
        }
        function agregarDatos() {
            var marca = document.getElementById('inputMarca');
            var modelo = document.getElementById('inputModelo');
            var precio = document.getElementById('inputPrecio');
            var tipo = document.getElementById('select');
            var esCuatroXCuatro = document.getElementsByName('cuatroXcuatro');
            var cantPuerta = document.getElementsByName('cantPuertas');
            var es4x4 = esCuatroXCuatro[0].checked;
            var puertas = cantPuerta[0].checked;
            var nuevoVehiculo;
            proximoId = obtenerId();
            if (tipo.value == "Camioneta") {
                if (es4x4) {
                    nuevoVehiculo = new Camioneta(proximoId, marca.value, modelo.value, Number(precio.value), es4x4);
                }
                else {
                    nuevoVehiculo = new Camioneta(proximoId, marca.value, modelo.value, Number(precio.value), es4x4);
                }
            }
            else {
                if (puertas) {
                    puertas = "3";
                    nuevoVehiculo = new Auto(proximoId, marca.value, modelo.value, Number(precio.value), puertas);
                }
                else {
                    puertas = "5";
                    nuevoVehiculo = new Auto(proximoId, marca.value, modelo.value, Number(precio.value), puertas);
                }
            }
            return nuevoVehiculo;
        }
        function obtenerId() {
            var aux = localStorage.getItem('nextId');
            return aux ? JSON.parse(aux) : 0;
        }
        function obtenerLista() {
            var lista = localStorage.getItem('vehiculos');
            return lista ? JSON.parse(lista) : [];
        }
        function guardarDatos() {
            localStorage.setItem('vehiculos', JSON.stringify(lista));
            localStorage.setItem('nextId', proximoId);
        }
    };
    return Manejadora;
}());
window.addEventListener("load", new Manejadora);
