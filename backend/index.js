import express from "express"
import dotenv from "dotenv"
import ConnectDb from "./Utils/db.js"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
import authrouter from "./Routes/auth.route.js"
import accrouter from "./Routes/account.route.js"

const app = express()
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1/user',authrouter);
app.use('/api/v1/acc',accrouter);

await ConnectDb().then(()=>{
    app.listen(3000,()=>{
        console.log(`Server is running on port 3000`)
    })
  })
