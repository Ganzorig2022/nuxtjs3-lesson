<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost?.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Last Updated on: {{ dateFilter(loadedPost?.updatedDate) }}
        </div>
        <div class="post-detail">{{ loadedPost?.author }}</div>
      </div>
      <p class="post-content">{{ loadPayload?.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about the post, send a mail to
        <a href="mailto:feedback@my-awsome-domain.com"
          >feedback@my-awsome-domain.com</a
        >
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadedPost: null,
    };
  },

  async setup() {
    const route = useRoute();
    const { dateFilter } = useNuxtApp();
    const config = useRuntimeConfig();

    const postId = route.params.id;
    const { data: post, refresh } = await useFetch(
      `${config.public.firebase_url}/posts/${postId}.json`
    );

    return {
      loadedPost: post?._rawValue || null,
      dateFilter,
    };
  },

  methods: {},

  mounted() {},
};
</script>


<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
