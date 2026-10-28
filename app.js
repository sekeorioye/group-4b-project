const express = require('express'); // Importing Express.js framework
require('dotenv').config(); // Importing dotenv to manage environment variables
const app = express(); // Importing Express.js and initializing the app
const swaggerUi = require('swagger-ui-express'); // Importing Swagger UI for documentation
const swaggerDocument = require('./swagger.json');

// JSON Parser Middleware
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//In-memory data storage for notes
 let notes=[
    {id:1,title:"Group Project", content:"Create a Node.js application", author:"Folaseke"},
    {id:2,title:"Group Project", content:"Create a Node.js application", author:"Folaseke"},
    {id:3,title:"Group Project", content:"Create a Node.js application", author:"Ifedayo"},
    {id:4,title:"Group Project", content:"Create a Node.js application", author:"Ifedayo"},
 ]

 // GET endpoint for retrieving all notes
app.get('/notes', (req, res) => {
   res.status(200).json(notes);
});
//GET endpoint for retrieving a specific note by author
app.get('/notes/author', (req, res) => {
  const noteAuthor= notes.filter(n => n.author == req.query.author);
  if ( noteAuthor.length === 0){
   return res.status(404).json({error: "Note does not exist"});
  }
  res.status(200).json(noteAuthor);
});

//GET endpoint for retrieving a specific note by ID
app.get('/notes/:id', (req, res) => {
  const note= notes.find(n => n.id === parseInt(req.params.id));
  if (!note){
  return  res.status(404).json({error: "Note does not exist"});
  }
  res.status(200).json(note);
});


//POST endpoint for creating a new note
 app.post('/notes', (req, res) => {
   const newNote = {id: notes.length +1, ...req.body};

   //Error handling for missing fields in the request body
   if(!newNote.title || !newNote.content || !newNote.author) 
   {
      return res.status(400).json({error: "Title, content, and author have not been provided"});
   }
   notes.push(newNote);
   res.status(201).json(newNote);
});

// PUT endpoint for updating an existing note by ID
app.put('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({error: "Note does not exist"});
  }
  Object.assign(note, req.body);
  res.status(200).json(note);
});

// DELETE endpoint for deleting a note by ID
app.delete('/notes/:id', (req, res) => {
   const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
   const note = notes[noteIndex];
   if (noteIndex === -1) {
     return res.status(404).json({error: "Note does not exist"});
   }
   notes.splice(noteIndex, 1);
   res.status(200).json({message: "Note deleted successfully"});
});

// Setting the port from environment variable or default to 3000  
const port = process.env.PORT || 3000; 

console.log("Environment PORT:", process.env.PORT);
console.log("Selected PORT:", port);
console.log("Starting server...");
// Starting the server and listening on the specified port
app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`)
);
 