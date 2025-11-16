import mongoose from "mongoose"
const {Schema} = mongoose 

const LotterySchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "PersonModel",
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
},{
    timestamps : true
})

const LotteryModel = mongoose.model("LotteryModel",LotterySchema)

export default LotteryModel