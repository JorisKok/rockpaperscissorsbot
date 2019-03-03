require('dotenv').config();

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: [
    'twitchmedia4',
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  console.log(target);
  console.log(context);
  console.log(msg);
  console.log(self);
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  switch (commandName) {
    case '!rock':
      console.log(`* Executed ${commandName} command`);
      break;
    case '!paper':
      console.log(`* Executed ${commandName} command`);
      break;
    case '!scissors':
      console.log(`* Executed ${commandName} command`);
      break;

    default:
      console.log(`* Unknown command ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}