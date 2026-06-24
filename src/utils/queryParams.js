/**
 * query parameters:
 * 
 * REQUIRED
 * 
 * players: list of player names
 * rounds: total amount of rounds
 * formula: formula used to calculate score
 * 
 * OPTIONAL (only at the start):
 * 
 * currentRound: the current round
 * playerScores: the scores of all players
 * direction: the direction for the next round (new round = currentRound + direction) 
 */


export function toQueryParams(
  players,
  rounds,
  formula,
  currentRound,
  playerScores,
  direction,
) {
  if (currentRound === undefined) {
    currentRound = 1;
    playerScores = new Array(players.length).fill(0);
    direction = 1;
  }

  return {
    players: players.join(','),
    rounds,
    formula,
    currentRound,
    playerScores: playerScores.join(','),
    direction,
  }
}

export function parseQueryParams(queryParams) {
  return {
    players: parseListParam(queryParams.players),
    rounds: Number(queryParams.rounds),
    formula: Number(queryParams.formula),
    currentRound: Number(queryParams.currentRound),
    playerScores: parseListParam(queryParams.playerScores, true),
    direction: Number(queryParams.direction),
  }
}

function parseListParam(listParam, isNumber) {
  const list = listParam.split(',');
  return isNumber ? list.map(Number) : list;
}