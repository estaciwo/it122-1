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

// MAY19
app.get('/', (req, res) => {
  res.render('home');
});

// MAY19
const getAll = () => {
  app.get('/api/albums', (req, res) => {
    Album.find({}).lean()
      .then((albums) => {
        res.json(albums);
        console.log("Getting albums");
      })
      .catch(err => {
        res.status(500).send('Database Error occurred');
      });
  });
};

// MAY19
const saveOrUpdateAlbum = () => {
  app.post('/api/albums', (req, res) => {
    const filter = { _id: req.body._id || new mongoose.Types.ObjectId() };
    const update = req.body;
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    Album.findOneAndUpdate(filter, update, options)
      .then(album => res.json(album))
      .catch(err => res.status(500).send('Database Error occurred'));
  });
};

const deleteAlbum = () => {
  app.delete('/api/albums/:id', (req, res) => {
    Album.findByIdAndDelete(req.params.id)
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send('Database Error occurred'));
  });
};

createExp();
getAll();
saveOrUpdateAlbum();
deleteAlbum();
