import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/pages/FeedPage.vue") },
  { path: "/", component: () => import("@/pages/FeedPage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
