import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movie: {
    type: String
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seasons"
  },
  countries: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "countries"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  },
  dateoflaunch: {
    type: String,
    required: true
  },
  imdb: {
    type: Number,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    required: true
  },
  gerneses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"gernses"
  }],
  tags:[{
    type:String,
    required:true
  }],
  slug: {
    type: String,
    lowercase: true,
  },

});

export default mongoose.model("seamov", userSchema);
