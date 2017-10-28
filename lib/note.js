'use strict';

const uuid = require('uuid');

//create the updateNote, fetchNote, and fetchIDs static methods as part of your Note model

function Note(content){
    this.id = uuid();
    this.date = new Date();
    this.content = content;
};

let newNote = new Note('hello');

module.exports = Note;
