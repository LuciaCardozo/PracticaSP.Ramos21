"use strict";
var Persona = /** @class */ (function () {
    function Persona(id, nombre, apellido, edad) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }
    Object.defineProperty(Persona.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            if (!id) {
                throw new Error('id invalido');
            }
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (name) {
            if (!name) {
                throw new Error('nombre invalido');
            }
            this._nombre = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "apellido", {
        get: function () {
            return this._apellido;
        },
        set: function (lastname) {
            if (!lastname) {
                throw new Error('apellido invalido');
            }
            this._apellido = lastname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "edad", {
        get: function () {
            return this._edad;
        },
        set: function (age) {
            if (!age) {
                throw new Error('edad invalido');
            }
            this._edad = age;
        },
        enumerable: false,
        configurable: true
    });
    Persona.prototype.PersonaToString = function () {
        return "{\"nombre\":\"" + this.nombre + "\",\"apellido\":\"" + this.apellido + "\",\"edad\":\"" + this.edad + "\"}";
        // return 'nombre:'+this.nombre+' '+'apellido:'+this.apellido+' '+'edad:'+this.edad;
    };
    return Persona;
}());
