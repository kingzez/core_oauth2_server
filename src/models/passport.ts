import Sequelize from 'sequelize'
import db from '../lib/db'
import v4 from 'uuid'

import { md5Password } from '../util'

export interface PassportAttributes {
    id?: string,
    username: string,
    password: string,
    email: string,
    isDeleted?: boolean,
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
            this.setDataValue('password', md5Password(val))
        }

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    isDeleted: {
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

const Passport = db.define<PassportInstance, PassportAttributes>('Passports', attributes, { tableName: 'passport' })

Passport.sync({
    force: false
})

export default Passport

export async function findPassportByUsername(username: string) {
    let result = await Passport.findOne({
        where: {
            username,
            isDeleted: false
        }
    })

    return result
}

export async function findPassportByEmail(email: string) {
    let result = await Passport.findOne({
        where: {
            email,
            isDeleted: false
        }
    })

    return result
}

export async function insertPassport(doc: any) {
    let result = await Passport.create(
        doc
    )

    return result
}
