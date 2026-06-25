// Builds the ordered list of hand sizes for an entire game: rising from 1
// card up to peakAmount, holding there for peakRounds rounds, then falling
// back down to 1. e.g. buildPeakSequence(5, 2) -> [1,2,3,4,5,5,4,3,2,1]
export function buildPeakSequence(peakAmount, peakRounds) {
  const seq = [];

  for (let a = 1; a < peakAmount; a++) seq.push(a);
  for (let i = 0; i < peakRounds; i++) seq.push(peakAmount);
  for (let a = peakAmount - 1; a >= 1; a--) seq.push(a);

  return seq;
}

// Given the live game state (as produced by parseQueryParams), returns the
// index of the round currently being played within buildPeakSequence's
// output for the same peakAmount/peakRounds.
export function currentPeakIndex({ amount, direction, peakRoundsPlayed, peakAmount, peakRounds }) {
  if (direction === 1) return amount - 1;
  if (direction === 0) return peakAmount - 1 + peakRoundsPlayed;
  return peakAmount - 1 + peakRounds + (peakAmount - 1 - amount);
}