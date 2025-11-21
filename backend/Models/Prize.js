import mongoose from "mongoose";
const {Schema} = mongoose 

const PrizeSchema = new Schema({
    date: {
      type: String,
      required: true,
    },
    winners: {
      first: String,
      second: String,
      third: String
    }
});

const PrizeModel = mongoose.model("PrizeModel",PrizeSchema);

export default PrizeModel;