<template>
 <div>
   <h1>我是Child组件</h1>
   <p>姓名：{{ name }}</p>
   <p>年龄：{{ age }}</p>
   <p>性别：{{ sex }}</p>
 </div>
</template>
<script setup lang="ts">

import { useUsersStore } from '@/store/user';
import {storeToRefs} from 'pinia'//响应式改变数据状态
const store = useUsersStore();
const {name,age,sex,items} = storeToRefs(store);

</script>
