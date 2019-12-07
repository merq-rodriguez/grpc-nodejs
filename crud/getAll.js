const client = require('../connection/connect')

client.list({}, (error, fighters) => {
    if (!error) {
        console.log('successfully fetch List fighters')
        console.log(fighters)
    } else {
        console.error(error)
    }
})