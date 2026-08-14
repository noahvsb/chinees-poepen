<script setup>
import { useRouter } from 'vue-router';
import PageHeader from '@/components/PageHeader.vue';

const router = useRouter();

function goBack() {
  if (window.history.state && window.history.state.back)
    router.back();
  else
    router.push('/');
}
</script>

<template>
  <div class="page">
    <PageHeader title="rules" />
    <p>TODO</p>
    <button type="button" class="btn btn-primary" @click="goBack">
      back to the table
    </button>
  </div>
</template>