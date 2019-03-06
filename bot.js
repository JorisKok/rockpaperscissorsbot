require('dotenv').config();

const tmi = require('tmi.js');
const GameHandler = require('./game_handler');
const ChannelHandler = require('./channel_handler');

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
  const commandName = msg.trim().slice(1);

  // Get the username
  let user = context.username;

  // If the command is known, let's execute it
  switch (commandName) {
    case 'rock':
      handler.startGameIfNotStartedYet();
      handler.voteRock(user);
      channel.sayVoted();
      break;

    case 'paper':
      handler.startGameIfNotStartedYet();
      handler.votePaper(user);
      channel.sayVoted();
      break;

    case 'scissors':
      handler.startGameIfNotStartedYet();
      handler.voteScissors(user);
      channel.sayVoted(target);
      break;
  }

  console.log(`Received msg: ${msg}`);
}



// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}