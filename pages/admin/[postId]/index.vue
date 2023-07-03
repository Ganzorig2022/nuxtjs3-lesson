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
import axios from "axios";

export default {
  components: { AdminPostForm },

  data() {
    return {
      loadedPost: null,
    };
  },

  //built in fetch hook. Must be used inside of setup(). Default method is 'GET'
  async setup() {
    const route = useRoute();
    const postId = route.params.postId; // /admin/[postId]

    const { data: post, refresh } = await useFetch(
      `https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts/${postId}.json`
    );

    return {
      loadedPost: post?._rawValue || null,
    };
  },

  methods: {
    onSubmit(editedPost) {
      axios
        .put(
          `https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts/${this.$route.params.postId}.json`,
          { ...editedPost, updatedDate: new Date() }
        )
        .then((res) => this.$router.push("/admin"))
        .catch((err) => console.log(err));
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