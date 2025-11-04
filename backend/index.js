import express from "express"
import dotenv from "dotenv"
import ConnectDb from "./Utils/db.js"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
import authrouter from "./Routes/auth.route.js"
import accrouter from "./Routes/account.route.js"

const app = express()
const portNumber = process.env.PORT

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1/user',authrouter);
app.use('/api/v1/acc',accrouter);

await ConnectDb().then(()=>{
    app.listen(portNumber,()=>{
        console.log(`Server is running good `)
    })
  })
