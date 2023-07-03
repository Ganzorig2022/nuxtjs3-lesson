<!-- http://localhost:3000/admin/new-post -->
<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "~/components/Admin/AdminPostForm";
import { usePostsStore } from "../../../store/posts";

export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },

  // access to Pinia Store
  setup() {
    const postsStore = usePostsStore();

    return { postsStore };
  },

  methods: {
    onSubmit(postData) {
      this.postsStore.addPost(postData);
      this.$router.push("/admin");
    },
  },
};
</script>


<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>