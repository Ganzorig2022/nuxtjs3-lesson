<!-- PARENT #1 ===> /pages/admin/new-post/index.vue -->
<!-- PARENT #2 ===> /pages/admin/[postId]/index.vue -->
<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model:value="editedPost.author"
      >Author Name</AppControlInput
    >
    <AppControlInput v-model:value="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model:value="editedPost.thumbnail"
      >Thumbnail Link
    </AppControlInput>
    <AppControlInput control-type="textarea" v-model:value="editedPost.content"
      >Content
    </AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
      >Cancel</AppButton
    >
  </form>
</template>


<script>
import AppControlInput from "~/components/UI/AppControlInput.vue";
import AppButton from "~/components/UI/AppButton.vue";

export default {
  props: {
    post: {
      type: Object,
      required: false,
    },
  },

  emits: ["submit"],

  components: {
    AppControlInput,
    AppButton,
  },

  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
          },
    };
  },

  methods: {
    onSave() {
      this.$emit("submit", this.editedPost);
    },

    onCancel() {
      // navigate back
      this.$router.push("/admin");
    },
  },
};
</script>


<style scoped>
</style>