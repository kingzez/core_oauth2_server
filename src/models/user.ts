import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

export interface UserAttributes {
    id?: string,
    email?: string,
    role?: number,
    phone?: string,
    site?: string,
    company?: string,
    isDelete?: boolean,
    inform?: boolean,
    isCloseAuto?: boolean,
    meta?: string,
    type?: number,
    balance?: number,
    discount?: number,
    contracPics?: string,
    licensePics?: string,
    level?: number,
    commission?: number,
    reward?: number,
    deposit?: number,
    performance?: number,
    createdAt?: number,
    updatedAt?: number,
    status?: boolean,
    creator?: string,
    parent?: string,
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes

const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    email: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.INTEGER,
    },
    phone: {
        type: Sequelize.STRING,
    },
    site: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    isDelete: {
        type: Sequelize.BOOLEAN,
    },
    inform: {
        type: Sequelize.BOOLEAN,
    },
    isCloseAuto: {
        type: Sequelize.BOOLEAN,
    },
    meta: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.INTEGER,
    },
    balance: {
        type: Sequelize.BIGINT,
    },
    discount: {
        type: Sequelize.INTEGER,
    },
    contracPics: {
        type: Sequelize.STRING,
    },
    licensePics: {
        type: Sequelize.STRING,
    },
    level: {
        type: Sequelize.INTEGER,
    },
    commission: {
        type: Sequelize.DOUBLE,
    },
    reward: {
        type: Sequelize.DOUBLE,
    },
    deposit: {
        type: Sequelize.BIGINT,
    },
    performance: {
        type: Sequelize.BIGINT,
    },
    status: {
        type: Sequelize.BOOLEAN,
    },
    creator: {
        type: Sequelize.UUID,
    },
    parent: {
        type: Sequelize.UUID,
    },
    createdAt: {
        type: Sequelize.BIGINT,
        defaultValue: function() {
            return Date.now()
        }
    },
    updatedAt: {
        type: Sequelize.BIGINT,
        defaultValue: function() {
            return Date.now()
        }
    },
}

const User = db.define<UserInstance, UserAttributes>('User', attributes, { tableName: 'User' })

User.sync({
    force: false
})

export default User
