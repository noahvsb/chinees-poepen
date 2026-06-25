<script setup>
defineProps({
  title: { type: String, required: true },
  lede: { type: String, default: '' },
});
</script>

<template>
  <header class="page-head">
    <p class="brand">chinees poepen</p>
    <h1 class="page-title">{{ title }}</h1>
    <p v-if="lede" class="page-lede">{{ lede }}</p>
  </header>
</template>