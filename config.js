require('dotenv').config()

const environments = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    PROTO_PATH: './proto/fighter.proto'
}

module.exports = environments;
