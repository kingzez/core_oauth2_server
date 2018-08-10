import crypto from 'crypto'
import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

export interface PassportAttributes {
    id?: string,
    username: string,
    password: string,
    email: string,
    isDelete?: boolean,
    createdAt?: number,
    updatedAt?: number,
}

type PassportInstance = Sequelize.Instance<PassportAttributes> & PassportAttributes

const attributes: SequelizeAttributes<PassportAttributes> = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: function() {
            return v4()
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(val) {
            let salt = ',tom'
            let hash = crypto.createHmac('md5', salt)
                             .update(val)
                             .digest('hex')
            this.setDataValue('password', hash)
        }

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: function() {
            return false
        }
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
    }
}

const Passport = db.define<PassportInstance, PassportAttributes>('Passports', attributes, { tableName: 'Passport' })

Passport.sync({
    force: false
})

export default Passport
