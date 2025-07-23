import express from 'express'
import { startDatabaseConnection } from './utils/database.js'
import routes from './routs/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

startDatabaseConnection()
// Initialize routes
app.use(routes)
app.get('/', (req, res)=>{
    res.json({message:"Hello from server"})  
})

app.listen(process.env.PORT, ()=> console.log('Backend server started successfuly on port ',process.env.PORT))