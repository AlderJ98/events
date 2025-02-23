import dotenv from 'dotenv'
import app from './app.js'
import { testConnection } from './config/database.js'

dotenv.config()

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await testConnection();
        console.log('Después de testConnection, iniciando servidor...');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

startServer()
