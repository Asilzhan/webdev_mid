<script setup lang="ts">
import { defineProps } from "vue";
import type { Post } from "@/types";
import Button from "primevue/button";

defineProps<{
  post: Post;
}>();

const emit = defineEmits(["like", "dislike"]);
</script>

<template>
  <div class="bg-slate-800 shadow-lg rounded-lg p-4 mx-auto my-2">
    <div class="flex items-center">
      <img
        :src="post.author?.avatarUrl"
        alt="Avatar"
        class="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <div class="font-bold">{{ post.author?.fullName }}</div>
        <div class="text-gray-600">@{{ post.author?.username }}</div>
      </div>
    </div>
    <p class="my-3">{{ post.content }}</p>
    <div class="flex justify-between">
      <Button
        @click="emit('like')"
        icon="pi pi-thumbs-up"
        :label="`${post.likes.length} Likes`"
        class="p-button-text "
      />
      <Button
        @click="emit('dislike')"
        icon="pi pi-thumbs-down"
        :label="`${post.dislikes.length} Dislikes`"
        class="p-button-text"
      />
    </div>
  </div>
</template>

<style>
/* Ensure you have PrimeVue styles imported somewhere in your project, e.g., main.js */
</style>
