const styleBtnEliminar = "background-color: red; color: white;"+
"border:none; border-radius:5px; padding:5px; margin:1px;";
const styleBtnModificar = "background-color: yellow; color: white;"+
"border:none; border-radius:5px; padding:5px; margin:1px;";

function mostrarDatos(lista:any) {
    let divTabla = <HTMLElement>document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
}

function mostrarDatosLista() {
    let lista = JSON.parse(localStorage.getItem('lista') ?? "[]");
    let divTabla = <HTMLElement>document.getElementById('divTabla');
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(lista));
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
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let listaKey = Object.keys(item);
    listaKey.push("accion");
    listaKey.forEach(function (key: any) {
        const th = document.createElement('th');
        let txt = document.createTextNode(key[0].toUpperCase()+key.slice(1));
        th.appendChild(txt);
        tr.appendChild(th);
    });
    tr.style.background = "rgb(146, 216, 221)";
    thead.appendChild(tr);
    return thead;
}

function cuerpo(lista: any) {
    const tbody = document.createElement('tbody');
    let listaKey = Object.keys(lista[0]);
    listaKey.push("accion");
    lista.forEach(function (element: any) {
        const tr = document.createElement('tr');
        listaKey.forEach(function (key: any) {
            if (key == "accion") {
                let btnEliminar = document.createElement('button');
                let txtEliminar = document.createTextNode('Eliminar');
                btnEliminar.setAttribute('id', 'Eliminar');
                btnEliminar.appendChild(txtEliminar);
                btnEliminar.style.cssText = styleBtnEliminar;
                tr.appendChild(btnEliminar);
                agregarManejadorEliminar(btnEliminar);
                let btnModificar = document.createElement('button');
                let txtModificar = document.createTextNode('Modificar');
                btnModificar.setAttribute('id', 'Eliminar');
                btnModificar.appendChild(txtModificar);
                btnModificar.style.cssText = styleBtnModificar;
                tr.appendChild(btnModificar);
                agregarManejadorModificar(btnModificar);
            }else{
                const td = document.createElement('td');
                let txt = document.createTextNode(element[key]);
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

function agregarManejadorEliminar(btn: any) {
    let lista = JSON.parse(localStorage.getItem('lista') ?? "[]");
    if (btn) {
        btn.addEventListener('click', function (e: any) {
            let idCiudadanoSeleccionada = e.target.parentNode.dataset.id;
            for (let i = 0; i < lista.length; i++) {//recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i]._id == idCiudadanoSeleccionada) {
                    lista.splice(i,1);
                }
            }
            localStorage.setItem('lista', JSON.stringify(lista));
            console.log("ok");
            mostrarDatos(lista);
        });
    }
}

function agregarManejadorModificar(btn: any) {
    let lista = JSON.parse(localStorage.getItem('lista') ?? "[]");
    let nombre = <HTMLInputElement>document.getElementById('inputNombre');
    let apellido = <HTMLInputElement>document.getElementById('inputApellido');
    let edad = <HTMLInputElement>document.getElementById('inputEdad');
    let dni =  <HTMLInputElement>document.getElementById('inputDni');
    let pais = <HTMLSelectElement>document.getElementById('pais');
    let sexo = <any>document.getElementsByName('inputSexo');
    let agregar = <HTMLButtonElement>document.getElementById('btnAgregar');
    let guardar = <HTMLButtonElement>document.getElementById('btnGuardar');
    let frm = document.forms[0];
    if (btn) {
        btn.addEventListener('click', function (e: any) {
            let idCiudadanoSeleccionada = e.target.parentNode.dataset.id;
            for (let i = 0; i < lista.length; i++) {//recorro la lista con un FOR para saber la posicion de la persona
                if (lista[i]._id == idCiudadanoSeleccionada) {
                    agregar.disabled = true;
                    guardar.style.display = "initial";
                    abrirPopUp();
                    cargarDatosAlFormulario(lista[i]);
                    guardar.addEventListener("click",()=>{
                        lista[i]._nombre = nombre.value;
                        lista[i]._apellido = apellido.value;
                        lista[i]._edad = edad.value;
                        lista[i]._dni = dni.value;
                        lista[i]._pais = pais.value;
                        lista[i]._sexo = frm.inputSexo.value;
                        localStorage.setItem('lista', JSON.stringify(lista));
                    });
                }
            }
        });
    }
}

function cargarDatosAlFormulario(aux:any) {    
    let nombre = <HTMLInputElement>document.getElementById('inputNombre');
    let apellido = <HTMLInputElement>document.getElementById('inputApellido');
    let edad = <HTMLInputElement>document.getElementById('inputEdad');
    let dni =  <HTMLInputElement>document.getElementById('inputDni');
    let pais = <HTMLSelectElement>document.getElementById('pais');
    let sexo = <any>document.getElementsByName('inputSexo');
    nombre.value = aux._nombre;
    apellido.value = aux._apellido;
    edad.value = aux._edad;
    dni.value = aux._dni;
    pais.value = aux._pais;
    if(aux._sexo == "Femenino"){
        sexo[0].checked=true;
    }else {
        sexo[1].checked=true;
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

function calcularPromedioSeleccionado() {
    let select = <HTMLSelectElement>document.getElementById('selectSexo');
    let lista = JSON.parse(localStorage.getItem('lista') ?? "[]");
    let promedio = <HTMLInputElement>document.getElementById('inputPromedio');
    let listaFemenino = Array();
    let listaMasculino = Array();
    listaFemenino = lista.filter((item:any)=>item._sexo=="Femenino");
    listaMasculino = lista.filter((item:any)=>item._sexo=="Masculino");
    if(select.value == "Femenino"){
        let totalEdadFemenino:number = listaFemenino.reduce(function(total:number,valor:any) {
            return total+Number(valor._edad);
        },0);
        promedio.value = String(totalEdadFemenino/listaFemenino.length);
    } else if (select.value == "Masculino") {
        let totalEdadMasculino:number = listaMasculino.reduce(function(total:number,valor:any) {
            return total+Number(valor._edad);
        },0);
        promedio.value = String(totalEdadMasculino/listaMasculino.length);
    } else {
        let totalEdad = lista.reduce(function (total: number, valor: any) {
            return total + Number(valor._edad);
        }, 0);
        promedio.value = String(totalEdad / lista.length);
    }
    return promedio;
}

function filtrarPorEdadYSexo(){
    let lista = JSON.parse(localStorage.getItem('lista') ?? "[]");
    let select = <HTMLSelectElement>document.getElementById('selectFiltroSexo');
    let edad = <HTMLInputElement>document.getElementById('edadFilter');
    let listaFemenino = Array();
    let listaMasculino = Array();
    let divTabla = <HTMLElement>document.getElementById('divTablaFiltrada');
    divTabla.innerHTML = "";
    listaFemenino = lista.filter((item:any)=>item._sexo=="Femenino");
    listaMasculino = lista.filter((item:any)=>item._sexo=="Masculino");
    if(Number(edad.value) >= 0){
        if(select.value == "Femenino"){
            let listaFiltradaF = listaFemenino.filter((item:any)=>item._edad>=edad.value);
            divTabla.appendChild(crearTablaFiltro(listaFiltradaF));
        } else if (select.value == "Masculino") {
            let listaFiltradaM = listaMasculino.filter((item:any)=>item._edad>=edad.value);
            divTabla.appendChild(crearTablaFiltro(listaFiltradaM));
        } else {
            let listaFiltradaT = lista.filter((item:any)=>item._edad>=edad.value);
            divTabla.appendChild(crearTablaFiltro(listaFiltradaT));
        }
    }
}

function filtrarPorPais(){
    let lista = JSON.parse(localStorage.getItem('lista') ?? "[]");
    let pais = <HTMLSelectElement>document.getElementById('filtroPais');
    let divTabla = <HTMLElement>document.getElementById('divTablaFiltrada');
    divTabla.innerHTML = "";
    let listaFilter = lista.filter((item:any)=>item._pais==pais.value);
    if(listaFilter.length>0)
        return divTabla.appendChild(crearTablaFiltro(listaFilter));
}

function crearTablaFiltro(lista: any) {
    let tabla = <HTMLTableElement>document.createElement('table');
    if (lista.length > 0) {
       tabla.appendChild(cabeceraFiltro(lista[0]));
        tabla.appendChild(cuerpoFiltro(lista));
    }
    return tabla;
}

function cabeceraFiltro(item:any){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let listaKey = Object.keys(item);
    listaKey.forEach(function (key: any) {
        const th = document.createElement('th');
        let txt = document.createTextNode(key[0].toUpperCase()+key.slice(1));
        th.appendChild(txt);
        tr.appendChild(th);
    });
    tr.style.background = "rgb(146, 216, 221)";
    thead.appendChild(tr);
    return thead;
}

function cuerpoFiltro(lista: any) {
    const tbody = document.createElement('tbody');
    let listaKey = Object.keys(lista[0]);
    lista.forEach(function (element: any) {
        const tr = document.createElement('tr');
        listaKey.forEach(function (key: any) {
                const td = document.createElement('td');
                let txt = document.createTextNode(element[key]);
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