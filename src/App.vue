<script setup lang="ts">
import { useUsersStore } from './store/user';
import {storeToRefs} from "pinia";
const store = useUsersStore();
const {name,age,sex,items} = storeToRefs(store);
console.log(store)
</script>

<template>
  <router-link to="/" >Home </router-link>
  <router-link to="/about">About</router-link>
  <div>
    <textarea rows="5" cols="30">
      {{name}}
      {{age}}
      {{sex}}
      {{items}}
    </textarea>/
  </div>
  <router-view></router-view>

</template>

<style scoped>
</style>
