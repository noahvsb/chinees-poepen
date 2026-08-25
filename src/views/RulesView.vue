<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PageHeader from '@/components/PageHeader.vue';
import LocaleToggle from '@/components/LocaleToggle.vue';

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
  <div class="page">
    <div class="header-actions">
      <button type="button" class="btn btn-primary" @click="goBack">{{ t('common.backButton') }}</button>
      <LocaleToggle/>
    </div>

    <PageHeader :title="t('rules.title')" :lede="t('rules.lede')" />

    <div class="panel">
      <h2 class="section-title">{{ t('rules.shape.title') }}</h2>
      <p>{{ t('rules.shape.content') }}</p>
    </div>

    <div class="panel">
      <h2 class="section-title">{{ t('rules.dealing.title') }}</h2>
      <p style="white-space:pre-line">{{ t('rules.dealing.content') }}</p>
    </div>

    <div class="panel">
      <h2 class="section-title">{{ t('rules.guessing.title') }}</h2>
      <p>{{ t('rules.guessing.content1') }}</p>
      <p class="mt-16">{{ t('rules.guessing.content2') }}</p>
      <div class="rules-example">
        <strong>{{ t('rules.guessing.example.title') }}</strong>
        {{ t('rules.guessing.example.content') }}
      </div>
    </div>

    <div class="panel">
      <h2 class="section-title">{{ t('rules.playing.title') }}</h2>
      <p>{{ t('rules.playing.content1') }}</p>
      <ul class="rules-steps">
        <li>
          <span class="term">{{ t('rules.playing.step1.term') }}</span>
          {{ t('rules.playing.step1.content') }}
        </li>
        <li>
          <span class="term">{{ t('rules.playing.step2.term') }}</span>
          {{ t('rules.playing.step2.content') }}
        </li>
      </ul>
      <p class="mt-16">{{ t('rules.playing.content2') }}</p>
    </div>

    <div class="panel">
      <h2 class="section-title">{{ t('rules.scoring.title') }}</h2>
      <p>{{ t('rules.scoring.content1') }}</p>
      <p><code>- |{{ t('rules.scoring.wrongFormula') }}|</code></p>
      <p>{{ t('rules.scoring.content2') }}</p>
    </div>

    <div class="panel">
      <h2 class="section-title">{{ t('rules.optional.title') }}</h2>
      <p>{{ t('rules.optional.content') }}</p>
    </div>

    <div class="btn-row">
      <button type="button" class="btn btn-primary" @click="goBack">{{ t('common.backButton') }}</button>
    </div>
  </div>
</template>
