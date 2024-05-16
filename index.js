import express from "express";
import { Album } from "./models/Album.js";

const app = express();

import cors from 'cors';
app.use('/api', cors());

app.use(express.json());

const createExp = () => {
  app.set("port", process.env.PORT || 3000);
  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.listen(app.get("port"), () => {
    console.log("Express started");
  });
};

// everything above here is canon

// getAll - old version: 
// app.get('/', (req, res, next) => {
//   Album.find({}).lean()
//   .then((albums) => {
//     res.render('home', { albums });
//   })
//   .catch(err => next(err));
// });

// MAY15 - getAll API
const getAll = () => {
  app.get('/api/albums', (req,res) => {
    Album.find({}).lean()
    .then((albums) => {
        res.render('home', {albumData: JSON.stringify(albums)});
      console.log("Testing albums");
    })
    .catch(err =>  {
        res.status(500).send('Database Error occurred');
    })
  });
};

// MAY15 
// const getItem = () => {
//   app.get('/api/albums/', (req,res) => {
//       Album.findOne({ title:req.params.title }).lean()
//           .then((album) => {
//             res.render('home', { result: JSON.stringify(album) });
//             console.log("Testing individual");
//           })
//           .catch(err => {
//               res.status(500).send('Database Error occurred');
//           });
//   });
// };


// MAY15 - new upsert
// const upsertAlbum = () => {

//   const newAlbum = {'title':'Hip Harp', 'artist':'Dorothy Ashby', 'year': 1958, 'label': 'Prestige' }

//   Album.updateOne({ title: newAlbum.title}, newAlbum, {upsert:true})
//   .then(result => console.log(result))
//   .catch(err => console.log(err));
// }

// const deleteAlbum = () => {
//   app.delete('/api/albums/:id', (req, res) => {
//     const albumId = req.params.id;
//     Album.findByIdAndDelete(albumId)
//       .then(album => {
//         if (!album) {
//           return res.status(404).send('Album not found');
//         }
//         res.json({ message: 'Album deleted!', album });
//       })
//       .catch(err => {
//         res.status(500).send('Album delete failed');
//       });
//   });
// };

createExp();
getAll();
// getItem(); 
// upsertAlbum(); 
// deleteAlbum();
