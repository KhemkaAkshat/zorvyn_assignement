const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo db connected successfully")
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;