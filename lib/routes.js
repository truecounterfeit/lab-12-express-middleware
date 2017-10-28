'use strict';

// import the express app from server.js and add a bunch of express routes to it. then export to index.js
// need to import note.js so we can create notes
const Note = require('./note.js');
const app = require('./server.js');
const bodyParser = require('body-parser').json();
const sendMessage = require('./sendMessage');

let notes = {};
// possibly can use the express wildcard to get id from URL, like so:
        // /api/notes/:id
        // can then do req.url.id without needing to parse anything.

// GET /api/notes?uuid= get note by uuid
        // 404 if note is not found
        // 400 if no id was sent
        // 200 if note found.
app.get('/api/notes/:id', (req,res) => {
        console.log(req.params.id);

});

// POST /api/notes save new note w/ post body
        // 400 if no body was found or body was invalid
        // 200 if body was valid
app.post('/api/notes', bodyParser, (req, res) => {
    if (req.body['body'] == '') {
            sendMessage(res, 400, 'Please submit content alongside body=');
    } else if (Object.keys(req.body).length === 0) {
            sendMessage(res, 400, 'You did not post a body in your request. Please submit as "body="');
    } else {
            let newNote = new Note(req.body['body']);
            notes[newNote.id] = newNote;
            sendMessage(res, 200, 'Note created');
    }
});

// DELETE /api/notes?uuid= delete note by ID
        // 404 if note not found
        // 400 if no id sent
        // 200 if note deleted
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    if (!id) sendMessage(res, 400, 'Please send a ?uuid= parameter with your POST request');
        console.log('DELETE', req.params.id);
        res.end()
    if (Object.keys(req.params.id).length > 0) {
      if (typeof notes[req.params.id] === 'undefined'){
        // 404 if note not found
      sendMessage(res, 404, 'Not not found.');
      } else {
        // 200 if note deleted
        delete notes[req.params.id];
        sendMessage(res, 200, 'Note deleted.');
      }
    } else {
      // 404 if id not found
      sendMessage(res, 404, 'Please send a ?uuid= parameter with your POST request')
    }
});

module.exports = app;
