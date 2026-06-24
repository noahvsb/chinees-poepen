import { formulas } from '@/utils/formulas';

/**
 * query parameters:
 * 
 * players: list of player names
 * peakAmount: the amount of cards at the peak
 * peakRounds: the amount of rounds at the peak
 * formulaIndex: index of the formula used to calculate score
 * amount: the current amount of cards
 * scores: the scores of all players
 * direction: the direction for the next amount (next amount = amount + direction)
 * peakRoundsPlayed: the amount of rounds played at the peak
 * 
 * on the finished screen, only players and scores are used
 */

export function toQueryParams(data, finished) {
  // no error handling here, since my code is supposed to be flawless (TODO: write tests so I know it's flawless)

  const queryparams = { ...data };

  queryparams.players = queryparams.players.join(',');
  queryparams.scores = queryparams.scores.join(',');

  return finished
    ? { players: queryparams.players, scores: queryparams.scores }
    : queryparams;
}

export function parseQueryParams(queryParams, finished) {
  const players = parseListParam(queryParams.players);
  const scores = parseListParam(queryParams.scores, true);

  const playersError = validatePlayers(players);
  if (playersError) return { error: playersError };

  const scoresError = validateScores(scores, players);
  if (scoresError) return { error: scoresError };

  if (finished) {
    return { players, scores };
  }

  const peakAmount = Number(queryParams.peakAmount);
  const peakRounds = Number(queryParams.peakRounds);
  const formulaIndex = Number(queryParams.formulaIndex);
  const amount = Number(queryParams.amount);
  const direction = Number(queryParams.direction);
  const peakRoundsPlayed = Number(queryParams.peakRoundsPlayed);

  const peakAmountError = validatePeakAmount(peakAmount);
  if (peakAmountError) return { error: peakAmountError };

  const peakRoundsError = validatePeakRounds(peakRounds);
  if (peakRoundsError) return { error: peakRoundsError };

  const formulaIndexError = validateformulaIndex(formulaIndex);
  if (formulaIndexError) return { error: formulaIndexError };

  const amountError = validateAmount(amount, peakAmount);
  if (amountError) return { error: amountError };

  const directionError = validateDirection(direction);
  if (directionError) return { error: directionError };

  const peakRoundsPlayedError = validatePeakRoundsPlayed(peakRoundsPlayed, peakRounds, amount, peakAmount);
  if (peakRoundsPlayedError) return { error: peakRoundsPlayedError };

  return {
    players,
    peakAmount,
    peakRounds,
    formulaIndex,
    amount,
    scores,
    direction,
    peakRoundsPlayed,
  };
}

function parseListParam(listParam, isNumber) {
  if (!listParam) return [];
  const list = listParam.split(',');
  return isNumber ? list.map(Number) : list;
}

function validatePlayers(players) {
  if (players.length < 2) return 'invalid players: at least 2 players are required';
  if (!players.every((p) => p.trim().length > 0)) return 'invalid players: player names cannot be empty';
  return null;
}

function validateScores(scores, players) {
  if (scores.length !== players.length) return 'invalid scores: amount of scores does not match amount of players';
  if (!scores.every((s) => !Number.isNaN(s))) return 'invalid scores: scores must be numbers';
  return null;
}

function validatePeakAmount(peakAmount) {
  if (!Number.isInteger(peakAmount) || peakAmount <= 0) return 'invalid peakAmount: must be a positive integer';
  return null;
}

function validatePeakRounds(peakRounds) {
  if (!Number.isInteger(peakRounds) || peakRounds <= 0) return 'invalid peakRounds: must be a positive integer';
  return null;
}

function validateformulaIndex(formulaIndex) {
  if (!Number.isInteger(formulaIndex) || formulaIndex < 0 || formulaIndex >= formulas.length) {
    return `invalid formulaIndex: must be an integer between 0 and ${formulas.length - 1}`;
  }
  return null;
}

function validateAmount(amount, peakAmount) {
  if (!Number.isInteger(amount) || amount < 1) return 'invalid amount: must be a positive integer';
  if (amount > peakAmount) return 'invalid amount: cannot exceed peakAmount';
  return null;
}

function validateDirection(direction) {
  if (direction > 1 || direction < -1) return 'invalid direction: must be 1, 0 or -1';
  return null;
}

function validatePeakRoundsPlayed(peakRoundsPlayed, peakRounds, amount, peakAmount) {
  if (!Number.isInteger(peakRoundsPlayed) || peakRoundsPlayed < 0) {
    return 'invalid peakRoundsPlayed: must be a non-negative integer';
  }
  if (peakRoundsPlayed > peakRounds) return 'invalid peakRoundsPlayed: cannot exceed peakRounds';
  if (amount !== peakAmount && peakRoundsPlayed !== 0) {
    return 'invalid peakRoundsPlayed: must be 0 when amount is not at peakAmount';
  }
  return null;
}