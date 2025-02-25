import Role from '../models/role.js'

const getRoles = async (req, res) => {
    try {
        const role = await Role.findAll()
        if (role.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron roles'
            })
        }

        res.status(200).json({
            success: true,
            data: role
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los roles'
        })
    }
}

const createRole = async (req, res) => {
    const { name, description } = req.body

    try {
        const existingRole = await Role.findOne({ where: { name } })
        if (existingRole) {
            return res.status(400).json({
                success: false,
                message: 'El rol ya existe'
            })
        }

        const newRole = await Role.create({ name, description })
        res.status(201).json({
            success: true,
            message: `Rol ${newRole.name} creado satisfactoriamente`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el rol'
        })
    }
}

const updateRole = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body

    try {
        const role = await Role.findOne({
            where: {
                id: id
            }
        })

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Rol no encontrado'
            })
        }

        role.name = name
        role.description = description
        await role.save()

        res.status(200).json({
            success: true,
            message: `Rol ${role.name} actualizado satisfactoriamente`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el rol'
        })
    }
}

const deleteRole = async (req, res) => {
    const { id } = req.params

    try {
        const role = await Role.findOne({
            where: {
                id: id
            }
        })

        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Rol no encontrado'
            })
        }

        await role.destroy()

        res.status(200).json({
            success: true,
            message: `Rol ${role.name} eliminado satisfactoriamente`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el rol'
        })
    }
}

export { getRoles, createRole, updateRole, deleteRole }