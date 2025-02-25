import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { useUserStore } from "@/store/user.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
   // userStore.checkLogin(); // 检查登录状态

    console.log('from', from);
    console.log('userStore.isLoggedIn', userStore.isLoggedIn);

    // 如果目标页面是非登录页且用户未登录，跳转到登录页
    if (to.path !== '/login' && !userStore.isLoggedIn) {  // 使用 path 进行判断
        next({ path: '/login' });  // 使用 next() 跳转到登录页面
    } else {
        next(); // 正常跳转
    }
});

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
    handleHotUpdate(router)
}

export default router;
