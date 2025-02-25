<template>
  <div class="register-modal">
    <el-card class="register-card">
      <h2>注册</h2>
      <el-form :model="form" label-width="80px" @submit.prevent="handleSubmit">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="closeRegister">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage, ElForm, ElInput, ElButton } from 'element-plus';

export default defineComponent({
  name: 'Register',
  setup(props, { emit }) {
    const form = ref({
      username: '',
      password: '',
    });

    const handleSubmit = () => {
      // 注册逻辑，可以通过 API 调用处理注册

      ElMessage.success('注册成功');
      emit('close'); // 关闭弹窗
    };

    const closeRegister = () => {
      emit('close'); // 关闭弹窗
    };

    return {
      form,
      handleSubmit,
      closeRegister,
    };
  },
});
</script>

<style scoped>
.register-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.register-card {
  padding: 20px;
  width: 300px;
  max-width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
