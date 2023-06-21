// Importa el módulo mysql2 que proporciona una interfaz para interactuar con bases de datos MySQL.
import mysql2 from 'mysql2'

// Función para crear una conexión a la base de datos MySQL.
function createConnection () {
  // Crea una conexión utilizando los valores de las variables de entorno o los valores predeterminados.
  const connection = mysql2.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'test'
  })

  return connection
}

// Función asincrónica para crear una tabla en la base de datos.
async function createTable () {
  // Consulta SQL para crear una tabla llamada 'productos' si no existe.
  const sql = `
    CREATE TABLE IF NOT EXISTS productos (
      id INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(100) NOT NULL,
      precio FLOAT NOT NULL,
      PRIMARY KEY (id)
    )
  `
  // Crea una conexión utilizando la función 'createConnection'.
  const conn = createConnection()
  
  // Ejecuta la consulta SQL en la conexión utilizando el método 'query' de la librería 'mysql2' con soporte para promesas.
  return await conn.promise().query(sql)
}

// Exporta las funciones 'createConnection' y 'createTable' para que puedan ser utilizadas en otros archivos.
export { createConnection, createTable }
