<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PageHeader from '@/components/PageHeader.vue';

const { t } = useI18n();
const router = useRouter();

function goBack() {
  if (window.history.state && window.history.state.back)
    router.back();
  else
    router.push('/');
}
</script>

<template>
  <div class="page not-found">
    <PageHeader title="404" :lede="t('notFound.lede')" />
    <button type="button" class="btn btn-primary" @click="goBack">{{ t('common.backButton') }}</button>
  </div>
</template>