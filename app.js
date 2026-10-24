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
