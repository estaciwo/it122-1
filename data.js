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

const getAll = () => {

  app.get('/api/albums', (req,res) => {
    Album.find({}).lean()
    .then((albums) => {
        res.render('home', {kitty: JSON.stringify(albums)});
      console.log("Testing albums");
    })
    .catch(err =>  {
        res.status(500).send('Database Error occurred');
    })
  });
};

const getItem = () => {
  app.get('/api/albums/:title', (req,res) => {
    
      Album.findOne({ title:req.params.title }).lean()
          .then((album) => {
            res.render('detail', { result: JSON.stringify(album) });
            console.log("Testing individual");
          })
          .catch(err => {
              res.status(500).send('Database Error occurred');
          });
  });
};

const addAlbum = () => {
  app.post('/api/albums', (req, res) => {
    const { title, artist, year, label } = req.body;
    const newAlbum = new Album({ title, artist, year, label });

    newAlbum.save()
      .then(album => {
        res.json(album);
      })
      .catch(err => {
        res.status(500).send('Album add failed');
      });
  });
};

const updateAlbum = () => {
  app.put('/api/albums/:id', (req, res) => {
    const albumId = req.params.id;
    const { title, artist, year, label } = req.body;

    Album.findById(albumId)
      .then(album => {
        if (!album) {
          return res.status(404).send('Album not found');
        }

        album.title = title;
        album.artist = artist;
        album.year = year;
        album.label = label;

        return album.save();
      })
      .then(updatedAlbum => {
        res.json(updatedAlbum + " updated!");
      })
      .catch(err => {
        res.status(500).send('Album update failed');
      });
  });
};

const deleteAlbum = () => {
  app.delete('/api/albums/:id', (req, res) => {
    const albumId = req.params.id;
    Album.findByIdAndDelete(albumId)
      .then(album => {
        if (!album) {
          return res.status(404).send('Album not found');
        }
        res.json({ message: 'Album deleted!', album });
      })
      .catch(err => {
        res.status(500).send('Album delete failed');
      });
  });
};

// export { createExp, getAll, getItem, addAlbum, updateAlbum, deleteAlbum };
