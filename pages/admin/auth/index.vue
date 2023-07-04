<!-- http://localhost:3000/admin/auth -->
<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model:value="email"
          >E-Mail Address</AppControlInput
        >
        <AppControlInput type="password" v-model:value="password"
          >Password</AppControlInput
        >
        <AppButton type="submit">{{ isLogin ? "Login" : "Sign Up" }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
          >Switch to {{ isLogin ? "Signup" : "Login" }}</AppButton
        >
      </form>
    </div>
  </div>
</template>
  
  <script>
import AppControlInput from "~/components/UI/AppControlInput.vue";
import AppButton from "~/components/UI/AppButton.vue";
import { usePostsStore } from "../../../store/posts";

export default {
  name: "AdminAuthPage",
  layout: "admin",
  components: {
    AppControlInput,
    AppButton,
  },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      secureToken: "",
    };
  },

  // access to Pinia Store
  setup() {
    const postsStore = usePostsStore();

    return { postsStore };
  },

  methods: {
    async onSubmit() {
      const res = await this.postsStore.authenticateUser({
        isLogin: this.isLogin,
        email: this.email,
        password: this.password,
      });

      if (res === "success") {
        this.$router.push("/admin");
      }
    },
  },
};
</script>
  
  <style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
  
  