<template>
  <div class="login-page">
    <div class="title">
      <h1>教案自动生成系统</h1>
    </div>

    <!-- 登录框 -->
    <div class="login-container">
      <div class="login-head">您好! 请登录</div>
      <el-form ref="formRef" :model="loginForm" :rules="loginRules" @submit.native.prevent="handleLogin">
        <el-form-item>
          <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              :disabled="loading"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              :disabled="loading"
              @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              class="login-btn"
              size="default"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
              :disabled="loading"
          >
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>

          <!-- 点击后显示注册弹窗 -->
          <el-link type="primary" @click="handleRegister">还没有账号？点击注册</el-link>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册弹窗 -->
    <Register v-if="registerVisible" @close="handleCloseRegister" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElInput, ElButton, ElLink } from 'element-plus'
import { useUserStore } from '@/store/user'
import Register from '@/pages/dashboard/components/register.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: { Register },
  name: 'Login',
  setup() {
    const loginForm = ref({
      username: 'admin',
      password: '123456',
    })

    const loading = ref(false)
    const registerVisible = ref(false) // 控制注册弹窗的显示和隐藏
    const router = useRouter()

    // 用户名校验规则
    const validateUsername = (value: string, callback: Function) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    // 密码校验规则
    const validatePassword = (value: string, callback: Function) => {
      if (value.length < 6) {
        callback(new Error('密码必须在6位以上'))
      } else {
        callback()
      }
    }

    // 登录表单规则
    const loginRules = {
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
    }

    // 打开注册弹窗
    const handleRegister = () => {
      registerVisible.value = true // 显示注册弹窗
    }

    const handleCloseRegister = () => {
      registerVisible.value = false; // 关闭注册弹窗
    };

    const formRef = ref<typeof ElForm | null>(null)

    const handleLogin = () => {
      const form = loginForm.value;
      console.log("Login button clicked", form);  // 调试输出表单信息
      // 校验表单
      if (formRef.value) {
        formRef.value.validate(async (valid: boolean) => {
          console.log("Form validation status:", valid); // 输出验证状态
          if (valid) {
            loading.value = true;
            try {
              console.log("Sending login request...");
              const res = await useUserStore().login(form); // 登录请求
              console.log("Login response:", res); // 输出请求响应

              if (String(res.code) === '1') {
                ElMessage.success('登录成功，跳转到系统首页');
                useUserStore().isLoggedIn = true;
                await router.push('/'); // 跳转到首页
              } else {
                loading.value = false;
                ElMessage.error('登录失败，用户名或密码错误');
              }
            } catch (error) {
              console.error("Login request failed:", error);
              ElMessage.error('登录请求失败，请稍后再试');
              loading.value = false;
            }
          }
        });
      }
    };



    return {
      loginForm,
      loading,
      registerVisible,
      loginRules,
      handleRegister,
      handleCloseRegister,
      handleLogin,
      formRef,
    }
  },
})
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

.title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 30px;
  animation: fadeIn 1s ease-out;
}

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

.login-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
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
</style>
