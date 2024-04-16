import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

const students = [
  { name: "Daria", major: "science", id: 1 },
  { name: "Alfred", major: "economics", id: 2 },
]

app.get('/', (req, res) => {
  console.log(req.url)
  res.render('home', { students });
});

app.get('/students/:id', (req, res) => {
  let student = students.find(student => student.id == req.params.id)
  if (student) {
    res.send(`Info for student: ${student.name}`);
  }
});

app.get('/about', (req, res) => {
  console.log(req.url)
  res.send('This class is about making great web sites');
});

// define 404 handler
app.use((req, res) => {
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});
