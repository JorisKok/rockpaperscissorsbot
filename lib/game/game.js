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
      'a': {
        'rock': [],
        'paper': [],
        'scissors': [],
      },
      'b': {
        'rock': [],
        'paper': [],
        'scissors': [],
      }
    };
  }

  /**
   * Vote rock, for choice a
   *
   * @param user
   */
  voteRockA(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.a.rock.push(user);
    }
  }

  /**
   * Vote rock, for choice b
   *
   * @param user
   */
  voteRockB(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.b.rock.push(user);
    }
  }

  /**
   * Vote paper, for choice a
   *
   * @param user
   */
  votePaperA(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.a.paper.push(user);
    }
  }

  /**
   * Vote paper, for choice b
   *
   * @param user
   */
  votePaperB(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.b.paper.push(user);
    }
  }


  /**
   * Vote scissors, for a
   *
   * @param user
   */
  voteScissorsA(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.a.scissors.push(user);
    }
  }

  /**
   * Vote scissors, for b
   *
   * @param user
   */
  voteScissorsB(user) {
    if (!this._hasAlreadyVoted(user)) {
      this._votes.b.scissors.push(user);
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
    if (this._votes.a.rock.includes(user) || this._votes.a.paper.includes(user) || this._votes.a.scissors.includes(user)) {
      return true;
    }

    if (this._votes.b.rock.includes(user) || this._votes.b.paper.includes(user) || this._votes.b.scissors.includes(user)) {
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
    // If nobody votes, we have a draw
    if (this._hasNoVotesA() && this._hasNoVotesB()) {
      return this._draw();
    }

    let a = this._getA();
    let b = this._getB();

    // B should always win when a has no votes
    if (this._hasNoVotesA()) {
      return this._winner('b', b);
    }

    // A should always win when b has no votes
    if (this._hasNoVotesB()) {
      return this._winner('a', a);
    }

    let winner = this._getWinningChoice(a, b);

    if (winner === 'a') {
      return this._winner('a', a);
    }

    if (winner === 'b') {
      return this._winner('b', b);
    }

    return this._draw();
  }

  /**
   * Return the draw result
   *
   * @returns {{result: string}}
   * @private
   */
  _draw() {
    return {
      'result': 'draw'
    };
  }

  /**
   * Return the winning result
   *
   * @param winner
   * @param type
   * @returns {{result: {winner: *, type: *}}}
   * @private
   */
  _winner(winner, type) {
    return {
      'result': {
        'winner': winner,
        'type': type,
      }
    };
  }

  /**
   * Did nobody vote for a?
   *
   * @returns {boolean}
   * @private
   */
  _hasNoVotesA() {
    let votes = this._votes.a;

    return votes.rock.length + votes.paper.length + votes.scissors.length === 0;
  }

  /**
   * Did nobody vote for b?
   *
   * @returns {boolean}
   * @private
   */
  _hasNoVotesB() {
    let votes = this._votes.b;

    return votes.rock.length + votes.paper.length + votes.scissors.length === 0;
  }

  /**
   * Get the winning type for a
   *
   * @returns {string}
   * @private
   */
  _getA() {
    return this._getWinningType(this._votes.a);
  }

  /**
   * Get the winning type for b
   * @returns {string}
   * @private
   */
  _getB() {
    return this._getWinningType(this._votes.b);
  }

  /**
   * Returns 'a', 'b' or 'draw' depending on the votes
   *
   * @param a
   * @param b
   * @returns {string}
   * @private
   */
  _getWinningChoice(a, b) {
    if (a === b) {
      return 'draw';
    }

    if (a === 'paper' && b === 'rock') {
      return 'a';
    }

    if (a === 'paper' && b === 'scissors') {
      return 'b';
    }

    if (a === 'rock' && b === 'paper') {
      return 'b';
    }

    if (a === 'rock' && b === 'scissors') {
      return 'a';
    }

    if (a === 'scissors' && b === 'rock') {
      return 'b';
    }

    if (a === 'scissors' && b === 'paper') {
      return 'a';
    }

    console.log('This should not happen!');
    console.log('a = '.a);
    console.log('b = '.b);

    return "draw";
  }

  /**
   * Get the winning type (rock, paper, scissors)
   * @returns {string}
   * @private
   */
  _getWinningType(votes) {
    let list = [
      ['rock', votes.rock.length],
      ['paper', votes.paper.length],
      ['scissors', votes.scissors.length],
    ];

    // Sort the list, so that in case the votes are the same, we pick a random vote
    // Else, in case there is no vote casted for a, it will always pick the top one (rock)
    // This is not covered in a test
    list = list.sort((_a, _b) => {
      return Math.random() - 0.5;
    });

    let keys = list.map(x => x[0]);
    let values = list.map(x => x[1]);

    // Get the winning index
    let index = values.indexOf(Math.max(...values));

    // Get the winning type (rock, paper, scissors)
    return keys[index];
  }

}

module.exports = Game;