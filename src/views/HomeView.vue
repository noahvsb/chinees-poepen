<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formulas } from '@/utils/formulas';
import { toQueryParams } from '@/utils/queryParams';

const router = useRouter();

// ref

const newName = ref('');
const players = ref([]);
const rounds = ref(1);
const formula = ref(0);

// computed

const maxRounds = computed(() => {
  if (players.value.length === 0) return 0;
  return Math.floor(52 / players.value.length);
});

const roundOptions = computed(() => {
  const opts = [1];
  for (let i = 2; i <= maxRounds.value; i++) opts.push(i);
  return opts;
});

const canCreate = computed(() => players.value.length >= 2);

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
    query: toQueryParams(players.value, rounds.value, formula.value),
  });
}
</script>

<template>
  <h1>chinees poepen - create</h1>

  <input v-model="newName" @keyup.enter="addPlayer" />
  <button @click="addPlayer">add</button>

  <table>
    <tr v-for="(player, index) in players" :key="index">
      <td>{{ player }}</td>
      <td><button @click="removePlayer(index)">remove</button></td>
    </tr>
  </table>

  <div>
    <label>rounds</label>
    <select v-model="rounds">
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