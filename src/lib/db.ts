import Sequelize from 'sequelize'

const env = process.env.NODE_ENV || "development"
const { database, username, password,
        host, port, } = require('../config')[env]

const db = new Sequelize(database, username, password, {
	host,
	port,
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},
    logging: false,
})

db.authenticate().then(() => {
	console.log("  PG Connected")
}).catch((err) => {
	console.log(err)
})

export default db
