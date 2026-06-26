<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { parseQueryParams } from '@/utils/queryParams';
import PageHeader from '@/components/PageHeader.vue';

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

  return temp;
});
</script>

<template>
  <div class="page">
    <PageHeader title="final tally" />

    <div v-if="data.error" class="error-banner">{{ data.error }}</div>

    <div v-else class="panel">
      <div class="table-wrap">
        <table class="data">
          <colgroup>
            <col class="col-fit-sm" />
            <col />
            <col class="col-fit" />
          </colgroup>
          <thead>
            <tr>
              <th class="num">#</th>
              <th>name</th>
              <th class="num">score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in data.players" :key="index" :class="{ 'rank-1': index === 0 }">
              <td class="num">{{ index + 1 }}.</td>
              <td><span class="truncate" :title="player">{{ player }}</span></td>
              <td class="num">{{ data.scores[index] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <br>

    <div class="btn-row">
      <RouterLink to="/" class="btn btn-primary">back to the table</RouterLink>
    </div>
  </div>
</template>