import mongoose from "mongoose"

export function startDatabaseConnection () {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected succesfully')
}).catch((err)=> console.log(err))
}

