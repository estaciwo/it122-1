import express from "express";
import { Album } from "./models/Album.js"; // added 4/21

const app = express();

const getAll = () => {

    app.get('/', (req, res, next) => {
        Album.find({}).lean()
          .then((albums) => {
            res.render('home', { albums });
          })
          .catch(err => next(err))
  });
};

const createExp = () => {
  app.set("port", process.env.PORT || 3000);
  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.listen(app.get("port"), () => {
    console.log("Express started");
  });
};

const getItem = () => {

  app.get("/albums/:title", (req,res,next) => {
      Album.findOne({ title:req.params.title }).lean()
          .then((album) => {
              res.render('detail', { result: album } );
          })
          .catch(err => next(err));
  });
};

export { createExp, getAll, getItem };
