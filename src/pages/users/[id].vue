<script setup lang="ts">
import { useRoute, useRouter } from "vue-router/auto";

const route = useRoute();
const router = useRouter();
router.push("/user/[id]");
</script>

<template>

</template>

<style scoped>

</style>