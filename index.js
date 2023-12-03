const app = require('./server');
const config = require('./utils/config');
const { info, error } = require('./utils/logger');
const mongoose = require('mongoose')


//connect to the database

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        info("connected to mongo....")
        // make the server to listen for http requests
        app.listen(config.PORT, () => {
            info(`Server running at http://${config.HOSTNAME}:${config.PORT}`);
        });
    })
    .catch(() => {
        error('Error connecting..', error)
    })


