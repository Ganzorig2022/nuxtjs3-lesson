<!-- http://localhost:3000/admin/c1 -->
<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm.vue'

export default {
  components: { AdminPostForm },

  data() {
    return {
      loadedPost: {
        author: 'Ganzorig',
        title: 'My Post #1',
        content: ' Super good post.',
        thumbnailLink:
          'https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      },
    }
  },
}
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