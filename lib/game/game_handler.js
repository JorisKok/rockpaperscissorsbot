const Game = require('./game');

/**
 * Handles the game state
 * Like start and finishing when needed
 */
class GameHandler {
  constructor(finishGame, gameTime = 30) {
    this._game = null;
    this._gameTime = gameTime;
    this._finishGame = finishGame;
  }

  /**
   * Reset the game
   *
   * @private
   */
  _resetGame() {
    // Do not reset the timer and finishGame
    this._game = null;
  }

  /**
   * Start the game if it hasn't started yet
   */
  startGameIfNotStartedYet() {
    if (! this.isStarted()) {
      this._startGame();
    }
  }

  /**
   * Has the game started?
   *
   * @returns {boolean}
   */
  isStarted() {
    return this._game !== null;
  }

  /**
   * Starts the game
   *
   * @private
   */
  _startGame() {
    this._game = new Game();

    this._waitForGameToFinish().catch(() => {
      // TODO clean this up?
      // Do nothing for now
      console.log('CAUGHT');
    });
  }

  /**
   * Start the async program to finish the game
   *
   * @returns {Promise<void>}
   * @private
   */
  async _waitForGameToFinish() {
    await this._sleep(this._gameTime * 1000); // x 1000 for seconds

    // Call the closure that does an action when the game is finished
    this._finishGame();
  }

  /**
   * Vote rock, for choice a
   *
   * @param user
   */
  voteRockA(user) {
    this._game.voteRockA(user);

  }
  /**
   * Vote rock, for choice b
   *
   * @param user
   */
  voteRockB(user) {
    this._game.voteRockB(user);

  }

  /**
   * Vote paper, for choice a
   *
   * @param user
   */
  votePaperA(user) {
    this._game.votePaperA(user);
  }

  /**
   * Vote paper, for choice b
   *
   * @param user
   */
  votePaperB(user) {
    this._game.votePaperB(user);
  }

  /**
   * Vote scissors, for choice a
   *
   * @param user
   */
  voteScissorsA(user) {
    this._game.voteScissorsA(user);
  }
  /**
   * Vote scissors, for choice b
   *
   * @param user
   */
  voteScissorsB(user) {
    this._game.voteScissorsB(user);
  }

  /**
   * Finish the game
   *
   * @return Object
   */
  finish() {
    let result = this._game.finish();

    this._resetGame();

    return result;
  }

  /**
   * Sleep helper
   *
   * @param ms
   * @returns {Promise<any>}
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}

module.exports = GameHandler;

