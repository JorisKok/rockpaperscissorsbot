const Game = require('../game');

test('A game can be started', () => {
  let game = new Game();
  expect(game.start()).toEqual(true);
});

test('When starting a game, votes are empty', () => {
  let game = new Game();
  game.start();
  expect(game._getVotes()).toEqual({
    'rock': [],
    'paper': [],
    'scissors': [],
  });
});

test('We can vote rock', () => {
  let game = new Game();
  game.start();
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
  game.start();
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
  game.start();
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
  game.start();
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
  game.start();
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

test('A game can be finished', () => {
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
    'result': 'Rock wins',
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
