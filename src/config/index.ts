interface DBInterface {
    username: string,
    password: string,
    database: string,
    host: string,
    port: number,
    dialect: string,
}

export const DB: DBInterface = {
        username: process.env.DB_USERNAME || 'w',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'sso-server',
        host: process.env.DB_HOSTNAME || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
}

export const APP_NAME: string = '小云营销 登录'

export const SESSION_HOST: string = process.env.SESSION_HOST || 'http://10.11.3.137:11104'
