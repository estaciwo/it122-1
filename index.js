import express from "express";
import { Album } from "./models/Album.js";
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

import cors from 'cors';
app.use('/api', cors());

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/detail', (req,res,next) => {
    Album.findOne({ title:req.query.title }).lean()
        .then((album) => {
            res.render('details', {result: album} );
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/api/v1/albums/:title', (req, res, next) => {
    let title = req.params.title;
    Album.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/albums', (req,res, next) => {
    Album.find({}).lean()
    .then((albums) => {
        res.json(albums);
    })
    .catch(err => next(err));
});

app.get('/api/v1/delete/:id', (req,res, next) => {
    Album.deleteOne({"_id":req.params.id }).lean()
    .then((result) => {
        res.json({"deleted": result});
    })
    .catch(err => next(err));
});

app.post('/api/v1/add/', (req,res, next) => {
    if (!req.body._id) { 
        Album.create(req.body).then(result => res.json(result))
        .catch(err => res.json({"error": err}));
    } else { 
        Album.updateOne({ _id: req.body._id}, req.body, {upsert:true})
        .then(result => res.json(result))
        .catch(err => res.json({"error": err}));
    }
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});


