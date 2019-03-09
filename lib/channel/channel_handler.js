/**
 * Handles the interaction with the channel
 */
class ChannelHandler {
  constructor(client, target) {
    this._client = client;
    this._target = target;
  }

  /**
   * A message when the user has voted
   */
  sayVoted() {
    this._client.say(this._target, 'Vote received');
  }

  /**
   * A message when the game has started
   */
  sayStarted() {
    this._client.say(this._target, 'Vote for a with `!aRock`, `!aPaper`, `!aScissors` or for b with `!bRock`, `!bPaper`, `!bScissors`')
  }

  /**
   * A message when the game has finished
   *
   * @return void
   */
  sayFinish(game) {
    if (game.result === 'Draw') {
      this._client.say(this._target, `It's a draw`);
      return;
    }

    let winner = game.result.winner.charAt(0).toUpperCase() + game.result.winner.slice(1);

    this._client.say(this._target, `${winner} won with -> ${game.result.type}`);
  }
}

module.exports = ChannelHandler;

