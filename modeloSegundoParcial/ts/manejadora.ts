class Manejadora implements EventListenerObject{
    public handleEvent(evt:Event):void{
        evt.preventDefault();
        let lista: any;
        let proximoId: any;
        let agregar = <HTMLElement>document.getElementById('btnAgregar');
        agregar.addEventListener("click", (e) => {
            e.preventDefault();
           //console.log(agregarDatos(evt));
           alta();
        });
        
        function alta() {
            let nuevo = agregarDatos();
            if(nuevo) {
                proximoId = Number(obtenerId());
                lista = obtenerLista();
                lista.push(nuevo);
                //console.log(lista);
                proximoId++;
                guardarDatos();
                mostrarDatos(lista);
                cerrarPopUp();
            } else {
                alert("error");
            }
        }

        function agregarDatos(){
            let nombre = <HTMLInputElement>document.getElementById('inputNombre');
            let apellido = <HTMLInputElement>document.getElementById('inputApellido');
            let edad = <HTMLInputElement>document.getElementById('inputEdad');
            let dni =  <HTMLInputElement>document.getElementById('inputDni');
            let pais = <HTMLSelectElement>document.getElementById('pais');
            let sexo = <any>document.getElementsByName('inputSexo');
            let esMasculino = sexo[1].checked;
            let nuevo;
            proximoId = obtenerId();
            if (esMasculino){
                nuevo = new Ciudadano(proximoId,nombre.value,apellido.value,
                    Number(edad.value),Number(dni.value),pais.value,"Masculino");
            }else {
                nuevo = new Ciudadano(proximoId, nombre.value, apellido.value,
                    Number(edad.value),Number(dni.value),pais.value,"Femenino");
            }
            return nuevo;
        }

        function obtenerId() {
            let aux = localStorage.getItem('nextId');
            return aux ? JSON.parse(aux) : 0;
        }

        function obtenerLista() {
            let lista = localStorage.getItem('lista');
            return lista ? JSON.parse(lista) : [];
        }

        function guardarDatos() {
            localStorage.setItem('lista', JSON.stringify(lista));
            localStorage.setItem('nextId', proximoId);
        }
    }
}

window.addEventListener('load',new Manejadora);
