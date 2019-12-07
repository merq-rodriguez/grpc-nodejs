const grpc = require('grpc');
const environment = require('../config');

const PORT = environment.PORT;
const HOST = environment.HOST;
const PROTO_PATH = environment.PROTO_PATH;

const FighterService = grpc.load(PROTO_PATH).FighterService;
const client = new FighterService(`${HOST}:${PORT}`, grpc.credentials.createInsecure())
module.exports = client;