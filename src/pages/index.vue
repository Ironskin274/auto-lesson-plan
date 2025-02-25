<template>
  <div class="dashboard-container home">
    <!-- 营业数据 -->
    <newClassPlan />
    <!-- end -->
    <!-- 订单管理 -->
    <asrClassPlan  />
    <!-- end -->
    <div class="homeMain">
      <!-- 菜品总览 -->
      <myClassPlans />
      <!-- end -->
      <!-- 套餐总览 -->
      <compareClassPlans/>
      <!-- end -->
    </div>
    <!-- 订单信息 -->
    />
    <!-- end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElInput, ElButton, ElLink } from 'element-plus'
import { useUserStore } from '@/store/user'
import Register from '@/pages/dashboard/components/register.vue'
import { ElMessage } from 'element-plus'
import {
  getBusinessData,
  getOrderData, //订单管理今日订单
  getOverviewDishes, //菜品总览
  getSetMealStatistics, //套餐总览
} from '@/api/index'

//新建教案
import newClassPlan from "@/pages/dashboard/components/newClassPlan.vue";
// 语音生成
import asrClassPlan from '@/pages/dashboard/components/asrClassPlan.vue'
// 我的教案
import myClassPlans from '@/pages/dashboard/components/myClassPlans.vue'
// 教案对比
import compareClassPlans from '@/pages/dashboard/components/compareClassPlans.vue'
export default defineComponent({
  components: { Register },
  name: 'Login',
})
</script>

<style lang="scss">
</style>
