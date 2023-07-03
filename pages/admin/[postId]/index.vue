<!-- ENDPOINT ===> http://localhost:3000/admin/[postId] -->
<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "~/components/Admin/AdminPostForm";
import { usePostsStore } from "../../../store/posts";

export default {
  components: { AdminPostForm },

  data() {
    return {
      loadedPost: null,
    };
  },

  //built in fetch hook. Must be used inside of setup(). Default method is 'GET'
  async setup() {
    const postsStore = usePostsStore();
    const route = useRoute();
    const postId = route.params.postId; // /admin/[postId]

    const { data: post, refresh } = await useFetch(
      `https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts/${postId}.json`
    );

    return {
      loadedPost: post?._rawValue || null,
      postsStore,
      refresh,
    };
  },

  methods: {
    onSubmit(editedPost) {
      this.postsStore.editPost({
        ...editedPost,
        id: this.$route.params.postId,
      });

      // this.refresh();
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>