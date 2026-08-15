<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { formulas } from '@/utils/formulas';
import { toQueryParams } from '@/utils/queryParams';
import { buildPeakSequence } from '@/utils/peakSequence';
import PageHeader from '@/components/PageHeader.vue';
import PeakStrip from '@/components/PeakStrip.vue';
import ButtonIcon from '@/components/ButtonIcon.vue';
import LocaleToggle from '@/components/LocaleToggle.vue';

const router = useRouter();
const { t } = useI18n();

// computed

const maxPossibleAmount = computed(() => {
  if (players.value.length === 0) return 0;
  return Math.min(Math.floor(52 / players.value.length), 25);
});

const peakAmountOptions = computed(() => {
  const opts = [1];
  for (let i = 2; i <= maxPossibleAmount.value; i++) opts.push(i);
  return opts;
});

const data = computed(() => {
  return {
    players: players.value,
    peakAmount: peakAmount.value,
    peakRounds: peakRounds.value,
    formulaIndex: formulaIndex.value,
    amount: 1,
    scores: players.value.map(() => 0),
    direction: 1,
    peakRoundsPlayed: 0,
  };
});

const canCreate = computed(() => players.value.length >= 2);

const peakSequence = computed(() => buildPeakSequence(peakAmount.value, peakRounds.value));

// ref

const newName = ref('');
const players = ref([]);
const peakAmount = ref(1);
const peakRounds = ref(3);
const formulaIndex = ref(0);

// watch

watch(maxPossibleAmount, (newMaxPossibleAmount) => {
  peakAmount.value = Math.min(peakAmount.value, newMaxPossibleAmount);
});

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
  <div class="page">
    <div class="header-actions">
      <LocaleToggle/>
      <RouterLink to="/rules" aria-label="View Rules">
        <ButtonIcon name="?"/>
      </RouterLink>
    </div>

    <PageHeader :title="t('home.title')" :lede="t('home.lede')" />

    <div class="panel">
      <h2 class="section-title">{{ t('home.players.title') }}</h2>

      <div class="input-row">
        <input v-model="newName" type="text" :placeholder="t('home.players.playerName')" @keyup.enter="addPlayer" />
        <button class="btn btn-ghost" style="font-size:large" @click="addPlayer">&plus;</button>
      </div>

      <hr class="divider" />

      <ul class="roster">
        <li v-if="players.length === 0" class="empty">{{ t('home.players.noPlayers') }}</li>
        <li v-for="(player, index) in players" :key="index">
          <span class="index">{{ index + 1 }}.</span>
          <span class="name" :title="player">{{ player }}</span>
          <button class="btn btn-ghost" style="font-size:large" @click="removePlayer(index)">&minus;</button>
        </li>
      </ul>

     <p v-if="players.length < 2" class="warning">{{ t('home.players.notEnoughPlayers') }}</p>
    </div>

    <div class="panel">
      <h2 class="section-title">{{ t('home.settings.title') }}</h2>

      <div class="field">
        <label for="peak-amount">
          {{ t('home.settings.peakAmount') }}
          <span class="hint" tabindex="0" :data-tooltip="t('home.settings.peakAmountTooltip')">?</span>
        </label>
        <div class="select-wrap">
          <select id="peak-amount" v-model="peakAmount" :disabled="!canCreate">
            <option v-for="r in peakAmountOptions" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label for="peak-rounds">
          {{ t('home.settings.peakRounds') }}
          <span class="hint" tabindex="0" :data-tooltip="t('home.settings.peakRoundsTooltip')">?</span>
        </label>
        <div class="select-wrap">
          <select id="peak-rounds" v-model="peakRounds">
            <option :key="1" :value="1">1</option>
            <option :key="3" :value="3">3</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label for="points-formula">
          {{ t('home.settings.pointsFormula') }}
          <span class="hint" tabindex="0" :data-tooltip="t('home.settings.pointsFormulaTooltip')">?</span>
        </label>
        <div class="select-wrap">
          <select id="points-formula" v-model="formulaIndex">
            <option v-for="(f, index) in formulas" :key="index" :value="index">{{ f.label }}</option>
          </select>
        </div>
      </div>

      <hr class="divider" />

      <PeakStrip :sequence="peakSequence" :current-index="0" />
    </div>

    <div class="btn-row">
      <button class="btn btn-primary" :disabled="!canCreate" @click="createGame">{{ t('home.startButton') }}</button>
    </div>
  </div>
</template>