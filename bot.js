require('dotenv').config();

const tmi = require('tmi.js');
const Game = require('./game');

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

let game = null;

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
      // client.say(target, `You are ${user}`);
      if (game == null) {
        game = new Game();
      }
      game.voteRock(user);
      console.log(`* Voted ${commandName}`);
      break;

    case 'paper':
      if (game == null) {
        game = new Game();
      }
      game.votePaper(user);
      console.log(`* Executed ${commandName} command`);
      break;

    case 'scissors':
      if (game == null) {
        game = new Game();
      }
      game.voteScissors(user);

      console.log(`* Executed ${commandName} command`);
      break;

    case 'finish':
      if (game == null) {
        game = new Game();
      }
      let result = game.finish();
      console.log(result);
    break;
    default:
      console.log(`* Unknown command ${commandName}`);
  }
}



// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}