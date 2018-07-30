import crypto from 'crypto'
import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

interface UserAttributes {
    id: string,
    username: string,
    password: string,
    email: string,
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes

const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
}

const User = db.define<UserInstance, UserAttributes>('User', attributes)

export default User
