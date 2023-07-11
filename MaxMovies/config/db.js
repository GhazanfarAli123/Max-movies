import mongoose from "mongoose";

const connectDb = async() =>{
    try{
        const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/maxmovies`)
        console.log("you are connect to" + {conn})
    }catch(err){
        console.log(err)
    }
}

export default connectDb;