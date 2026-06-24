<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formulas } from '@/utils/formulas';
import { toQueryParams } from '@/utils/queryParams';

const router = useRouter();

// computed

const maxPossiblyAmount = computed(() => {
  if (players.value.length === 0) return 0;
  return Math.floor(52 / players.value.length);
});

const roundOptions = computed(() => {
  const opts = [1];
  for (let i = 2; i <= maxPossiblyAmount.value; i++) opts.push(i);
  return opts;
});

const data = computed(() => {
  return {
    players: players.value,
    peakAmount: peakAmount.value,
    formula: formula.value,

    amount: 1,
    scores: players.value.map(() => 0),
    direction: peakAmount.value === 1 ? -1 : 1,
  };
});

const canCreate = computed(() => players.value.length >= 2);

// ref

const newName = ref('');
const players = ref([]);
const peakAmount = ref(1);
const formula = ref(0);

// TODO: add an option for how many rounds at the max amount are played (1 or 3 at max)

// button handling

function addPlayer() {
  if (newName.value.trim() === '') return;
  players.value.push(newName.value.trim());
  newName.value = '';
}

function removePlayer(index) {
  players.value.splice(index, 1);
}

function createGame() {
  router.push({
    name: 'game',
    query: toQueryParams(data.value),
  });
}
</script>

<template>
  <h1>chinees poepen</h1>
  <h2>create</h2>

  <input v-model="newName" @keyup.enter="addPlayer" />
  <button @click="addPlayer">add</button>

  <table>
    <tr v-for="(player, index) in players" :key="index">
      <td>{{ player }}</td>
      <td><button @click="removePlayer(index)">remove</button></td>
    </tr>
  </table>

  <div>
    <label>peak amount</label>
    <select v-model="peakAmount">
      <option v-for="r in roundOptions" :key="r" :value="r">{{ r }}</option>
    </select>
  </div>

  <div>
    <label>points formula</label>
    <select v-model="formula">
      <option v-for="(f, index) in formulas" :key="index" :value="index">{{ f.label }}</option>
    </select>
  </div>

  <button :disabled="!canCreate" @click="createGame">create</button>
</template>

<style scoped></style>