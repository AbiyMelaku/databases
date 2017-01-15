// YOUR CODE HERE:
var app = {
  lastMessageId: 0,
  messages: [],
  friends: {},
  server: 'http://127.0.0.1:8000/classes/messages',
  roomname: 'lobby',
  username: 'anonymous',

  init: function() {
    // Get username
    app.username = window.location.search.substr(10);
    
    //adding our listeners
    $('#chats').on('click', '.username', app.handleUsernameClick);
    $('#send').on('submit', app.handleSubmit);
    $('#roomSelect').on('change', app.handleRoomChange);
    
    //fetch previous messages
    app.fetch(false);
    
    //fetching new messages on a interval
    setInterval(function() {
      app.fetch(true);
    }, 10000);
    

  },

  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        //clear the message input
        $('#message').val('');
        
        // Trigger a fetch to update the messages, (pass in true to animate)
        app.fetch();
        
        console.log('chatterbox:  Message sent ', data);
      },
      error: function(data) {
        console.log('Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: { order: '-createdAt' }, //not sure about this, //{order -created at} ?????
      success: function (data) {
        console.log('chatterbox: Message received', data); 
        
        // Don't bother if we have nothing to work with
        if (!data.results || !data.results.length) { return; }
        
        // Store messages for caching later
        app.messages = data.results;
        
        // Get the last message
        var mostRecentMessage = data.results[data.results.length - 1];
      
        // Only bother updating the DOM if we have a new message
        if (mostRecentMessage.objectId !== app.lastMessageId) {
          // Update the UI with the fetched rooms
          app.renderRoomList(data.results);

          // Update the UI with the fetched messages
          app.renderMessages(data.results); //invoke later with animate as well

          // Store the ID of the most recent message
          app.lastMessageId = mostRecentMessage.objectId;
        } 

      },
      error: function (data) {
        console.error('chatterbox: Failed to retrieve message(s)', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').html('');
  },

  renderMessage: function(message) {
    //create a div to hold the chat
    // var $username = $('<span class="username" onclick="app.handleUsernameClick(event)"/>');
    var $username = $('<span class="username"/>');
    var $chat = $('<div class="chat"></div>'); 
    
    $username.text(message.username + ': ').attr('data-roomname', message.roomname).attr('data-username', message.username).appendTo($chat);
    
    //adding to the friends class
    if (app.friends[message.username] === true) {
      $username.addClass('friend');
    }

    var $message = $('<br><span/>');
    $message.text(message.text).appendTo($chat);

    //adding chat to the user interface
    $('#chats').append($chat);

  
  },
  
  renderMessages: function(messages, animate) {
    // Clear existing messages
    app.clearMessages();
    
    if (Array.isArray(messages)) {
      // Add all fetched messages that are in our current room
      messages
        .filter(function(message) {
          return message.roomname === app.roomname ||
                 app.roomname === 'lobby' && !message.roomname;
        })
        .forEach(app.renderMessage);
    }

    // Make it scroll to the top
    if (animate) {
      $('body').animate({scrollTop: '0px'}, 'fast');
    }
  },
  

  renderRoom: function(roomname) {
    //preventing cross scripting attacks by escaping with methods from the DOM
    var $option = $('<option/>').val(roomname).text(roomname);
    $('#roomSelect').append($option);
  },
  
  renderRoomList: function(messages) {
    $('#roomSelect').html('<option value="__newRoom">New room...</option>');

    if (messages) {
      var rooms = {};
      messages.forEach(function(message) {
        var roomname = message.roomname;
        if (roomname && !rooms[roomname]) {
          // Add the room to the select menu
          app.renderRoom(roomname);

          // Store that we've added this room already
          rooms[roomname] = true;
        }
      });
    }

    // Select the menu option
    $('#roomSelect').val(app.roomname);
  },

  handleUsernameClick: function (event) {
    var username = $(event.target).data('username');
    console.log('Ive been clicked');
    console.log('username ', username);



    if (username !== undefined) {
      //Toggle add friend
      app.friends[username] = !app.friends[username];
      //checking username against XXS
      var selector = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';
      console.log('selector:  ', selector);
      var $usernames = $(selector).toggleClass('friend');
    }

    // $('.username').click( function () {
    //   $('.username').toggleClass('.friend');
    //   console.log('friend added');
    // });
  },
  
  handleRoomChange: function(event) {

    var selectIndex = $('#roomSelect').prop('selectedIndex');
    // New room is always the first option
    if (selectIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        // Set as the current room
        app.roomname = roomname;

        // Add the room to the menu
        app.renderRoom(roomname);

        // Select the menu option
        $('#roomSelect').val(roomname);
      }
    } else {
   
      // Store as undefined for empty names
      app.roomname = $('#roomSelect').val();
    }
    // Rerender messages
    app.renderMessages(app.messages);
  },

  handleSubmit: function(event) {
    var message = {
      username: app.username,
      text: $('#message').val(),
      roomname: app.roomname || 'lobby'
    };

    app.send(message);
    event.preventDefault();

  }

};

