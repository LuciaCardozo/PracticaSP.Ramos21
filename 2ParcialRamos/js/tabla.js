"use strict";
var styleBtnEliminar = "background-color: red; color: white;" +
    "border:none; border-radius:5px; padding:5px; margin:1px;";
function mostrarSeleccionados() {
    var lista = filtrarPorEleccion();
    var divTabla = document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}
function filtrarPorEleccion() {
    var _a;
    var selectVehiculo = document.getElementById('selectVehiculo');
    var lista = JSON.parse((_a = localStorage.getItem('vehiculos')) !== null && _a !== void 0 ? _a : "[]");
    var listaAutos = Array();
    var listaCamionetas = Array();
    var listaVehiculoSeleccionado = Array();
    listaCamionetas = lista.filter(function (vehiculo) { return vehiculo.cuatroXcuatro; });
    listaAutos = lista.filter(function (vehiculo) { return vehiculo.cantidadPuertas; });
    // lista.forEach((vehiculo: any) => {
    //     vehiculo.cuatroXcuatro
    //         ? listaCamionetas.push(vehiculo)
    //         : listaAutos.push(vehiculo);
    // });
    selectVehiculo.value == "Camioneta"
        ? listaVehiculoSeleccionado = listaCamionetas
        : listaVehiculoSeleccionado = listaAutos;
    return listaVehiculoSeleccionado;
}
function checksSeleccionados() {
    var auxCheck = document.getElementsByName("check");
    var idSeleccionados = Array();
    auxCheck.forEach(function (element) {
        if (element.checked) {
            idSeleccionados.push(element.id);
        }
    });
    return idSeleccionados;
}
function crearTabla(lista) {
    var tabla = document.createElement('table');
    if (lista.length > 0) {
        tabla.appendChild(cabecera(lista[0]));
        tabla.appendChild(cuerpo(lista));
    }
    return tabla;
}
function cabecera(item) {
    var idSeleccionados = checksSeleccionados();
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var listaKey = Object.keys(item);
    listaKey.push("accion");
    listaKey.forEach(function (key) {
        idSeleccionados.forEach(function (e) {
            if (key == e) {
                var th = document.createElement('th');
                var txt = document.createTextNode(key[0].toUpperCase() + key.slice(1));
                th.appendChild(txt);
                tr.appendChild(th);
            }
            tr.style.background = "rgb(146, 216, 221)";
        });
    });
    thead.appendChild(tr);
    return thead;
}
function cuerpo(lista) {
    var idSeleccionados = checksSeleccionados();
    var tbody = document.createElement('tbody');
    var listaKey = Object.keys(lista[0]);
    listaKey.push("accion");
    lista.forEach(function (element) {
        var tr = document.createElement('tr');
        listaKey.forEach(function (key) {
            idSeleccionados.forEach(function (e) {
                if (key == e) {
                    if (key == "accion") {
                        var btnEliminar = document.createElement('button');
                        var txtEliminar = document.createTextNode('Eliminar');
                        btnEliminar.setAttribute('id', 'Eliminar');
                        btnEliminar.appendChild(txtEliminar);
                        btnEliminar.style.cssText = styleBtnEliminar;
                        tr.appendChild(btnEliminar);
                        agregarManejadorEliminar(btnEliminar);
                    }
                    else {
                        var td = document.createElement('td');
                        var txt = document.createTextNode(element[key]);
                        td.appendChild(txt);
                        tr.appendChild(td);
                    }
                }
            });
        });
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
function agregarManejadorEliminar(btn) {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('vehiculos')) !== null && _a !== void 0 ? _a : "[]");
    if (btn) {
        btn.addEventListener('click', function (e) {
            var idCiudadanoSeleccionada = e.target.parentNode.dataset.id;
            for (var i = 0; i < lista.length; i++) { //recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i].id == idCiudadanoSeleccionada) {
                    lista.splice(i, 1);
                }
            }
            localStorage.setItem('vehiculos', JSON.stringify(lista));
            console.log("ok");
            mostrarSeleccionados();
        });
    }
}
function abrirPopUp() {
    var popup = document.getElementById('divPopup');
    popup.style.visibility = "visible";
}
function cerrarPopUp() {
    var popup = document.getElementById('divPopup');
    popup.style.visibility = "hidden";
}
function cambiarTipo() {
    var select = document.getElementById('select');
    var divAuto = document.getElementById('divAuto');
    var divCamioneta = document.getElementById('divCamioneta');
    if (select.value == "Auto") {
        divAuto.style.display = "initial";
        divCamioneta.style.display = "none";
    }
    else {
        divAuto.style.display = "none";
        divCamioneta.style.display = "initial";
    }
}
function calcularPromedio() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('vehiculos')) !== null && _a !== void 0 ? _a : "[]");
    var promedio = document.getElementById('inputPromedio');
    var listaAux = lista.reduce(function (total, valor) {
        return total + valor.precio;
    }, 0);
    promedio.value = String(listaAux / lista.length);
}
//// NO LO PIDIO PERO LO HICE POR LAS DUDAS ////
function calcularPromedioSeleccionado() {
    var _a;
    var selectVehiculo = document.getElementById('selectVehiculo');
    var lista = JSON.parse((_a = localStorage.getItem('vehiculos')) !== null && _a !== void 0 ? _a : "[]");
    var promedio = document.getElementById('inputPromedio');
    var listaAutos = Array();
    var listaCamionetas = Array();
    var listaVehiculoSeleccionado = Array();
    lista.forEach(function (vehiculo) {
        vehiculo.cuatroXcuatro
            ? listaCamionetas.push(vehiculo)
            : listaAutos.push(vehiculo);
    });
    selectVehiculo.value == "Camioneta"
        ? listaVehiculoSeleccionado = listaCamionetas
        : listaVehiculoSeleccionado = listaAutos;
    var totalPrecios = listaVehiculoSeleccionado.reduce(function (total, valor) {
        return total + valor.precio;
    }, 0);
    promedio.value = String(totalPrecios / listaVehiculoSeleccionado.length);
    // if(selectVehiculo.value == "Camioneta"){
    //     let totalPreciosCamionetas:number = listaCamionetas.reduce(function(total:number,valor:any) {
    //         return total+valor.precio;
    //     },0)
    //     promedio.value = String(totalPreciosCamionetas/listaCamionetas.length);
    // }
    // else{
    //     let totalPreciosAutos:number = listaAutos.reduce(function(total:number,valor:any) {
    //         return total+valor.precio;
    //     },0)
    //    promedio.value = String(totalPreciosAutos/listaAutos.length);
    // }
}
