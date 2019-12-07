const client = require('../connection/connect')

let newFighter = {
    name: "John Snow",
    type: "Targarien"
}

client.save(newFighter, (error, fighter) => {
    if (!error)
       console.log('New fighter created successfully', fighter)
    else 
       console.error(error)
})