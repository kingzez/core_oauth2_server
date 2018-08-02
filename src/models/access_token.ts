import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

interface AccessTokenAttributes {
    id?: string,
    token: string,
    passportId: string,
    clientId: string,
    createdAt?: number,
    updatedAt?: number,
}

type AccessTokenInstance = Sequelize.Instance<AccessTokenAttributes> & AccessTokenAttributes

const attributes: SequelizeAttributes<AccessTokenAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    passportId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    clientId: {
        type: Sequelize.STRING,
        allowNull: false,
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

const AccessToken = db.define<AccessTokenInstance, AccessTokenAttributes>('AccessToken', attributes, { tableName: 'AccessToken' })

AccessToken.sync({
    force: true,
})

export default AccessToken
