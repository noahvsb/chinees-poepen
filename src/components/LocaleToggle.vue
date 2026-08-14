<script setup>
import { useI18n } from 'vue-i18n';
import { persistLocale } from '@/i18n';

const { locale } = useI18n();

function toggle() {
  locale.value = locale.value === 'nl' ? 'en' : 'nl';
  persistLocale(locale.value);
}
</script>

<template>
  <button type="button" class="locale-toggle" @click="toggle" :aria-label="locale === 'nl' ? 'Switch to English' : 'Switch to Dutch'">
    {{ locale === 'nl' ? 'NL' : 'EN' }}
  </button>
</template>