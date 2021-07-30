"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ciudadano = /** @class */ (function (_super) {
    __extends(Ciudadano, _super);
    function Ciudadano(id, nombre, apellido, edad, dni, pais, sexo) {
        var _this = _super.call(this, id, nombre, apellido, edad) || this;
        _this._dni = dni;
        _this._pais = pais;
        _this._sexo = sexo;
        return _this;
    }
    Object.defineProperty(Ciudadano.prototype, "dni", {
        get: function () {
            return this._dni;
        },
        set: function (identificacion) {
            if (!identificacion) {
                throw new Error('dni invalido');
            }
            this._dni = identificacion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ciudadano.prototype, "pais", {
        get: function () {
            return this._pais;
        },
        set: function (country) {
            if (!country) {
                throw new Error('pais invalido');
            }
            this._pais = country;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ciudadano.prototype, "sexo", {
        get: function () {
            return this._sexo;
        },
        set: function (sex) {
            if (!sex) {
                throw new Error('sexo invalido');
            }
            this._sexo = sex;
        },
        enumerable: false,
        configurable: true
    });
    Ciudadano.prototype.ciudadanoToJson = function () {
        var persona = this.PersonaToString();
        //console.log(this.PersonaToString());//string
        //console.log(persona);//string json
        var ciudadano = JSON.parse(persona);
        ciudadano.dni = this.dni;
        ciudadano.pais = this.pais;
        ciudadano.sexo = this.sexo;
        return ciudadano; //object json
    };
    return Ciudadano;
}(Persona));
