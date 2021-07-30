class Ciudadano extends Persona{
    private _dni:number;
    private _pais:string;
    private _sexo:string;

    public constructor(id:number,nombre:string,apellido:string,
        edad:number,dni:number,pais:string,sexo:string){
        super(id,nombre,apellido,edad);
        this._dni = dni;
        this._pais = pais;
        this._sexo = sexo;
    }

    public get dni():number{
        return this._dni;
    }

    public set dni(identificacion:number){
        if(!identificacion){
            throw new Error('dni invalido');
        }
        this._dni = identificacion;
    }

    public get pais():string{
        return this._pais;
    }

    public set pais(country:string){
        if(!country){
            throw new Error('pais invalido');
        }
        this._pais = country;
    }

    public get sexo():string{
        return this._sexo;
    }

    public set sexo(sex:string){
        if(!sex){
            throw new Error('sexo invalido');
        }
        this._sexo = sex;
    }

    public ciudadanoToJson():JSON{
        let persona = this.PersonaToString();
        //console.log(this.PersonaToString());//string
        //console.log(persona);//string json
        let ciudadano = JSON.parse(persona);
        ciudadano.dni = this.dni;
        ciudadano.pais = this.pais;
        ciudadano.sexo = this.sexo;
        return ciudadano;//object json
    }
}