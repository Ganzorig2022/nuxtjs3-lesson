<!-- http://localhost:3000/admin/new-post -->
<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "~/components/Admin/AdminPostForm";

export default {
  layout: "admin",

  components: {
    AdminPostForm,
  },

  methods: {
    onSubmit(postData) {
      axios
        .post(
          "https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts.json",
          { ...postData, updatedDate: new Date() }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
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