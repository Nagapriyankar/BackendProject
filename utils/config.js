require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME

module.exports = {
    MONGODB_URI,
    PORT,
    HOSTNAME
}
