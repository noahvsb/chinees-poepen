/**
 * query parameters:
 * 
 * REQUIRED
 * 
 * players: list of player names
 * maxAmount: max amount of cards
 * formula: formula used to calculate score
 * 
 * OPTIONAL (only at the start):
 * 
 * amount: the current amount of cards
 * scores: the scores of all players
 * direction: the direction for the next amount (next amount = amount + direction)
 * 
 * on the finished screen, only players and scores are used
 */

// TODO: handle incorrect query params

export function toQueryParams(data, finished) {
  const queryparams = { ...data };

  queryparams.players = queryparams.players.join(',');
  queryparams.scores = queryparams.scores.join(',');

  return finished
    ? { players: queryparams.players, scores: queryparams.scores}
    : queryparams;
}

export function parseQueryParams(queryParams, finished) {
  const players = parseListParam(queryParams.players);
  const scores = parseListParam(queryParams.scores, true);

  return finished 
    ? { players, scores }
    : {
      players,
      maxAmount: Number(queryParams.maxAmount),
      formula: Number(queryParams.formula),
      amount: Number(queryParams.amount),
      scores,
      direction: Number(queryParams.direction),
    }
}

function parseListParam(listParam, isNumber) {
  const list = listParam.split(',');
  return isNumber ? list.map(Number) : list;
}