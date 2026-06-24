import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import FinishedView from '@/views/FinishedView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/game', name: 'game', component: GameView },
    { path: '/finished', name: 'finished', component: FinishedView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
});

export default router;