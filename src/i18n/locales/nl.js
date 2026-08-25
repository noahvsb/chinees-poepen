export default {
  common: {
    backButton: "terug naar de tafel",
    name: "naam",
    score: "score",
  },
  home: {
    title: "setup",
    lede: "Voeg alle spelers toe en kies de gewenste settings voor je deelt.",
    players: {
      title: "spelers",
      playerName: "naam speler",
      noPlayers: "Nog geen spelers.",
      notEnoughPlayers: "Minstens 2 spelers nodig.",
    },
    settings: {
      title: "settings",
      peakAmount: "piek",
      peakAmountTooltip: "Het aantal kaarten per speler op het hoogste punt van het spel.",
      peakRounds: "piek rondes",
      peakRoundsTooltip: "Het aantal ronden die gespeeld worden op de piek, vooraleer het aantal kaarten terug daalt.",
      pointsFormula: "punten formule",
      pointsFormulaTooltip: "Het aantal punten verdiend bij een correcte gok.",
    },
    startButton: "start",
  },
  game: {
    title: "ronde {count}",
    info: {
      cardAmount: "kaart deze ronde | kaarten deze ronde",
      formula: "formule: ",
    },
    table: {
      guess: "gok",
      got: "slagen",
      totalGuesses: "totaal gegokt: ",
      totalGots: "totaal slagen: ",
    },
    nextButton: "next",
  },
  rules: {
    title: "regels",
    lede: "Zoals bij elk kaartspel zijn er veel manieren om chinees poepen te spelen, dit is mijn manier.",
    shape: {
      title: "de bedoeling van het spel",
      content: `Chinees poepen is een kaartspel waarbij je hand telkens met 1 kaart per keer toeneemt,
tot aan een piek die je vooraf instelt, en daarna weer afneemt tot 1 kaart.
Wie het kortste strootje trekt, deelt de eerste ronde.
De app vertelt altijd hoeveel kaarten je moet delen, je volgt gewoon de piramide op en af.`,
    },
    dealing: {
      title: "delen & troef",
      content: `Deel elke speler zijn kaarten voor de ronde.
Draai de volgende kaart van de stapel om, diens soort is de troef voor deze ronde.\n
Uitzondering: de piekronde wordt zonder troef gespeeld. Als je 3 piekrondes speelt, heeft alleen de middelste van de drie geen troef.`,
    },
    guessing: {
      title: "gokken",
      content1: `Voordat de eerste kaart gespeeld wordt, gokt iedereen hoeveel slagen ze zullen halen,
te beginnen bij de speler links van de deler.`,
      content2: `Er zit altijd iemand int zak: de gokken voor de ronde mogen nooit optellen tot het totale aantal gedeelde kaarten.
Dat betekent dat de deler, die als laatste gokt, soms minder keuze heeft.`,
      example: {
        title: "Voorbeeld: ",
        content: `het is de eerste ronde, dus iedereen heeft 1 kaart.
Als elke speler 0 gokt, mag de deler geen 1 zeggen, die moet verplicht 0 gokken.`,
      },
    },
    playing: {
      title: "ronde spelen",
      content1: "De speler links van de deler komt uit. Vanaf dan gelden er maar twee regels:",
      step1: {
        term: "Altijd volgen.",
        content: "Als je kan volgen, moet je volgen.",
      },
      step2: {
        term: "Tafel plakt.",
        content: "Eens gespeeld, ligt de kaart vast ;)",
      },
      content2: `Een slag wordt gewonnen door de hoogste kaart van de uitgekomen soort. 
Behalve als er troef gesmeten werd, in dat geval wint de hoogste troefkaart.
Daarna komt de winnaar de volgende slag uit.`,
    },
    scoring: {
      title: "puntentelling",
      content1: "Fout gegokt? Je verliest punten gelijk aan hoe ver je ernaast zat:",
      wrongFormula: "gok - behaald",
      content2: "Juist gegokt? Je scoort punten volgens de formule die werd ingesteld bij het aanmaken van het spel.",
    },
    optional: {
      title: "optioneel: blinde eerste en laatste ronde",
      content: `Om de rondes met 1 kaart spannender te maken, speel je ze blind:
hou uw kaart voor u zodat iedereen hem kan zien, behalve jezelf.`,
    }
  },
  finished: {
    title: "placement",
    homeButton: "home",
  },
  notFound: {
    lede: "pagina niet gevonden",
  },
  components: {
    peakStrip: {
      barTooltip: "ronde {round}, {count} kaart | ronde {round}, {count} kaarten",
      roundOf: "ronde {current} van {total}",
      peaksAt: "piek: {count} kaart | piek: {count} kaarten",
    },
  },
};