<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { formulas } from '@/utils/formulas';
import { parseQueryParams } from '@/utils/queryParams';

const route = useRoute();

const data = computed(() => {
  const temp = parseQueryParams(route.query, true);

  if (temp.error) return temp;

  // sort players and scores
  const ranked = temp.players
    .map((player, index) => ({ player, score: temp.scores[index] }))
    .sort((a, b) => b.score - a.score);

  temp.players = ranked.map((r) => r.player);
  temp.scores = ranked.map((r) => r.score);

  return temp
});
</script>

<template>
  <h1>chinees poepen</h1>
  <h2>finished</h2>

  <div v-if="data.error">
    <p style="color: red;">{{ data.error }}</p>
  </div>

  <div v-else>
    <table>
      <tr v-for="(player, index) in data.players" :key="index">
        <td>{{ index + 1 }}.</td>
        <td>{{ player }}</td>
        <td>{{ data.scores[index] }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>