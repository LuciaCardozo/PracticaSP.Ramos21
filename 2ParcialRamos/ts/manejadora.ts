class Manejadora implements EventListenerObject {
    public handleEvent(e: Event): void {
        let lista: any;
        let proximoId: any;
        let agregar = <HTMLElement>document.getElementById('btnAgregar');
        agregar.addEventListener("click", () => {
            altaVehiculo();
        });
        
        function altaVehiculo() {
            let nuevoVehiculo = agregarDatos();
            if (nuevoVehiculo) {
                proximoId = Number(obtenerId());
                lista = obtenerLista();
                lista.push(nuevoVehiculo);
                console.log(lista);
                proximoId++;
                guardarDatos();
                mostrarSeleccionados();
                cerrarPopUp();
            } else {
                alert("error");
            }
        }

        function agregarDatos() {
            let marca = <HTMLInputElement>document.getElementById('inputMarca');
            let modelo = <HTMLInputElement>document.getElementById('inputModelo');
            let precio = <HTMLInputElement>document.getElementById('inputPrecio');
            let tipo = <HTMLSelectElement>document.getElementById('select');
            let esCuatroXCuatro = <any>document.getElementsByName('cuatroXcuatro');
            let cantPuerta = <any>document.getElementsByName('cantPuertas');
            let es4x4 = esCuatroXCuatro[0].checked;
            let puertas = cantPuerta[0].checked;
            let nuevoVehiculo;
            proximoId = obtenerId();
            if (tipo.value == "Camioneta") {
                if (es4x4) {
                    nuevoVehiculo = new Camioneta(proximoId, marca.value, modelo.value,
                        Number(precio.value), es4x4);
                } else {
                    nuevoVehiculo = new Camioneta(proximoId, marca.value, modelo.value,
                        Number(precio.value), es4x4);
                }
            } else {
                if (puertas) {
                    puertas = "3";
                    nuevoVehiculo = new Auto(proximoId, marca.value, modelo.value,
                        Number(precio.value), puertas);
                } else {
                    puertas = "5";
                    nuevoVehiculo = new Auto(proximoId, marca.value, modelo.value,
                        Number(precio.value), puertas);
                }
            }
            return nuevoVehiculo;
        }

        function obtenerId() {
            let aux = localStorage.getItem('nextId');
            return aux ? JSON.parse(aux) : 0;
        }

        function obtenerLista() {
            let lista = localStorage.getItem('vehiculos');
            return lista ? JSON.parse(lista) : [];
        }

        function guardarDatos() {
            localStorage.setItem('vehiculos', JSON.stringify(lista));
            localStorage.setItem('nextId', proximoId);
        }
    }
}

window.addEventListener("load", new Manejadora);


