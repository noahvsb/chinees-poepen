<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  // ordered list of hand sizes for the whole game, e.g. [1,2,3,4,5,5,5,4,3,2,1]
  sequence: { type: Array, required: true },
  // index of the round currently being played; -1 if not applicable
  currentIndex: { type: Number, default: -1 },
});

const max = computed(() => Math.max(...props.sequence, 1));

function heightFor(value) {
  return `${8 + (value / max.value) * 48}px`;
}
</script>

<template>
  <div class="peak-strip">
    <div
      v-for="(value, index) in sequence"
      :key="index"
      class="bar"
      :class="{
        'is-past': currentIndex > -1 && index < currentIndex,
        'is-current': index === currentIndex,
      }"
      :style="{ height: heightFor(value) }"
      :title="t('components.peakStrip.barTooltip', { round: index + 1, count: value }, value)"
    ></div>
  </div>
  <p class="peak-strip-caption">
    <span>{{ t('components.peakStrip.roundOf', { current: Math.max(currentIndex, 0) + 1, total: sequence.length }) }}</span>
    <span>{{ t('components.peakStrip.peaksAt', max) }}</span>
  </p>
</template>