### DYNAMIC ROUTES

`1.` Nuxt.js 3 dr Next.js shig [postId]-aar hiine. Harin Nuxt.js 2 dr "_id.vue" gj yawna.

### LAYOUTS

#### 1. Default Layouts
`1.`  Yamar 1 aldaa garwal ene error page automataar renderlegdene.

> /layouts/error.vue (Custom error page)


#### 2. Custom Layout
`2.` ***Custom layout***-iig ashiglahdaa tuhain ashiglah component dotroo "layout='admin'" gd neriig ni zaahad automataar orj irne.

> "/layouts/admin.vue"


```js
<script>
export default {
  layout: 'admin',
}
</script>
```

### CUSTOM EVENTS

> Parent-eesee custom event damjuulahaar bol

```js
// Parent component
<TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
```

```js
// Child component
<TheSideNavToggle @toggle="$emit('sidenavToggle')" />
```

### USEFETCH HOOK

`1.` Built in fetch hook. Must be used inside of setup(). Default method is 'GET'


> https://nuxt.com/docs/api/composables/use-fetch#usefetch

```js
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
```

### MIDDLEWARE

`1.` middleware: ['persist', 'auth'] gewel ni ehleed "persist" middleware ni ajillaad daraa ni "auth"

>https://nuxt.com/docs/guide/directory-structure/middleware

```js
<script>
import { usePostsStore } from "../../../store/posts";

export default {

  // access to Pinia Store
  setup() {
    const postsStore = usePostsStore();

    definePageMeta({
      middleware: ["persist", "auth"], 
    });

    return { postsStore };
  },
};
</script>
```