import errorHandler from "errorhandler"

import app from './app'
import { SESSION_HOST, DB } from './config'
import logger from './util/logger'

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    logger.info(
        'Server is running at http://localhost:%d in %s mode',
        app.get("port"),
        app.get("env"),
    )

    logger.info('SESSION_HOST is', SESSION_HOST)
    logger.info(`DB host is ${DB.host}:${DB.port}; DB name is ${DB.database}`)
})

export default server
