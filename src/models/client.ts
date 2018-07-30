import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

export interface ClientAttributes {
    id: string,
    name: string,
    clientId: string,
    clientSecret: string,
    isTrusted: boolean,
}

type ClientInstance = Sequelize.Instance<ClientAttributes> & ClientAttributes

const attributes: SequelizeAttributes<ClientAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    clientId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    clientSecret: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isTrusted: {
        type: Sequelize.BOOLEAN,
    },
}

export const Client = db.define<ClientInstance, ClientAttributes>('Client', attributes)

// export default Client
