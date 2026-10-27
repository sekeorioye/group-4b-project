const express = require('express'); // Importing Express.js framework
require('dotenv').config(); // Importing dotenv to manage environment variables
const app = express(); // Importing Express.js and initializing the app

// JSON Parser Middleware
app.use(express.json());

//In-memory data storage for notes
 let notes=[
    {id:1,title:"Group Project", content:"Create a Node.js application", author:"Folaseke Orioye"},
    {id:2,title:"Group Project", content:"Create a Node.js application", author:"Folaseke Orioye"},
 ]

 // GET endpoint for retrieving all notes
app.get('/notes', (req, res) => {
   res.status(200).json(notes);
});

//GET endpoint for retrieving a specific note by ID
app.get('/notes/:id', (req, res) => {
  const note= notes.find(n => n.id === parseInt(req.params.id));
  if (!note){
   res.status(404).json({error: "Note does not exist"});
  }
  res.status(200).json(note);
});

//GET endpoint for retrieving a specific note by author
app.get('/notes/author/:author', (req, res) => {
  const noteAuthor= notes.find(n => n.author == req.params.author);
  if (!noteAuthor){
   return res.status(404).json({error: "Note does not exist"});
  }
  res.status(200).json(noteAuthor);
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

const PORT = process.env.PORT || 3000; // Setting the port from environment variable or default to 3000  
app.listen(PORT, () =>  console.log(`Server is running on port http://localhost:${PORT}`));
 