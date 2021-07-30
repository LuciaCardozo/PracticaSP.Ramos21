class Persona{
    private _id:number;
    private _nombre:string;
    private _apellido:string;
    private _edad:number;

    public constructor(id:number,nombre:string,apellido:string,edad:number){
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }

    public get id():number{
        return this._id;
    }

    public set id(id:number){
        if(!id){
            throw new Error('id invalido');
        }
        this._id = id;
    }
    
    public get nombre():string{
        return this._nombre;
    }

    public set nombre(name:string){
        if(!name){
            throw new Error('nombre invalido');
        }
        this._nombre = name;
    }

    public get apellido():string{
        return this._apellido;
    }

    public set apellido(lastname:string){
        if(!lastname){
            throw new Error('apellido invalido');
        }
        this._apellido = lastname;
    }

    public get edad():number{
        return this._edad;
    }
    
    public set edad(age:number){
        if(!age){
            throw new Error('edad invalido');
        }
        this._edad = age;
    }

    public PersonaToString():string{
        return `{"nombre":"${this.nombre}","apellido":"${this.apellido}","edad":"${this.edad}"}`;
       // return 'nombre:'+this.nombre+' '+'apellido:'+this.apellido+' '+'edad:'+this.edad;
    }
}