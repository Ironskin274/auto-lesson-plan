<template>
  <div class="login-page">
    <!-- 左侧浮现的标题 -->
    <div class="title">
      <h1>教案自动生成系统</h1>
    </div>

    <!-- 登录框 -->
    <div class="login-container">
      <div class="login-head">
        您好! 请登录
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item>
          <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              class="login-btn"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>
          <el-link type="primary" @click="handleRegister">还没有账号？点击注册</el-link>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册弹窗 -->
    <transition name="fade">
      <div v-if="registerVisible" class="overlay">
        <div class="register-container">
          <RegisterComponent  visible/>
          <el-button @click="registerVisible = false" class="close-btn">关闭</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RegisterComponent from '@/pages/login/components/register.vue';
import { useUserStore } from '@/store/user'; // 假设你的UserModule负责登录等逻辑
const validateUsername = ( value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePassword = ( value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error('密码必须在6位以上'))
  } else {
    callback()
  }
}
// 登录表单数据
const loginForm = ref({
  username: 'admin',
  password: '123456',
});

const loginRules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
}

// 注册弹窗控制
const registerVisible = ref(false);
const loading = ref(false);
const store = useUserStore()
// 登录逻辑
const handleLogin = async () => {
  // 验证和登录逻辑
  loading.value = true;
  try {
    const res = await store.login(loginForm.value);
    if (res.success) {
      // 登录成功
      console.log('登录成功');
      // 跳转到首页
    } else {
      console.log('登录失败');
    }
  } catch (error) {
    console.error('登录失败', error);
  } finally {
    loading.value = false;
  }
};

// 注册弹窗显示
const handleRegister = () => {
  registerVisible.value = true;
};
</script>

<style scoped>
/* 整个页面 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1E3A8A;
}

/* 标题 */
.title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 30px;
  animation: fadeIn 1s ease-out;
}

/* 标题浮现的动画效果 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 登录框样式 */
.login-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.login-head {
  background-color: transparent;
  color: #409EFF;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  margin-top: 10px;
}

/* 注册弹窗 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.close-btn {
  margin-top: 10px;
}

/* Fade transition for register modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
