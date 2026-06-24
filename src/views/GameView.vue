<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { calculateFormula, formulas } from '@/utils/formulas';
import { parseQueryParams } from '@/utils/queryParams';

const route = useRoute();

const data = parseQueryParams(route.query);
</script>

<template>
  <h1>game</h1>
  <p>Players: {{ data.players }}</p>
  <p>Rounds: {{ data.rounds }}</p>
  <p>Formula: {{ formulas[data.formula].label}}</p>
  <p>Current round: {{ data.currentRound }}</p>
  <p>Player scores: {{ data.playerScores }}</p>
  <p>Direction: {{ data.direction }}</p>
</template>

<style scoped></style>