require('dotenv').config();

const tmi = require('tmi.js');
const GameHandler = require('./lib/game/game_handler');
const ChannelHandler = require('./lib/channel/channel_handler');

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: [
    process.env.CHANNEL
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//  TODO update readme

// The channel handler
let channel = new ChannelHandler(client, `#${process.env.CHANNEL}`);

// The game handler
let handler = new GameHandler(function() {
  // Send a message to the channel when finished
  channel.sayFinish(handler.finish());
}, process.env.FINISH_TIME);


// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // Get the username
  let user = context.username;

  // If the command is known, let's execute it
  switch (commandName) {
    case '!start':
      // Only the channel owner can start a game
      if (user === process.env.CHANNEL) {
        handler.startGameIfNotStartedYet();
        channel.sayStarted();
      }
      break;

    case '!aRock':
    case '!arock':
      if (handler.isStarted()) {
        handler.voteRockA(user);
        channel.sayVoted();
      }
      break;

    case '!aPaper':
    case '!apaper':
      if (handler.isStarted()) {
        handler.votePaperA(user);
        channel.sayVoted();
      }
      break;

    case '!aScissors':
    case '!ascissors':
      if (handler.isStarted()) {
        handler.voteScissorsA(user);
        channel.sayVoted();
      }
      break;
      
    case '!bRock':
    case '!brock':
      if (handler.isStarted()) {
        handler.voteRockB(user);
        channel.sayVoted();
      }
      break;

    case '!bPaper':
    case '!bpaper':
      if (handler.isStarted()) {
        handler.votePaperB(user);
        channel.sayVoted();
      }
      break;

    case '!bScissors':
    case '!bscissors':
      if (handler.isStarted()) {
        handler.voteScissorsB(user);
        channel.sayVoted();
      }
      break;
      
  }

  console.log(`Received msg: ${msg}`);
}



// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}