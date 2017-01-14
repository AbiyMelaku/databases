var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('inside CONTROLLER.MESSAGES.GET');
      models.messages.get(function(err, results) {
        if (err) {
          throw err;
        }
        console.log('results in MODELS.MESSAGES.GET:  ', results);
        res.json(results);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('inside CONTROLLER.MESSAGES.POST');
      var params = [req.body.message, req.body.username, req.body.roomname];
      console.log('params:  ', params);
      models.messages.post(params, function(err, results) {
        if (err) {
          throw err;
        }
        res.sendStatus(201);
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('inside CONTROLLER.USERS.GET');
  
      models.users.get(function(err, results) {
        if (err) {
          throw err;
        }
        res.json(results);
      });
    },
    post: function (req, res) {
      console.log('inside CONTOLLER.USERS.POST');

      var username = req.body.username;
      models.users.post(username, function(err, data) {
        if (err) {
          throw err;
        }
        res.sendStatus(201);
      });
    }
  }
};

