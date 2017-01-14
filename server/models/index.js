var db = require('../db');
var request = require('request');


module.exports = {
  messages: {
    get: function () {
      console.log('inside get');
    }, // a function which produces all the messages
    post: function (message, callback) {
      console.log('inside post req');
        //create querystring and pass qs to callback
      db.query('INSERT INTO MESSAGES (message, userid, roomname) VALUES (?,?,?)', message, function(err, data) {
        console.log('got through to db');
        
        callback(err, data);
      
      });
    
    }
  },   // a function which can be used to insert a message into the database

  users: {
    // Ditto as above.
    get: function () {},
    post: function (message, callback) {

      db.query('INSERT INTO USERS (username) VALUES(?)', message, function(err, data) {
        callback(err, data);
      });
     
    }
  }
};

