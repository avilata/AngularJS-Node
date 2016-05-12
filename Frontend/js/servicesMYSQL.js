function () {
    'use strict';
    var req = require('mysql');
    var connection = req.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "qwerty",
        database: "realmadrid"
    });
    var app = angular.module('services', []);

    app.service('halaService', function ($q) {
        var mysql = {};
        mysql.select = function () {
            return result(null, 'select * from player');
        };
        mysql.insert = function (data) {
            return result([data.nombre, data.responsable, data.fechaentrev,
              data.fechaentrada, data.seleccionado, data.dni,
              data.fechanac, data.sexo, data.puntualidad, data.presentacion,
              data.puestoaprop, data.nividiomas, data.adestacar,
              data.fechadisp], 'insert into player(nombre,responsable,fechaentrev,
                fechaentrada,seleccionado,dni,fechanac,sexo,puntualidad,presentacion,
              puestoaprop,nividiomas,adestacar,fechadisp) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        };
        mysql.update = function (data) {
            return result([data.nombre, data.responsable, data.fechaentrev,
              data.fechaentrada, data.seleccionado, data.dni,
              data.fechanac, data.sexo, data.puntualidad, data.presentacion,
              data.puestoaprop, data.nividiomas, data.adestacar,
              data.fechadisp, data.id], 'update player set nombre=?,responsable=?,fechaentrev=?,
              fechaentrada=?,seleccionado=?,dni=?,fechanac=?,sexo=?,
              puntualidad=?,presentacion=?,puestoaprop=?,nividiomas=?,adestacar=?,fechadisp=? where id=?');
        };
        mysql.delete = function (id) {
            var def = $q.defer();
            connection.query('delete from player where id=?', [id], function (err, res) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(res.affectedRows);
                }
            });
            return def.promise;
        };
        function result(param, query) {
            var def = $q.defer();
            connection.query(query, param, function (err, rows) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(rows);
                }
            });
            return def.promise;
        };
        return mysql;

    });

})();
