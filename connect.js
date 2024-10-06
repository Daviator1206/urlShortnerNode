const mongoose = require("mongoose")

async function connnectToMongoDb(url){
    return mongoose.connect(url)
}


module.exports = {connnectToMongoDb}