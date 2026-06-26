<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { calculateFormula, formulas } from '@/utils/formulas';
import { toQueryParams, parseQueryParams } from '@/utils/queryParams';
import { buildPeakSequence, currentPeakIndex } from '@/utils/peakSequence';
import PageHeader from '@/components/PageHeader.vue';
import PeakStrip from '@/components/PeakStrip.vue';

const route = useRoute();
const router = useRouter();

// computed

const data = computed(() => parseQueryParams(route.query));

const options = computed(() => Array.from({ length: data.value.amount + 1 }, (_, i) => i));

const totalGuesses = computed(() => guesses.value.reduce((sum, g) => sum + g, 0));
const totalGots = computed(() => gots.value.reduce((sum, g) => sum + g, 0));

const canDoNext = computed(() => totalGuesses.value !== data.value.amount && totalGots.value === data.value.amount);

const peakSequence = computed(() =>
  data.value.error ? [] : buildPeakSequence(data.value.peakAmount, data.value.peakRounds)
);
const peakIndex = computed(() => (data.value.error ? -1 : currentPeakIndex(data.value)));

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
  <div class="page">
    <PageHeader title="this round" />

    <div v-if="data.error">
      <div v-if="data.error" class="error-banner">{{ data.error }}</div>
      
      <div class="btn-row">
        <RouterLink to="/" class="btn btn-primary">back to the table</RouterLink>
      </div>
    </div>

    <template v-else>
      <div class="panel">
        <PeakStrip :sequence="peakSequence" :current-index="peakIndex" />
        <hr class="divider" />
        <p class="meta-row">
          <span><strong>{{ data.amount }}</strong> card{{ data.amount === 1 ? '' : 's' }} this round</span>
          <br>
          <span>formula: <strong>{{ formulas[data.formulaIndex].label }}</strong></span>
        </p>
      </div>

      <div class="panel">
        <div class="table-wrap">
          <table class="data">
            <colgroup>
              <col />
              <col class="col-fit" />
              <col class="col-tiny" />
              <col class="col-tiny" />
            </colgroup>
            <thead>
              <tr>
                <th>name</th>
                <th class="num">score</th>
                <th class="num">guess</th>
                <th class="num">got</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, index) in data.players" :key="index">
                <td><span class="truncate" :title="player">{{ player }}</span></td>
                <td class="num">{{ data.scores[index] }}</td>
                <td class="num">
                  <div class="select-wrap compact">
                    <select
                      v-model="guesses[index]"
                      :aria-label="`${player} guess`"
                    >
                      <option v-for="r in options" :key="r" :value="r">{{ r }}</option>
                    </select>
                  </div>
                </td>
                <td class="num">
                  <div class="select-wrap compact">
                    <select
                      v-model="gots[index]"
                      :aria-label="`${player} got`"
                    >
                      <option v-for="r in options" :key="r" :value="r">{{ r }}</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="meta-row mt-16">
          <span>total guesses: <strong>{{ totalGuesses }}</strong></span>
          <br>
          <span>total gots: <strong>{{ totalGots }}</strong></span>
        </p>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" :disabled="!canDoNext" @click="doNext">deal next round</button>
      </div>
    </template>
  </div>
</template>