<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/stores"; // Adjust the path as necessary
import Card from "primevue/card";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const appStore = useAppStore();
const newPostContent = ref("");
const currentUser = appStore.currentUser;

const submitPost = () => {
  if (newPostContent.value.trim()) {
    appStore.addPost(currentUser.id, newPostContent.value);
    newPostContent.value = ""; // Clear the input after submission
  } else {
    alert("Please enter some text for your post");
  }
};
</script>

<template>
  <div class="p-4">
    <Card>
      <h3 class="text-lg font-semibold mb-4">Create a New Post</h3>
      <Textarea
        v-model="newPostContent"
        rows="5"
        class="mb-4"
        placeholder="What's on your mind?"
      />
      <Button label="Post" @click="submitPost" />
    </Card>
  </div>
</template>
