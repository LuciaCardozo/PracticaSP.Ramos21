const styleBtnEliminar = "background-color: red; color: white;"+
"border:none; border-radius:5px; padding:5px; margin:1px;";

function mostrarSeleccionados() {
    let lista = filtrarPorEleccion();
    let divTabla = <HTMLElement>document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}

function filtrarPorEleccion() {
    let selectVehiculo = <HTMLSelectElement>document.getElementById('selectVehiculo');
    let lista = JSON.parse(localStorage.getItem('vehiculos') ?? "[]");
    let listaAutos = Array();
    let listaCamionetas = Array();
    let listaVehiculoSeleccionado = Array();
    listaCamionetas = lista.filter((vehiculo:any)=>vehiculo.cuatroXcuatro);
    listaAutos = lista.filter((vehiculo:any)=>vehiculo.cantidadPuertas);
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
    let auxCheck = <any>document.getElementsByName("check");
    let idSeleccionados = Array();
    auxCheck.forEach((element:any) => {
        if(element.checked) {
            idSeleccionados.push(element.id);
        }
    });
    return idSeleccionados;
}

function crearTabla(lista: any) {
    let tabla = <HTMLTableElement>document.createElement('table');
    if (lista.length > 0) {
       tabla.appendChild(cabecera(lista[0]));
        tabla.appendChild(cuerpo(lista));
    }
    return tabla;
}

function cabecera(item:any){
    let idSeleccionados = checksSeleccionados();
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let listaKey = Object.keys(item);
    listaKey.push("accion");
    listaKey.forEach(function (key: any) {
        idSeleccionados.forEach((e:any) => {
            if(key == e) {
                const th = document.createElement('th');
                let txt = document.createTextNode(key[0].toUpperCase()+key.slice(1));
                th.appendChild(txt);
                tr.appendChild(th);
            }
            tr.style.background = "rgb(146, 216, 221)";
        });
    });
    thead.appendChild(tr);
    return thead;
}

function cuerpo(lista: any) {
    let idSeleccionados = checksSeleccionados();
    const tbody = document.createElement('tbody');
    let listaKey = Object.keys(lista[0]);
    listaKey.push("accion");
    lista.forEach(function (element: any) {
        const tr = document.createElement('tr');
        listaKey.forEach(function (key: any) {
            idSeleccionados.forEach((e:any) => {
                if(key == e) {
                    if (key == "accion") {
                        let btnEliminar = document.createElement('button');
                        let txtEliminar = document.createTextNode('Eliminar');
                        btnEliminar.setAttribute('id', 'Eliminar');
                        btnEliminar.appendChild(txtEliminar);
                        btnEliminar.style.cssText = styleBtnEliminar;
                        tr.appendChild(btnEliminar);
                        agregarManejadorEliminar(btnEliminar);
                    } else {
                        const td = document.createElement('td');
                        let txt = document.createTextNode(element[key]);
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

function agregarManejadorEliminar(btn: any) {
    let lista = JSON.parse(localStorage.getItem('vehiculos') ?? "[]");
    if (btn) {
        btn.addEventListener('click', function (e: any) {
            let idCiudadanoSeleccionada = e.target.parentNode.dataset.id;
            for (let i = 0; i < lista.length; i++) {//recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i].id == idCiudadanoSeleccionada) {
                    lista.splice(i,1);
                }
            }
            localStorage.setItem('vehiculos', JSON.stringify(lista));
            console.log("ok");
            mostrarSeleccionados();
        });
    }
}

function abrirPopUp() {
    let popup = <HTMLElement>document.getElementById('divPopup');
    popup.style.visibility = "visible";
}

function cerrarPopUp() {
    let popup = <HTMLElement>document.getElementById('divPopup');
    popup.style.visibility = "hidden";
}

function cambiarTipo() {
    let select = <HTMLSelectElement>document.getElementById('select');
    let divAuto = <HTMLDivElement>document.getElementById('divAuto');
    let divCamioneta = <HTMLDivElement>document.getElementById('divCamioneta');
    if(select.value == "Auto") {
        divAuto.style.display = "initial";
        divCamioneta.style.display = "none";
    } else {
        divAuto.style.display = "none";
        divCamioneta.style.display = "initial";
    }
}

function calcularPromedio() {
    let lista = JSON.parse(localStorage.getItem('vehiculos') ?? "[]");
    let promedio = <HTMLInputElement>document.getElementById('inputPromedio');
    let listaAux = lista.reduce(function (total: number, valor: any) {
        return total + valor.precio;
    }, 0);
    promedio.value = String(listaAux / lista.length);
}
//// NO LO PIDIO PERO LO HICE POR LAS DUDAS ////
function calcularPromedioSeleccionado() {
    let selectVehiculo = <HTMLSelectElement>document.getElementById('selectVehiculo');
    let lista = JSON.parse(localStorage.getItem('vehiculos') ?? "[]");
    let promedio = <HTMLInputElement>document.getElementById('inputPromedio');
    let listaAutos = Array();
    let listaCamionetas = Array();
    let listaVehiculoSeleccionado = Array();
    lista.forEach((vehiculo: any) => {
        vehiculo.cuatroXcuatro
            ? listaCamionetas.push(vehiculo)
            : listaAutos.push(vehiculo);
    });
    selectVehiculo.value == "Camioneta"
        ? listaVehiculoSeleccionado = listaCamionetas
        : listaVehiculoSeleccionado = listaAutos;
    let totalPrecios: number = listaVehiculoSeleccionado.reduce(function (total: number, valor: any) {
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

