module.exports = {
    obtener: function (conexion, funcion) {
      conexion.query('SELECT * FROM libros', funcion);
    },
  
    insertar: function (conexion, datos, archivo, funcion) {
      if (archivo && archivo.filename) {
        conexion.query('INSERT INTO libros (nombre, imagen) VALUES (?, ?)', [datos.nombre, archivo.filename], funcion);
      } else {
        conexion.query('INSERT INTO libros (nombre) VALUES (?)', [datos.nombre], funcion);
      }
    },
  
    retornarDatosID: function (conexion, id, funcion) {
      conexion.query('SELECT * FROM libros WHERE id=?', [id], funcion);
    },
  
    borrar: function (conexion, id, funcion) {
      // Antes de borrar el libro, guarda su ID
      conexion.query('SELECT id FROM libros WHERE id=?', [id], function (error, resultados) {
        if (error) {
          funcion(error);
        } else {
          const libroId = resultados[0].id;
  
          // Borra el libro con el ID específico
          conexion.query('DELETE FROM libros WHERE id=?', [libroId], function (error) {
            if (error) {
              funcion(error);
            } else {
              // Recalcula los IDs de los libros restantes
              conexion.query('SET @count = 0');
              conexion.query('UPDATE libros SET libros.id = @count:= @count + 1');
              conexion.query('ALTER TABLE libros AUTO_INCREMENT = 1');
  
              funcion(null);
            }
          });
        }
      });
    },
  
    actualizar: function (conexion, datos, funcion) {
      conexion.query('UPDATE libros SET nombre=? WHERE id=?', [datos.nombre, datos.id], funcion);
    },
  
    actualizarArchivo: function (conexion, datos, archivo, funcion) {
      conexion.query('UPDATE libros SET imagen=? WHERE id=?', [archivo.filename, datos.id], funcion);
    }
  };
  