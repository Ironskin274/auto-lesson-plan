<template>
  <el-dialog
      title="注册"
      :visible.sync="visible"
      width="30%"
      @close="handleClose">
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegisterSubmit">注册</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Register',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    // 使用 reactive 来处理表单数据
    const form = reactive({
      username: '',
      password: ''
    });

    const formLabelWidth = '80px';

    const handleRegisterSubmit = () => {
      // 注册逻辑处理
      console.log('注册数据:', form);
      // 关闭弹窗
      emit('update:visible', false);
    };

    const handleClose = () => {
      // 关闭弹窗
      emit('update:visible', false);
    };

    // 返回表单数据
    return {
      ...toRefs(form), // 解构出 form 对象的响应式数据
      formLabelWidth,
      handleRegisterSubmit,
      handleClose
    };
  }
});
</script>

<style scoped>
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5) !important; /* 设置灰暗背景 */
}

.el-dialog {
  padding: 20px; /* 让对话框内容距离边缘有些间距 */
}
</style>
