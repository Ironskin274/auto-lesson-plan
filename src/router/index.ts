import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
// 这里你可以根据实际情况引入对应的组件
// 假设我们有一个 index.vue 和 about.vue 组件

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
    handleHotUpdate(router)
}

export default router;