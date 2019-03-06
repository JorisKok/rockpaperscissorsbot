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
   * A message when the game has finished
   *
   * @return void
   */
  sayFinish(game) {
    if (game.result === 'Draw') {
      this._client.say(this._target, `It's a draw`);
      return;
    }

    this._client.say(this._target, `${game.result} voters won!`);
    this._client.say(this._target, `Winners: ${game.winners.join(', ')}`);
  }
}

module.exports = ChannelHandler;

