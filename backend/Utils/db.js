import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file "
    )
}

export default async function ConnectDb(){
    try {
        if(!process.env.MONGODB_URI){
            conosle.log("Please provide ulr of db")
            return ;
        }
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error)
    }
}