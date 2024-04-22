import mongoose from "mongoose";
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString =
  "mongodb+srv://staciwo:NgXJmknZhy0yLw7V@sccdb.6huhvk3.mongodb.net/?retryWrites=true&w=majority&appName=sccdb";

mongoose.connect(connectionString, {
  dbName: "sccdb",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log("Mongoose connected.");
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  count: Number,
  pubdate: Date,
  inStore: Boolean,
});

// const albumSchema = new Schema({
//  title: { type: String, required: true },
//  artist: String,
//  year: Date,
//  label: Number,
//  id: Number
// });

export const Book = mongoose.model("Book", bookSchema, "it122-books");

// export const Album = mongoose.model("Album", albumSchema);
