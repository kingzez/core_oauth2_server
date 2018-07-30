module.exports = {
    development: {
        username: 'w',
        password: '',
        database: 'sso-server',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
    APP_NAME: '登录 小云营销'
}
