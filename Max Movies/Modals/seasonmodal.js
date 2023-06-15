import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  episodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "episodes",
    required: true,
  }],
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("season", userSchema);
