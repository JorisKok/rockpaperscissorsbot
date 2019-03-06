## Twitch TV - Rock Paper Scissors Bot 

Start a rock, paper, scissors game in Twitch by using one of the following commands in a channel

- `!rock`
- `!paper`
- `!scissors`

#### How to use

- Install nodejs: https://nodejs.org/en/

- Install npm: https://www.npmjs.com/

- Install the npm modules
```
npm install
```

- Copy the `.env.example` file to `.env` and fill in your channel username and password (oauth token)
```
cp .env.example .env
```

- Start the bot with
```
node bot.js
```
- Grant access to the bot (replace <client_id> with the bots client id)
```
https://id.twitch.tv/oauth2/authorize?client_id=<CLIENT_ID>&redirect_uri=http://localhost&response_type=token&scope=chat:edit
```

It will listen to input from your channel

Have fun!