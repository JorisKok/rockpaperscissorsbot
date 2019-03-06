const Game = require('../game');

test('When a new game is started, votes are empty', () => {
  let game = new Game();
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [],
    'scissors': [],
  });
});

test('We can vote rock', () => {
  let game = new Game();
  game.voteRock('Pete1');
  expect(game._getVotes()).toEqual({
    'paper': [],
    'rock': [
      'Pete1'
    ],
    'scissors': [],
  });
});

test('We can vote paper', () => {
  let game = new Game();
  game.votePaper('Pete1');
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [
      'Pete1'
    ],
    'scissors': [],
  });
});

test('We can vote scissors', () => {
  let game = new Game();
  game.voteScissors('Pete1');
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [],
    'scissors': [
      'Pete1'
    ],
  });
});

test('Users cannot vote twice, when voting the same type', () => {
  let game = new Game();
  game.voteScissors('Pete1');
  game.voteScissors('Pete1');
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [],
    'scissors': [
      'Pete1'
    ],
  });
});

test('Users cannot vote twice, when voting on different types', () => {
  let game = new Game();
  game.votePaper('Pete1');
  game.voteRock('Pete1');
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [
      'Pete1'
    ],
    'scissors': [],
  });
});

test('We can finish a game', () => {
  let game = new Game();
  game.votePaper('Pete');
  game.votePaper('Jane');
  game.voteRock('Jeroen');
  expect(game.finish()).toEqual({
    'result': 'Paper wins',
    'winners': [
      'Pete',
      'Jane',
    ],
    'losers': [
      'Jeroen'
    ]
  })
});

test('When we finish a game, it resets the votes', () => {
  let game = new Game();
  game.votePaper('Pete');
  game.finish();
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [],
    'scissors': [],
  });
});

test('A game can end in a draw, when two end in the same (winning) score', () => {
  let game = new Game();
  game.voteRock('Pete');
  game.votePaper('Peter');
  expect(game.finish()).toEqual({
    'result': 'Draw',
  })
});

test('A game is not influenced when the losers end in a draw', () => {
  let game = new Game();
  game.voteRock('Pete');
  game.voteRock('Peter');
  game.votePaper('Jane');
  game.voteScissors('Anna');
  expect(game.finish()).toEqual({
    'result': 'Rock',
    'winners': [
      'Pete',
      'Peter'
    ],
    'losers': [
      'Jane',
      'Anna',
    ],
  })
});

test('A game can end in a draw, when all three are the same', () => {
  let game = new Game();
  game.voteRock('Pete');
  game.votePaper('Jane');
  game.voteScissors('Anna');
  expect(game.finish()).toEqual({
    'result': 'Draw',
  })
});

