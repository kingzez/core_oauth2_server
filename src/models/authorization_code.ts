import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

interface AuthorizationCodeAttributes {
    id?: string,
    passportId: string,
    clientId: string,
    code: string,
    redirectUri: string,
    createdAt?: number,
    updatedAt?: number,
}

type AuthorizationCodeInstance = Sequelize.Instance<AuthorizationCodeAttributes> & AuthorizationCodeAttributes

const attributes: SequelizeAttributes<AuthorizationCodeAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    passportId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    clientId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    redirectUri: {
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

const AuthorizationCode = db.define<AuthorizationCodeInstance, AuthorizationCodeAttributes>('AuthorizationCode', attributes, { tableName: 'AuthorizationCode' })

AuthorizationCode.sync({
    force: false
})


export default AuthorizationCode
