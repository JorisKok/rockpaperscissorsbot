const Game = require('../lib/game/game');

test('When a new game is started, votes are empty for choice a and b', () => {
  let game = new Game();
  expect(game._getVotes()).toEqual({
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
  });
});

test('We can vote rock, for a', () => {
  let game = new Game();
  game.voteRockA('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [
        'Pete'
      ],
      'paper': [],
      'scissors': [],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [],
    }
  });
});

test('We can vote rock, for b', () => {
  let game = new Game();
  game.voteRockB('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [],
      'scissors': [],
    },
    'b': {
      'rock': [
        'Pete'
      ],
      'paper': [],
      'scissors': [],
    }
  });
});

test('We can vote paper, for a', () => {
  let game = new Game();
  game.votePaperA('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [
        'Pete'
      ],
      'scissors': [],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [],
    }
  });
});

test('We can vote paper, for b', () => {
  let game = new Game();
  game.votePaperB('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [],
      'scissors': [],
    },
    'b': {
      'rock': [],
      'paper': [
        'Pete'
      ],
      'scissors': [],
    }
  });
});


test('We can vote scissors, for a', () => {
  let game = new Game();
  game.voteScissorsA('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [],
      'scissors': [
        'Pete'
      ],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [],
    }
  });
});

test('We can vote scissors, for b', () => {
  let game = new Game();
  game.voteScissorsB('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [],
      'scissors': [],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [
        'Pete'
      ],
    }
  });
});

test('Users cannot vote twice, when voting the same type', () => {
  let game = new Game();
  game.voteScissorsA('Pete');
  game.voteScissorsA('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [],
      'scissors': [
        'Pete'
      ],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [],
    }
  });
});

test('Users cannot vote twice, when voting the same type, but a different choice', () => {
  let game = new Game();
  game.voteScissorsA('Pete');
  game.voteScissorsB('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [],
      'scissors': [
        'Pete'
      ],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [],
    }
  });
});

test('Users cannot vote twice, when voting on different types', () => {
  let game = new Game();
  game.votePaperA('Pete');
  game.voteRockA('Pete');
  expect(game._getVotes()).toEqual({
    'a': {
      'rock': [],
      'paper': [
        'Pete'
      ],
      'scissors': [],
    },
    'b': {
      'rock': [],
      'paper': [],
      'scissors': [],
    }
  });
});

test('We can finish a game, paper a wins', () => {
  let game = new Game();
  game.votePaperA('Pete');
  game.votePaperA('Jane');
  game.voteRockB('Jeroen');
  expect(game.finish()).toEqual({
    'result': {
      'winner': 'a',
      'type': 'paper',
    }
  })
});

test('We can finish a game, rock b wins', () => {
  let game = new Game();
  game.voteScissorsA('Pete');
  game.voteRockB('Jeroen');
  expect(game.finish()).toEqual({
    'result': {
      'winner': 'b',
      'type': 'rock'
    }
  })
});

test('We can finish a game with a draw', () => {
  let game = new Game();
  game.voteScissorsA('Pete');
  game.voteRockA('John');
  game.voteRockA('Anne');
  game.voteRockB('Jeroen');
  expect(game.finish()).toEqual({
    'result': 'draw',
  })
});

test('When we finish a game, it resets the votes', () => {
  let game = new Game();
  game.votePaperA('Pete');
  game.finish();
  expect(game._getVotes()).toEqual({
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
  });
});


test('When there are only votes on side a, a wins', () => {
  let game = new Game();
  game.voteScissorsA('Pete');
  expect(game.finish()).toEqual({
    'result': {
      'winner': 'a',
      'type': 'scissors',
    }
  });
});

test('When there are only votes on side b, b wins', () => {
  let game = new Game();
  game.votePaperB('Pete');
  expect(game.finish()).toEqual({
    'result': {
      'winner': 'b',
      'type': 'paper',
    }
  });
});
