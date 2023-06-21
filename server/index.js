// Importación de módulos
import "dotenv/config.js"; // Carga variables de entorno desde un archivo .env
import express from "express"; // Framework de aplicaciones web
import morgan from "morgan"; // Middleware para el registro de solicitudes HTTP
import cors from "cors"; // Middleware para habilitar la comunicación entre dominios diferentes
import helmet from "helmet"; // Middleware para la seguridad de la aplicación
import mongoose from "mongoose"; // ODM (Object-Document Mapping) para MongoDB
import { createConnection } from "./database.js"; // Importación de una función para crear una conexión a la base de datos

const app = express(); // Creación de una instancia de la aplicación Express

app.use(morgan("dev")); // Utiliza el middleware "morgan" con la configuración "dev" para el registro de solicitudes HTTP
app.use(cors()); // Utiliza el middleware "cors" para habilitar la comunicación entre dominios diferentes
app.use(helmet()); // Utiliza el middleware "helmet" para la seguridad de la aplicación
app.use(express.json()); // Parsea las solicitudes entrantes con formato JSON

// Ruta para verificar la conexión a la base de datos MySQL
app.get("/check-mysql-connection", async (_req, res) => {
  const conn = createConnection(); // Crea una conexión a la base de datos MySQL utilizando la función "createConnection"

  conn.connect((err) => {
    if (err) {
      // Si hay un error al conectar a la base de datos MySQL
      return res.status(500).json({
        message: "Error al conectar con la base de datos",
      });
    } else {
      // Si la conexión a la base de datos MySQL es exitosa
      return res.status(200).json({
        message: "Conexión exitosa",
      });
    }
  });
});

// Ruta para verificar la conexión a la base de datos MongoDB
app.get("/check-mongodb-connection", async (_req, res) => {
  try {
    await mongoose.connect(
      // Conecta a la base de datos MongoDB utilizando el módulo "mongoose"
      "mongodb://seba:password@databaseMongo:27017/miapp?authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Conexión exitosa a MongoDB");
    res.status(200).json({ message: "Conexión exitosa a MongoDB" });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    res.status(500).json({ message: "Error al conectar a MongoDB" });
  }
});

// Inicia el servidor en el puerto especificado en la variable de entorno "PORT"
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
