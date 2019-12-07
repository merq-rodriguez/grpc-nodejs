const grpc = require('grpc');
const uuidv1 = require('uuid/v1');
const environment = require('./config');

const PROTO_PATH = environment.PROTO_PATH;
const PORT = environment.PORT;
const HOST = environment.HOST;

const fighterProto = grpc.load(PROTO_PATH);

const warriors = [
  { id: '1', name: 'Ragnar', type: 'Viking' },
  { id: '2', name: 'Vyorn', type: 'Viking' }
]

const server = new grpc.Server()

listFighter = (_, callback) => callback(null, warriors)

saveFighter = (call, callback) => {
  let fighter = call.request
  fighter.id = uuidv1()
  warriors.push(fighter)
  callback(null, fighter)
}

updateFighter = (call, callback) => {
  let fighter = warriors.find((n) => n.id == call.request.id)
  if (fighter) {
    fighter.name = call.request.name
    fighter.type = call.request.type
    callback(null, fighter)
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Not found"
    })
  }
}

deleteFighter = (call, callback) => {
  let fighterIndex = warriors.findIndex((n) => n.id == call.request.id)
  if (fighterIndex != -1) {
    warriors.splice(fighterIndex, 1)
    callback(null, {})
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Not found"
    })
  }
}

server.addService(fighterProto.FighterService.service, {
  list: listFighter,
  save: saveFighter,
  update: updateFighter,
  delete: deleteFighter 
})

server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure())
console.log(`Server running at http://${HOST}:${PORT}`)
server.start()