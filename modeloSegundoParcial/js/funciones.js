"use strict";
var styleBtnEliminar = "background-color: red; color: white;" +
    "border:none; border-radius:5px; padding:5px; margin:1px;";
var styleBtnModificar = "background-color: yellow; color: white;" +
    "border:none; border-radius:5px; padding:5px; margin:1px;";
function mostrarDatos(lista) {
    var divTabla = document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}
function mostrarDatosLista() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('lista')) !== null && _a !== void 0 ? _a : "[]");
    var divTabla = document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
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
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var listaKey = Object.keys(item);
    listaKey.push("accion");
    listaKey.forEach(function (key) {
        var th = document.createElement('th');
        var txt = document.createTextNode(key[0].toUpperCase() + key.slice(1));
        th.appendChild(txt);
        tr.appendChild(th);
    });
    tr.style.background = "rgb(146, 216, 221)";
    thead.appendChild(tr);
    return thead;
}
function cuerpo(lista) {
    var tbody = document.createElement('tbody');
    var listaKey = Object.keys(lista[0]);
    listaKey.push("accion");
    lista.forEach(function (element) {
        var tr = document.createElement('tr');
        listaKey.forEach(function (key) {
            if (key == "accion") {
                var btnEliminar = document.createElement('button');
                var txtEliminar = document.createTextNode('Eliminar');
                btnEliminar.setAttribute('id', 'Eliminar');
                btnEliminar.appendChild(txtEliminar);
                btnEliminar.style.cssText = styleBtnEliminar;
                tr.appendChild(btnEliminar);
                agregarManejadorEliminar(btnEliminar);
                var btnModificar = document.createElement('button');
                var txtModificar = document.createTextNode('Modificar');
                btnModificar.setAttribute('id', 'Eliminar');
                btnModificar.appendChild(txtModificar);
                btnModificar.style.cssText = styleBtnModificar;
                tr.appendChild(btnModificar);
                agregarManejadorModificar(btnModificar);
            }
            else {
                var td = document.createElement('td');
                var txt = document.createTextNode(element[key]);
                td.appendChild(txt);
                tr.appendChild(td);
            }
        });
        if (element.hasOwnProperty('_id')) {
            tr.setAttribute('data-id', element['_id']);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
function agregarManejadorEliminar(btn) {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('lista')) !== null && _a !== void 0 ? _a : "[]");
    if (btn) {
        btn.addEventListener('click', function (e) {
            var idCiudadanoSeleccionada = e.target.parentNode.dataset.id;
            for (var i = 0; i < lista.length; i++) { //recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i]._id == idCiudadanoSeleccionada) {
                    lista.splice(i, 1);
                }
            }
            localStorage.setItem('lista', JSON.stringify(lista));
            console.log("ok");
            mostrarDatos(lista);
        });
    }
}
function agregarManejadorModificar(btn) {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('lista')) !== null && _a !== void 0 ? _a : "[]");
    var nombre = document.getElementById('inputNombre');
    var apellido = document.getElementById('inputApellido');
    var edad = document.getElementById('inputEdad');
    var dni = document.getElementById('inputDni');
    var pais = document.getElementById('pais');
    var sexo = document.getElementsByName('inputSexo');
    var agregar = document.getElementById('btnAgregar');
    var guardar = document.getElementById('btnGuardar');
    var frm = document.forms[0];
    if (btn) {
        btn.addEventListener('click', function (e) {
            var idCiudadanoSeleccionada = e.target.parentNode.dataset.id;
            var _loop_1 = function (i) {
                if (lista[i]._id == idCiudadanoSeleccionada) {
                    agregar.disabled = true;
                    guardar.style.display = "initial";
                    abrirPopUp();
                    cargarDatosAlFormulario(lista[i]);
                    guardar.addEventListener("click", function () {
                        lista[i]._nombre = nombre.value;
                        lista[i]._apellido = apellido.value;
                        lista[i]._edad = edad.value;
                        lista[i]._dni = dni.value;
                        lista[i]._pais = pais.value;
                        lista[i]._sexo = frm.inputSexo.value;
                        localStorage.setItem('lista', JSON.stringify(lista));
                    });
                }
            };
            for (var i = 0; i < lista.length; i++) {
                _loop_1(i);
            }
        });
    }
}
function cargarDatosAlFormulario(aux) {
    var nombre = document.getElementById('inputNombre');
    var apellido = document.getElementById('inputApellido');
    var edad = document.getElementById('inputEdad');
    var dni = document.getElementById('inputDni');
    var pais = document.getElementById('pais');
    var sexo = document.getElementsByName('inputSexo');
    nombre.value = aux._nombre;
    apellido.value = aux._apellido;
    edad.value = aux._edad;
    dni.value = aux._dni;
    pais.value = aux._pais;
    if (aux._sexo == "Femenino") {
        sexo[0].checked = true;
    }
    else {
        sexo[1].checked = true;
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
function calcularPromedioSeleccionado() {
    var _a;
    var select = document.getElementById('selectSexo');
    var lista = JSON.parse((_a = localStorage.getItem('lista')) !== null && _a !== void 0 ? _a : "[]");
    var promedio = document.getElementById('inputPromedio');
    var listaFemenino = Array();
    var listaMasculino = Array();
    listaFemenino = lista.filter(function (item) { return item._sexo == "Femenino"; });
    listaMasculino = lista.filter(function (item) { return item._sexo == "Masculino"; });
    if (select.value == "Femenino") {
        var totalEdadFemenino = listaFemenino.reduce(function (total, valor) {
            return total + Number(valor._edad);
        }, 0);
        promedio.value = String(totalEdadFemenino / listaFemenino.length);
    }
    else if (select.value == "Masculino") {
        var totalEdadMasculino = listaMasculino.reduce(function (total, valor) {
            return total + Number(valor._edad);
        }, 0);
        promedio.value = String(totalEdadMasculino / listaMasculino.length);
    }
    else {
        var totalEdad = lista.reduce(function (total, valor) {
            return total + Number(valor._edad);
        }, 0);
        promedio.value = String(totalEdad / lista.length);
    }
    return promedio;
}
function filtrarPorEdadYSexo() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('lista')) !== null && _a !== void 0 ? _a : "[]");
    var select = document.getElementById('selectFiltroSexo');
    var edad = document.getElementById('edadFilter');
    var listaFemenino = Array();
    var listaMasculino = Array();
    var divTabla = document.getElementById('divTablaFiltrada');
    divTabla.innerHTML = "";
    listaFemenino = lista.filter(function (item) { return item._sexo == "Femenino"; });
    listaMasculino = lista.filter(function (item) { return item._sexo == "Masculino"; });
    if (Number(edad.value) >= 0) {
        if (select.value == "Femenino") {
            var listaFiltradaF = listaFemenino.filter(function (item) { return item._edad >= edad.value; });
            divTabla.appendChild(crearTablaFiltro(listaFiltradaF));
        }
        else if (select.value == "Masculino") {
            var listaFiltradaM = listaMasculino.filter(function (item) { return item._edad >= edad.value; });
            divTabla.appendChild(crearTablaFiltro(listaFiltradaM));
        }
        else {
            var listaFiltradaT = lista.filter(function (item) { return item._edad >= edad.value; });
            divTabla.appendChild(crearTablaFiltro(listaFiltradaT));
        }
    }
}
function filtrarPorPais() {
    var _a;
    var lista = JSON.parse((_a = localStorage.getItem('lista')) !== null && _a !== void 0 ? _a : "[]");
    var pais = document.getElementById('filtroPais');
    var divTabla = document.getElementById('divTablaFiltrada');
    divTabla.innerHTML = "";
    var listaFilter = lista.filter(function (item) { return item._pais == pais.value; });
    if (listaFilter.length > 0)
        return divTabla.appendChild(crearTablaFiltro(listaFilter));
}
function crearTablaFiltro(lista) {
    var tabla = document.createElement('table');
    if (lista.length > 0) {
        tabla.appendChild(cabeceraFiltro(lista[0]));
        tabla.appendChild(cuerpoFiltro(lista));
    }
    return tabla;
}
function cabeceraFiltro(item) {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var listaKey = Object.keys(item);
    listaKey.forEach(function (key) {
        var th = document.createElement('th');
        var txt = document.createTextNode(key[0].toUpperCase() + key.slice(1));
        th.appendChild(txt);
        tr.appendChild(th);
    });
    tr.style.background = "rgb(146, 216, 221)";
    thead.appendChild(tr);
    return thead;
}
function cuerpoFiltro(lista) {
    var tbody = document.createElement('tbody');
    var listaKey = Object.keys(lista[0]);
    lista.forEach(function (element) {
        var tr = document.createElement('tr');
        listaKey.forEach(function (key) {
            var td = document.createElement('td');
            var txt = document.createTextNode(element[key]);
            td.appendChild(txt);
            tr.appendChild(td);
        });
        if (element.hasOwnProperty('_id')) {
            tr.setAttribute('data-id', element['_id']);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
