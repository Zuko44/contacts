import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edit/:id',
      name: 'editContact',
      props: (route) => ({ id: parseInt(route.params.id.toString()) }),
      component: () => import('../components/ContactEdit.vue'),
    },
  ],
});

export default router;
