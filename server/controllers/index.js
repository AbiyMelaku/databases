var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log("messages:get", req.body);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("messages:post", req.body);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('users, get', req.body);
    },
    post: function (req, res) {

      //get username
      var username = req.body.username; 
      console.log('users:post  ', req.body);
      models.users.post(username, function(err, data) {
        if (err) {
          throw err;
        }
        res.sendStatus(201); 
      });
    }
  }
};

