import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

interface AuthorizationCodeAttributes {
    id?: string,
    userId: string,
    clientId: string,
    code: string,
    redirectUri: string,
}

type AuthorizationCodeInstance = Sequelize.Instance<AuthorizationCodeAttributes> & AuthorizationCodeAttributes

const attributes: SequelizeAttributes<AuthorizationCodeAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    userId: {
        type: Sequelize.STRING,
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
}

const AuthorizationCode = db.define<AuthorizationCodeInstance, AuthorizationCodeAttributes>('AuthorizationCode', attributes)

export default AuthorizationCode
