## Twitch TV - Rock Paper Scissors Bot 

Decide between two options, with a rock, paper, scissors game.

For example, choosing between map `cs_office` and `de_dust`.

Vote for `a` -> `cs_office`
- `!aRock`
- `!aPaper`
- `!aScissors`

Vote for `b` -> `de_dust`
- `!aRock`
- `!aPaper`
- `!aScissors`

The votes get counted on both choices, where the most chosen get's used to battle against the opposite side. 

##### Example
For `a`:

Let's say that there are 3 votes for `rock`, and 1 vote for `paper`, then `rock ` is the selected choice for `a`. 

For `b`:

Let's say that there are 2 votes for `paper`,  and 1 vote for `scissors`, then `paper` is the selected choice for `b`. 

Thus, `b` wins, because `paper` > `rock`. And the selected map is `de_dust`.


#### How to use

- Install nodejs: https://nodejs.org/en/

- Install npm: https://www.npmjs.com/

- Install the npm modules
```
npm install
```

- Copy the `.env.example` file to `.env` and fill in your channel username and password (oauth token) and other options
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