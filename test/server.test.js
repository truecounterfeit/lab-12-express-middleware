'use strict';

const request = require('superagent');
const expect = require('expect');
const server = app.listen(3000);
const Storage = require('../lib/storage.js');

describe('POST Testing our storage, creating a new note', () => {
  it('Should correctly send contents to new file', done => {
    request.post('localhost:/3000', {contents: 'Hello Kelati'}, (err, res) => {
      
      done();
    });
  });

  it('Should throw an error if we do not send contents', done => {
    request.post('localhost:/3000', {}, (err, res), => {

      done();
    });
  });
});

describe('PUT/PATCH Testing', done => {
  // hello Kelati should be the only note we created so far
    const ID = Storage.fetchIds();

    it('Should update the note we made earlier', done => {
      request.patch(`localhost:3000/${ID[0]}`.send({contents: 'Not Hello Kelati Anynore'}).end((err, res) => {
        expect(res.text).toEqual(`Note Updated. New body of note ${ID}: Note Hello Kelati Anymore`);
        done();
      }));
    });

    it('Should return error if ID is incorrect', done => {
      request.patch(`localhost:3000/233224`).send({}).end((err, res) => {
        expect(res.text).toEqual('Note Not Found');
        done();
      });
    });
    
});

describe('GET Testing', done => {
  after(done => {
    server.close();
    done();
  })

  const ID = Storage.fetchIds();  
  it('Should return one note based upon ID', done => {
    request.get(`localhost:3000/${ID[0]}`).end((res, err) => {
      expect(res.text).toEqual();
      done();
    });
  })

  it('Should return a list of all notes, in this case 2 of them', done => {
    Storage.createNote({content: 'Hello Larry'});
    request.get('localhost:3000').end((res, end) => {
      expect().toEqual();
      done();
    });
  });
});
