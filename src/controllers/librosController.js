var con = require('../config/conexion');
var libro = require('../model/libro');
var borrar = require('fs');
var path = require('path');

module.exports = {
    index: function (req, res) {
        libro.obtener(con, function (err, datos) {
            console.log(datos);
            res.render('libros/index', { title: 'Aplicación', libros: datos }); 
        });
    },
    


    crear: function (req, res) {
        res.render('libros/crear');
    },

    guardar: function (req, res) {
        var nombre = req.body.nombre;
        var archivo = req.file;
      
        if (!nombre && (!archivo || !archivo.filename)) {
            req.flash('error_msg', 'Debes proporcionar al menos un campo (nombre o archivo)');
            return res.redirect('/libros/crear');
          }
          
      
        if (archivo && archivo.filename) {
          console.log(archivo.filename);
        }
      
        libro.insertar(con, req.body, req.file, function (err) {
            req.flash('success_msg', 'Creacion de un nuevo libro');

          res.redirect('/libros'); 
        });
      },
      
    

    eliminar: function (req, res) {
        console.log('Recepción de datos');
        console.log(req.params.id);
    
        libro.retornarDatosID(con, req.params.id, function (err, registros) {
            if (registros && registros.length > 0) {
                var nombreImagen = registros[0].imagen;
    
                if (nombreImagen) {
                    var rutaImagen = path.join(__dirname, '../public/imagenes/', nombreImagen);
    
                    if (borrar.existsSync(rutaImagen)) {
                        borrar.unlinkSync(rutaImagen);
                    }
                }
    
                libro.borrar(con, req.params.id, function (err) {
                    req.flash('error_msg', 'Libro eliminado con éxito');

                    res.redirect('/libros');
                });
            } else {
                res.status(404).send('Libro no encontrado');
            }
        });
    },
    
    editar: function (req, res) {
        libro.retornarDatosID(con, req.params.id, function (err, registros) {
            console.log(registros[0]);
            res.render('libros/editar', { libro: registros[0] });
        });
    },
    actualizar: function (req, res) {
        console.log(req.body.nombre);
        let exito = true;
    
        if (req.body.nombre) {
            libro.actualizar(con, req.body, function (err) {
                if (err) {
                    req.flash('error_msg', 'Hubo un error al actualizar el libro');
                    exito = false;
                }
            });
        }
    
        if (req.file && req.file.filename) {
            libro.retornarDatosID(con, req.body.id, function (err, registros) {
                var nombreImagenAnterior = registros[0].imagen;
    
                if (nombreImagenAnterior) {
                    var rutaImagenAnterior = path.join(__dirname, '../public/imagenes/', nombreImagenAnterior);
    
                    if (borrar.existsSync(rutaImagenAnterior)) {
                        borrar.unlinkSync(rutaImagenAnterior);
                    }
                }
    
                libro.actualizarArchivo(con, req.body, req.file, function (err) {
                    if (err) {
                        req.flash('error_msg', 'Hubo un error al actualizar el libro');
                        exito = false;
                    }
                });
            });
        }
    
        if (exito) {
            req.flash('success_msg', 'El libro fue actualizado con éxito');
        }
    
        res.redirect('/libros');
    }
}