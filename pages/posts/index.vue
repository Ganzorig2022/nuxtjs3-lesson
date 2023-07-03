<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
import { usePostsStore } from "../../store/posts";

export default {
  components: { PostList },

  // get data from Pinia Store
  setup() {
    const postsStore = usePostsStore();

    return { postsStore };
  },

  computed: {
    loadedPosts() {
      return this.postsStore.loadedPosts;
    },
  },
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
