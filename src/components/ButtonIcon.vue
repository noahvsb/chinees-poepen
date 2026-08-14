<script setup lang="ts">
defineProps<{
  name: '?';
}>();
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-if="name === '?'" d="M7.5 7.5a2.5 2.5 0 0 1 5 0c0 1.8-2.5 2.5-2.5 4.25 M10 15.5h.01" />
  </svg>
</template>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  padding: 0.25em;
  border-radius: 50%;
  border: 1.8px solid currentColor;
  background-color: transparent;
  box-sizing: content-box;
  display: inline-block;
  vertical-align: middle;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.08);
}
</style>