import express from "express";

const app = express();

const albums = [
  { title: "A Love Supreme", artist: "John Coltrane", year: "1965", label: "Impulse!", id: 1},
  { title: "In Greenwich Village", artist: "Albert Ayler", year: "1967", label: "Impulse!", id: 2},
  { title: "Black Woman", artist: "Sonny and Linda Sharrock", year: "1969", label: "Vortex", id: 3},
  { title: "Unit Structures", artist: "Cecil Taylor", year: "1966", label: "Blue Note", id: 4 },
  { title: "A Monastic Trio", artist: "Alice Coltrane", year: "1968", label: "Impulse!", id: 5},
  { title: "Free Jazz", artist: "Ornette Coleman", year: "1961", label: "Atlantic", id: 6 }
];

const getAll = () => {
  app.get("/", (req, res) => {
    console.log(req.url);
    res.render("home", { albums });
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
  app.get("/albums/:id", (req, res) => {
    let album = albums.find((album) => album.id == req.params.id);
    if (album) {
      res.render("detail", { album });
    }
  });
};

export { createExp, getAll, getItem };
