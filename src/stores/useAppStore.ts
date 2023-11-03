import { faker } from "@faker-js/faker";
import { defineStore } from "pinia";
import type { Post, User } from "../types";
import { computed, ref } from "vue";

function generateSampleUsers(userCount: number) {
  const users: User[] = [];
  for (let i = 0; i < userCount; i++) {
    const firstName = faker.person.firstName();
    const user: User = {
      id: faker.string.uuid(),
      username: faker.internet.userName({ firstName }),
      fullName: faker.person.fullName({ firstName }),
      bio: faker.person.bio(),
      avatarUrl: faker.image.avatar(),
    };
    users.push(user);
  }
  return users;
}

function generateSamplePost(authorId: string, createdAt: Date) {
  const post: Post = {
    id: faker.string.uuid(),
    content: faker.lorem.sentences(),
    createdAt,
    authorId: authorId,
    likes: [],
    dislikes: [],
  };
  return post;
}

function generateSampleLikes(users: User[]) {
  const likes: string[] = [];
  const dislikes: string[] = [];
  users.forEach((user) => {
    if (faker.datatype.boolean()) {
      likes.push(user.id);
    } else {
      dislikes.push(user.id);
    }
  });

  return { likes, dislikes };
}

function hasLike(post: Post, userId: string): boolean {
  return post.likes.includes(userId);
}

function hasDislike(post: Post, userId: string): boolean {
  return post.dislikes.includes(userId);
}

export const useAppStore = defineStore(
  "appStore",
  () => {
    const users = ref(generateSampleUsers(5));
    const currentUser = ref(users.value[0]);
    const post = generateSamplePost(users.value[0].id, faker.date.past());
    const { likes, dislikes } = generateSampleLikes(users.value);
    post.likes = likes;
    post.dislikes = dislikes;
    const posts = ref([post]);

    const postsWithAuthors = computed(() => {
      return posts.value.map((post) => {
        const author = users.value.find((user) => user.id === post.authorId);
        return { ...post, author };
      });
    });

    function addPost(authorId: string, content: string) {
      const post: Post = {
        id: faker.string.uuid(),
        createdAt: new Date(),
        authorId,
        content,
        likes: [],
        dislikes: [],
      };
      posts.value.push(post);
      console.log("New post added");
    }

    function addRandomPost(
      authorId: string,
      predefinedLikes: string[],
      predefinedDislikes: string[]
    ) {
      const post = generateSamplePost(authorId, new Date());
      post.likes = predefinedLikes;
      post.dislikes = predefinedDislikes;
      posts.value.push(post);
    }

    function generateNewPostInterval(interval: number) {
      setInterval(() => {
        console.log("new Post just dropped");
        if (users.value.length > 0) {
          const randomUserIndex = faker.number.int({
            min: 0,
            max: users.value.length - 1,
          });
          const randomUserId = users.value[randomUserIndex].id;
          addRandomPost(randomUserId, [], []);
        }
      }, interval * 1000);
    }

    function addLike(postId: string, userId: string) {
      const postIndex = posts.value.findIndex((p) => p.id === postId);
      if (postIndex < 0) return; // Post not found

      const post = posts.value[postIndex];
      const isLiked = hasLike(post, userId);
      const isDisliked = hasDislike(post, userId);

      if (isLiked) {
        // If already liked, remove like
        post.likes = post.likes.filter((id) => id !== userId);
      } else {
        // If not liked, add like and remove dislike if present
        post.likes.push(userId);
        if (isDisliked) {
          post.dislikes = post.dislikes.filter((id) => id !== userId);
        }
      }
    }

    function addDislike(postId: string, userId: string) {
      const postIndex = posts.value.findIndex((p) => p.id === postId);
      if (postIndex < 0) return; // Post not found

      const post = posts.value[postIndex];
      const isLiked = hasLike(post, userId);
      const isDisliked = hasDislike(post, userId);

      if (isDisliked) {
        // If already disliked, remove dislike
        post.dislikes = post.dislikes.filter((id) => id !== userId);
      } else {
        // If not disliked, add dislike and remove like if present
        post.dislikes.push(userId);
        if (isLiked) {
          post.likes = post.likes.filter((id) => id !== userId);
        }
      }
    }

    return {
      currentUser,
      users,
      posts,
      postsWithAuthors,
      addPost,
      addRandomPost,
      generateNewPostInterval,
      addLike,
      addDislike,
    };
  },
  { persist: true }
);
