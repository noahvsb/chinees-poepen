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
 * scores: the scores of all players
 * direction: the direction for the next round (new round = currentRound + direction) 
 */

// TODO: handle incorrect query params

export function toQueryParams(
  players,
  rounds,
  formula,
  currentRound,
  scores,
  direction,
) {
  if (currentRound === undefined) {
    currentRound = 1;
    scores = new Array(players.length).fill(0);
    direction = 1;
  }

  return {
    players: players.join(','),
    rounds,
    formula,
    currentRound,
    scores: scores.join(','),
    direction,
  }
}

export function parseQueryParams(queryParams) {
  return {
    players: parseListParam(queryParams.players),
    rounds: Number(queryParams.rounds),
    formula: Number(queryParams.formula),
    currentRound: Number(queryParams.currentRound),
    scores: parseListParam(queryParams.scores, true),
    direction: Number(queryParams.direction),
  }
}

function parseListParam(listParam, isNumber) {
  const list = listParam.split(',');
  return isNumber ? list.map(Number) : list;
}