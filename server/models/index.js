var db = require('../db');
var request = require('request');


module.exports = {
  messages: {
    get: function (callback) {
      console.log('inside MODEL.MESSAGES.GET');
      var queryString = 'SELECT username, message, roomname FROM messages';
      db.query(queryString, function(err, results) {
        callback(err, results);
      });
    }, // a function which produces all the messages
    post: function (params, callback) {
      console.log('inside MODEL.MESSAGES.POST');
        //create querystring and pass qs to callback
      var queryString = 'INSERT INTO MESSAGES (message, username, roomname) VALUES (?,?,?)';
      db.query(queryString, params, function(err, data) {
        console.log('the query for MODEL.MeSSAGES.POST');
        callback(err, data);
      });
    
    }
  },   // a function which can be used to insert a message into the database

  users: {
    // Ditto as above.
    get: function (callback) {
      console.log('inside MODEL.USERS.GET');
      db.query('select * from users', function(err, data) {
        callback(err, results);
      });
    },
    post: function (message, callback) {
      console.log('inside MODEL.USER.POST');
      db.query('INSERT INTO USERS (username) VALUES(?)', message, function(err, data) {
        console.log('inside the QUERY of MODEL.USER.POST');
        callback(err, data);
      });
     
    }
  }
};

