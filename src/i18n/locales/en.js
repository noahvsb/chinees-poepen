export default {
  common: {
    backButton: "back to the table",
    name: "name",
    score: "score",
  },
  home: {
    title: "setup",
    lede: "Add everyone playing, then set your custom settings before you deal.",
    players: {
      title: "players",
      playerName: "player name",
      noPlayers: "No players yet.",
      notEnoughPlayers: "At least 2 players are needed.",
    },
    settings: {
      title: "settings",
      peakAmount: "peak",
      peakAmountTooltip: "The number of cards each player holds at the highest point of the game.",
      peakRounds: "peak rounds",
      peakRoundsTooltip: "How many rounds are played at the peak before the hand size starts shrinking again.",
      pointsFormula: "points formula",
      pointsFormulaTooltip: "How many points are won when guessing correctly.",
    },
    startButton: "start",
  },
  game: {
    title: "round {count}",
    info: {
      cardAmount: "card this round | cards this round",
      formula: "formula: ",
    },
    table: {
      guess: "guess",
      got: "got",
      totalGuesses: "total guesses: ",
      totalGots: "total gots: ",
    },
    nextButton: "next",
  },
  rules: {
    title: "rules",
    lede: "Just like any other card game there are a ton of ways to play chinees poepen, this is my way (Frank Sinatra reference).",
    shape: {
      title: "the shape of the game",
      content: `Chinees poepen is a card game where your hand grows one card at a time,
up to a peak you set beforehand, then shrinks back down to a single card again.
Whoever draws the shortest straw deals the first round.
The app always tells you how many cards to deal, you're just following the pyramid up and back down.`,
    },
    dealing: {
      title: "dealing & trump",
      content: `Deal every player their cards for the round.
Flip the next card in the deck, its suit is trump for the round.\n
Exception: the peak round is played without trump. If you're playing 3 peak rounds, only the middle round of the three has no trump.`,
    },
    guessing: {
      title: "guessing",
      content1: `Before a single card is played, everyone guesses how many tricks they'll win,
starting with the player to the left of the dealer.`,
      content2: `To make it fun, we guarantee that at least one person is screwed over: the guesses for the round
can never add up to the total number of cards dealt. That means the
dealer, who guesses last, is sometimes locked out of an option.`,
      example: {
        title: "Example: ",
        content: `it's the first round, so everyone has 1 card.
If every player guesses 0, the dealer isn't allowed to guess 1, they're forced to guess 0 too.`,
      },
    },
    playing: {
      title: "playing tricks",
      content1: "The player to the left of the dealer leads the first trick. From there, only two rules matter:",
      step1: {
        term: "Follow suit.",
        content: "If you can match the suit that was led, you have to.",
      },
      step2: {
        term: "Table sticks.",
        content: "Once a card is played, it's played ;)",
      },
      content2: `The trick is won by the highest card of the suit that was led. 
Unless someone played trump, in which case the highest trump wins instead.
Then the person who won the trick leads the next one.`,
    },
    scoring: {
      title: "scoring",
      content1: "Guessed wrong? You lose points equal to how far off you were:",
      wrongFormula: "-|guess - got|",
      content2: "Guessed right? You score points using whatever formula was set when the game was created.",
    },
    optional: {
      title: "optional: blind first and last round",
      content: `To make the 1-card rounds more interesting, you can play them blind:
hold your card facing outward so everyone can see it except you.`,
    }
  },
  finished: {
    title: "final tally",
    homeButton: "home",
  },
  notFound: {
    lede: "page not found",
  },
  components: {
    peakStrip: {
      barTooltip: "round {round}, {count} card | round {round}, {count} cards",
      roundOf: "round {current} of {total}",
      peaksAt: "peaks at {count} card | peaks at {count} cards",
    },
  },
};