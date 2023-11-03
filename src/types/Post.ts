import type { User } from ".";

export type Post = {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  likes: string[];
  dislikes: string[];
  author?: User;
};
