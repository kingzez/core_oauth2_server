import errorHandler from "errorhandler"

import app from "./app"

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  Server is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env"),
    )

    console.log('  SESSION_HOST: ', process.env.SESSION_HOST)
    console.log("  Press CTRL-C to stop\n")
})

export default server
