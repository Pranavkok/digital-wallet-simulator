import express from "express"
import dotenv from "dotenv"
import ConnectDb from "./Utils/db.js"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
import authrouter from "./Routes/auth.route.js"
import accrouter from "./Routes/account.route.js"
import gameRouter from "./Routes/game.route.js"

const app = express()
const portNumber = process.env.PORT

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.options("*", cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use('/api/v1/user',authrouter);
app.use('/api/v1/acc',accrouter);
app.use('/api/v1/game',gameRouter)

await ConnectDb().then(()=>{
    app.listen(portNumber,()=>{
        console.log(`Server is running good `)
    })
  })


//   tomorrow i want to add cron jobs -> where i will fetch /findWinners route at every 10am 