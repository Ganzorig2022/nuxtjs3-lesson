<!-- http://localhost:3000/admin -->
<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')"
        >Create Post</AppButton
      >
      <AppButton @click="onLogOut" style="margin-left: 10px">Logout</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing posts</h1>
      <PostList isAdmin :posts="getPosts" />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
import AppButton from "~/components/UI/AppButton.vue";
import { usePostsStore } from "../../store/posts";

export default {
  layout: "admin",
  components: { PostList, AppButton },

  // get data from Pinia Store
  setup() {
    const postsStore = usePostsStore();
    postsStore.fetch();

    return { postsStore };
  },

  computed: {
    getPosts() {
      return this.postsStore.loadedPosts;
    },
  },

  methods: {
    onLogOut() {
      this.postsStore.logout();
      this.$router.push("/admin/auth");
    },
  },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
,