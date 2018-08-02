import { v4 as uuidv4 } from 'uuid'

import logger from './logger'
import Passport from '../models/passport'
import Client from '../models/client'
import User from '../models/user'

const now:number = Date.now();

function exit() {
    setTimeout(() => {
        return process.exit()
    }, 2000);
}

// init Passport
(async() => {
    let user = await User.create({
        id: uuidv4(),
        email: "rmk@xiaoyun.com",
        site: "http://xiaoyun.com",
        createdAt: now,
        updatedAt: now,
    }).catch((err) => logger.debug(err))
    if (user) logger.debug('created: ' + JSON.stringify(user))

    const userInstance = JSON.parse(JSON.stringify(user))

    let admin = await Passport.create({
        id: uuidv4(),
        username: 'admin',
        userId: userInstance.id,
        password: 'admin',
        email: 'admin@xiaoyun.com',
        createdAt: now,
        updatedAt: now,
    }).catch((err) => logger.debug(err))
    if (admin) logger.debug('created: ' + JSON.stringify(admin))
})();


// init Client
(async() => {
    let rmk = await Client.create({
        id: uuidv4(),
        name: 'rmk',
        clientId: 'rmk',
        clientSecret: 'rmk',
        isTrusted: true,
        createdAt: now,
        updatedAt: now,
    }).catch((err) => logger.debug(err))
    if (rmk) logger.debug('created: ' + JSON.stringify(rmk))
    exit()
})();
