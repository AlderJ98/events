import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
)

export const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexión a la base de datos establecida correctamente.')
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error)
    }
}

export default sequelize
