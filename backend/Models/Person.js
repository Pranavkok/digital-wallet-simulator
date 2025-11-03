import mongoose from "mongoose"
const {Schema} = mongoose 

const PersonSchema = new Schema ({
    userName : {
        type : String ,
        required : true ,
        unique : true 
    },
    firstName : {
        type : String ,
        required : true ,
    },
    lastName : String ,
    password : {
        type : String ,
        required : true ,
    },

})

const PersonModel = mongoose.model("PersonModel",PersonSchema)
export default PersonModel