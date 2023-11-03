<script setup lang="ts">
import { useAppStore } from "./stores";
const appStore = useAppStore();
appStore.generateNewPostInterval(10);
</script>

<template>
  <div class="h-screen py-4">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: rgb(15 23 42 / 100);
}
</style>