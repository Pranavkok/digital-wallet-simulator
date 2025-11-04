import mongoose from "mongoose";
import { string } from "zod";

const {Schema} = mongoose

const accountSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "PersonModel"   
    },
    balance : {
        type : Number
    }
})

const AccountModel = mongoose.model("AccountSchema",accountSchema)

export default AccountModel