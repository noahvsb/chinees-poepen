<script setup>
import PageHeader from '@/components/PageHeader.vue';
</script>

<template>
  <div class="page not-found">
    <PageHeader title="404" lede="This hand doesn't exist." />
    <RouterLink to="/" class="btn btn-primary">back to the table</RouterLink>
  </div>
</template>