// import { Book } from "./models/Book.js";

// // return all records
// console.log("step 1");
// Book.find({}).lean()
//   .then((books) => {
//     console.log(books);
//   })
//   .catch(err => console.log(err));


// console.log("step 3");


import { Album } from "./models/Album.js";

// return all records
// console.log("step 1");
Album.find({}).lean()
  .then((albums) => {
    console.log(albums);
  })
  .catch(err => console.log(err));


// console.log("step 3");