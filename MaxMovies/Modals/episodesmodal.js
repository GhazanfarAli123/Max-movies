import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    episode:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

export default mongoose.model("episodes",userSchema)