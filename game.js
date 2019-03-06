/**
 * Play a game of rock, paper, scissors
 */
class Game {
  constructor() {
    this._resetVotes();
  }

  /**
   * Reset the votes
   * @private
   */
  _resetVotes() {
    this._votes = {
      'rock': [],
      'paper': [],
      'scissors': [],
    };
  }

  /**
   * Vote rock
   *
   * @param user
   */
  voteRock(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.rock.push(user);
    }
  }

  /**
   * Vote paper
   *
   * @param user
   */
  votePaper(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.paper.push(user);
    }
  }

  /**
   * Vote scissors
   *
   * @param user
   */
  voteScissors(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.scissors.push(user);
    }
  }

  /**
   * Has already voted?
   *
   * @param user
   * @returns {boolean}
   * @private
   */
  _hasAlreadyVoted(user) {
    if (this._votes.rock.includes(user) || this._votes.paper.includes(user) || this._votes.scissors.includes(user)) {
      return true;
    }

    return false;
  }

  /**
   * Get the votes
   *
   * @returns {{rock: Array, scissors: Array, paper: Array}|*}
   * @private
   */
  _getVotes() {
    return this._votes;
  }

  /**
   * Finish the current game
   *
   * @return Object
   */
  finish() {
    let result = this._calculateResults();

    this._resetVotes();

    return result;
  }

  /**
   * The most votes on a type(rock, paper, scissors) wins
   *
   * @private
   *
   * @return Object
   */
  _calculateResults() {
    if (this._isDraw()) {
      return {
        'result': 'Draw'
      }
    }
    let winners = this._getWinners();
    let losers = this._getLosers();

    return {
      'result': this._getWinningTypeWithFirstCharCapitalized(),
      'winners': winners,
      'losers': losers,
    };
  }

  /**
   * Get the winners
   *
   * @returns {Array}
   * @private
   */
  _getWinners() {
    return this._votes[this._getWinningType()];
  }

  /**
   * Get the winning type (rock, paper, scissors)
   * @returns {string}
   * @private
   */
  _getWinningType() {
    let obj = {
      'rock': this._votes.rock.length,
      'paper': this._votes.paper.length,
      'scissors': this._votes.scissors.length,
    };

    let keys = Object.keys(obj);
    let values = Object.values(obj);

    // Get the winning index
    let index = values.indexOf(Math.max(...values));

    // Get the winning type (rock, paper, scissors)
    return keys[index];
  }

  /**
   * With a capitalized first character
   *
   * @returns {string}
   * @private
   */
  _getWinningTypeWithFirstCharCapitalized() {
    let winningType = this._getWinningType();

    return winningType.charAt(0).toUpperCase() + winningType.slice(1);
  }

  /**
   * Get the losers
   *
   * @returns {Array}
   * @private
   */
  _getLosers() {
    let winningType = this._getWinningType();
    // Combine the non-winning types into a losers array
    let result = [];
    for (let type in this._votes) {
      if (type !== winningType) {
        result = result.concat(this._votes[type]);
      }
    }

    return result;
  }

  /**
   * Check if a draw occurred
   *
   * @returns {boolean}
   * @private
   */
  _isDraw() {
    let counts = [
      this._votes.rock.length,
      this._votes.paper.length,
      this._votes.scissors.length,
    ];

    // What is the maximum number?
    let max = Math.max(...counts);

    // Does it occur twice or more?
    let occurrences = counts.reduce((n, x) => n + (x === max), 0);

    // It's a draw if the maximum count occurs more than once
    return occurrences > 1;
  }
}

module.exports = Game;