<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { calculateFormula, formulas } from '@/utils/formulas';
import { toQueryParams, parseQueryParams } from '@/utils/queryParams';

const route = useRoute();
const router = useRouter();

// computed

const data = computed(() => parseQueryParams(route.query));

const options = computed(() => Array.from({ length: data.value.amount + 1 }, (_, i) => i));

const totalGuesses = computed(() => guesses.value.reduce((sum, g) => sum + g, 0));
const totalGots = computed(() => gots.value.reduce((sum, g) => sum + g, 0));

const canDoNext = computed(() => totalGuesses.value !== data.value.amount && totalGots.value === data.value.amount);

// ref

const guesses = ref(data.value.error ? [] : data.value.players.map(() => 0));
const gots = ref(data.value.error ? [] : data.value.players.map(() => 0));

// watch

watch(data, (newData) => {
  if (newData.error) return;
  guesses.value = newData.players.map(() => 0);
  gots.value = newData.players.map(() => 0);
});

// button handling

function doNext() {
  const next = { ...data.value };

  updateAmount(next);
  updateScores(next);

  const finished = !next.amount;

  router.push({
    name: finished ? 'finished' : 'game',
    query: toQueryParams(next, finished),
  });
}

function updateAmount(next) {
  if (next.amount === next.peakAmount) {
    next.direction = 0;

    next.peakRoundsPlayed += 1;
    if (next.peakRoundsPlayed == next.peakRounds) next.direction = -1;
  }

  next.amount += next.direction;
}

function updateScores(next) {
  for (let i = 0; i < next.players.length; i++) {
    const diff = Math.abs(guesses.value[i] - gots.value[i]);
    
    if (diff) next.scores[i] -= diff;
    else next.scores[i] += calculateFormula(next.formulaIndex, guesses.value[i]); 
  }
}
</script>

<template>
  <h1>chinees poepen</h1>
  <h2>game</h2>

  <div v-if="data.error">
    <p style="color: red;">{{ data.error }}</p>
  </div>

  <div v-else>
    <h3>amount of cards: {{ data.amount }}</h3>

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

    <h3>info</h3>
    <p>Peak amount: {{ data.peakAmount }}</p>
    <p>Formula: {{ formulas[data.formulaIndex].label}}</p>
    <p v-if="data.amount !== data.peakAmount">Direction: {{ data.direction > 0 ? "up" : "down" }}</p>
    <p v-else>Rounds played at peak: {{ data.peakRoundsPlayed }}</p>

    <p>Total guesses: {{ totalGuesses }}</p>
    <p>Total gots: {{ totalGots }}</p>
  </div>
</template>

<style scoped></style>