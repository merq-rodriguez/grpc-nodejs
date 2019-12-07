const client = require('../connection/connect')

let updateFighter = {
  id: '1',
  name: "Tyrion Lanyster",
  type: "pigmy"
}

client.update(updateFighter, (error, fighter) => {
  if (!error) 
    console.log('Fighter has been updated successfully', fighter)
  else 
    console.error(error)
})