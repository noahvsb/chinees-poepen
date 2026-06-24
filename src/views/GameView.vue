<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { calculateFormula, formulas } from '@/utils/formulas';
import { parseQueryParams } from '@/utils/queryParams';

const route = useRoute();
const router = useRouter();

const data = parseQueryParams(route.query);

const canDoNext = computed(() => false); // TODO

function doNext() {
  // calculate new state

  // push next state to router

  // router.push({
  //   name: 'game',
  //   query: toQueryParams(
  //     data.players,
  //     data.rounds,
  //     data.formula,
  //     ...
  //   ),
  // });
}
</script>

<template>
  <h1>chinees poepen - game</h1>

  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>score</th>
        <th>guess</th>
        <th>got</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(player, index) in data.players" :key="index">
        <td>{{ player }}</td>
        <td>{{ data.playerScores[index] }}</td>
        <td>0</td> <!-- TODO: input --> 
        <td>0</td> <!-- TODO: input --> 
      </tr>
    </tbody>
  </table>

  <button :disabled="!canDoNext" @click="doNext">next</button>


  <h2>data (temporary)</h2>
  <p>Players: {{ data.players }}</p>
  <p>Rounds: {{ data.rounds }}</p>
  <p>Formula: {{ formulas[data.formula].label}}</p>
  <p>Current round: {{ data.currentRound }}</p>
  <p>Player scores: {{ data.playerScores }}</p>
  <p>Direction: {{ data.direction }}</p>
</template>

<style scoped></style>