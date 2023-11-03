import type { Post } from "./Post";
import type { User } from "./User";

export type Profile = {
  user: User;
  posts: Post[];
};
