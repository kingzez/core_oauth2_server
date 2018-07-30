import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

interface AccessTokenAttributes {
    id?: string,
    token: string,
    userId: string,
    clientId: string,
}

type AccessTokenInstance = Sequelize.Instance<AccessTokenAttributes> & AccessTokenAttributes

const attributes: SequelizeAttributes<AccessTokenAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    clientId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}

const AccessToken = db.define<AccessTokenInstance, AccessTokenAttributes>('AccessToken', attributes)

export default AccessToken
