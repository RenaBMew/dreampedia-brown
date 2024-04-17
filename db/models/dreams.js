import { Schema } from "mongoose";

const DreamSchema = new Schema({
  date: {
    type: Date,
  },
  title: String,
  image: String,
  description: String,
  mood: String,
  analysis: String,
});

export default DreamSchema;
