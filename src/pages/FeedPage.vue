<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppStore } from "@/stores";
import PostCard from "@/components/PostCard.vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";

const appStore = useAppStore();
const postsWithAuthors = computed(() => appStore.postsWithAuthors);
const currentUser = appStore.currentUser;

const showAddPostBlock = ref(false);
const newPostContent = ref("");
function startAddNewPost() {
  newPostContent.value = "";
  showAddPostBlock.value = true;
}
function submitNewPost() {
  appStore.addPost(currentUser.id, newPostContent.value);
  endAddNewPost();
}

function endAddNewPost() {
  newPostContent.value = "";
  showAddPostBlock.value = false;
}

const { addLike, addDislike } = appStore;
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex flex-row justify-between max-w-md mx-auto">
      <Button @click="startAddNewPost()" class="bg-purple-600 py-2 px-3">New Post</Button>
    </div>
    <div
      v-show="showAddPostBlock"
      class="max-w-md w-full mx-auto grid grid-cols-2 gap-3"
    >
      <Textarea
        v-model="newPostContent"
        rows="5"
        class="col-span-2 w-full p-4 bg-zinc-700"
        placeholder="What's on your mind?"
      />
      <Button @click="submitNewPost()" class="bg-purple-600 py-2 px-3 text-center">Publish</Button>
      <Button @click="endAddNewPost()" class="bg-purple-600 py-2 px-3 flex flex-row items-center">Discard</Button>
    </div>
    <div class="flex flex-col gap-2">
      <PostCard
        v-for="(post, index) in postsWithAuthors"
        :key="index"
        :post="post"
        class="max-w-md w-full"
        @like="addLike(post.id, currentUser.id)"
        @dislike="addDislike(post.id, currentUser.id)"
      />
    </div>
    <!-- <VirtualScroller :items="postsWithAuthors" :itemSize="100" class="w-full">
      <template #item="{ item }">
        <PostCard
          :key="item.id"
          :post="item"
          class="max-w-md w-full my-2"
          @like="addLike(item.id, currentUser.id)"
          @dislike="addDislike(item.id, currentUser.id)"
        />
      </template>
    </VirtualScroller> -->
  </div>
</template>
