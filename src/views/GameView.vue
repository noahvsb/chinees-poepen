<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { calculateFormula, formulas } from '@/utils/formulas';
import { toQueryParams, parseQueryParams } from '@/utils/queryParams';

const route = useRoute();
const router = useRouter();

const data = parseQueryParams(route.query);

const options = Array.from({ length: data.amount + 1 }, (_, i) => i);

// ref

const guesses = ref(data.players.map(() => 0));
const gots = ref(data.players.map(() => 0));

// computed

const totalGuesses = computed(() => guesses.value.reduce((sum, g) => sum + g, 0));
const totalGots = computed(() => gots.value.reduce((sum, g) => sum + g, 0));

const canDoNext = computed(() => totalGuesses.value !== data.amount && totalGots.value === data.amount); // TODO

// button handling

function doNext() {
  updateAmount();

  updateScores();

  router.push({
    name: 'game',
    query: toQueryParams(data),
  });
}

function updateAmount() {
  data.amount += data.direction;

  if (data.amount == data.maxAmount) data.direction -= 2; // TODO: currently only 1 game is played at the max amount, change that once the setting is added
}

function updateScores() {
  for (let i = 0; i < data.players.length; i++) {
    const diff = Math.abs(guesses.value[i] - gots.value[i]);
    
    if (diff) data.scores[i] -= diff;
    else data.scores[i] += calculateFormula(data.formula, guesses.value[i]); 
  }
}
</script>

<template>
  <h1>chinees poepen - game</h1>
  
  <h2>amount of cards: {{ data.amount }}</h2>

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
        <td>{{ data.scores[index] }}</td>

        <td>
          <select v-model="guesses[index]">
            <option v-for="r in options" :key="r" :value="r">{{ r }}</option>
          </select>
        </td>

        <td>
          <select v-model="gots[index]">
            <option v-for="r in options" :key="r" :value="r">{{ r }}</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>

  <button :disabled="!canDoNext" @click="doNext">next</button>


  <h2>data (temporary)</h2>
  <p>Players: {{ data.players }}</p>
  <p>Max amount: {{ data.maxAmount }}</p>
  <p>Formula: {{ formulas[data.formula].label}}</p>
  <p>Current amount: {{ data.amount }}</p>
  <p>Scores: {{ data.scores }}</p>
  <p>Direction: {{ data.direction }}</p>

  <p>Total guesses: {{ totalGuesses }}</p>
  <p>Total gots: {{ totalGots }}</p>
</template>

<style scoped></style>