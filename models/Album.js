import mongoose from "mongoose";
const { Schema } = mongoose;
import { cs1 } from "../credentials.js";

// For security, connectionString should be in a separate file and excluded from git
const connectionString = cs1;

mongoose.connect(connectionString, {
  dbName: "sccdb",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  // console.log("Mongoose connected.");
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
// const bookSchema = new Schema({
//   title: { type: String, required: true },
//   author: String,
//   count: Number,
//   pubdate: Date,
//   inStore: Boolean,
// });

const albumSchema = new Schema({
 title: { type: String, required: true },
 artist: String,
 year: Date,
 label: String,
});

// export const Book = mongoose.model("Book", bookSchema, "it122-books");

export const Album = mongoose.model("Album", albumSchema);
