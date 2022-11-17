import mongoose, { trusted } from "mongoose";

const NewsSchema = mongoose.Schema({
  titles: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  banner: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  likes: {
    type: Array,
    require: true
  },
  comments: {
    type: Array,
    require: true
  }
})

const News = mongoose.model("News", NewsSchema)

export default News