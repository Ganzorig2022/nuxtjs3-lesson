## 1. Nuxt.js 3

### DYNAMIC ROUTES

`1.` Nuxt.js 3 dr Next.js shig [postId]-aar hiine. Harin Nuxt.js 2 dr "_id.vue" gj yawna.

### LAYOUTS

#### 1. Default Layouts
`1.`  Yamar 1 aldaa garwal ene error page automataar renderlegdene.

> /layouts/error.vue (Custom error page)


#### 2. Custom Layout
`2.` ***Custom layout***-iig ashiglahdaa tuhain ashiglah component dotroo definePageMeta-aar "admin" gd neriig ni zaana.

`2.` /layouts/admin.vue dotor <slot/> oruulna. Nuxt.js 2 <nuxt/> gdg bsan.

```js
<template>
  <div>
    <slot />
  </div>
</template>
```
> "/layouts/admin.vue"


```js
<script>

definePageMeta({ layout: "admin" });

export default {
  //layout: 'admin', // only on nuxt.js 2. DEPRECATED!!!
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

### MIDDLEWARE - PROTECTED ROUTE

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


## 2. VUE.js

### Global components

`1.` /src/Main.js dotor BaseCard.vue, BaseButton.vue import-losnoor ***Global*** buyu haana ch shuud ashiglahaar bolow. Import hiih shaardlagagvigeer.

```js
<template>
  <li>
    <!-- imported on Main.js -->
    <base-card>
      <header>
        <h3>{{ title }}</h3>
        <!-- imported on Main.js -->
        <base-button mode="flat">Delete</base-button>
      </header>
    </base-card>
    <p>{{ description }}</p>
    <nav>
      <a :href="link">View Resource</a>
    </nav>
  </li>
</template>
```

### Dynamic Components

`1.` "./src/components/learning-resource/TheResources.vue" dotor 2 tab-iig untraaj, asaaw. Gol ni component-vvdee import-loson bn.
> https://vuejs.org/guide/essentials/component-basics.html#dynamic-components

```js
<template>
    <base-card>
        <base-button @click="setSelectedTab('stored-resources')">Stored Resources</base-button>
        <base-button @click="setSelectedTab('add-resource')">Add Resources</base-button>
    </base-card>
    <!-- Component changes when currentTab changes -->
    <component :is="selectedTab"></component>
</template>

<scripts>
import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';

export default {
  components: {
    StoredResources,
    AddResource,
  }
}
</scripts>
```

### TWO-WAY BINDING

`1.` v-model-oor event, value-2ulang ni damjuulj boldog.


```js
// Parent 
 <AppControlInput type="email" v-model:value="email">E-Mail Address</AppControlInput>
```

`2.` 

```js
<template>
  <div class="input-control">
      <label><slot /></label>
      <input v-if="controlType === 'input'" :value="value" @input="onInput" />
  </div>
</template>


<script>
export default {
  name: "AppInputControl",
  emits: ["update:value"],
  props: {
    controlType: {
      type: String,
      default: "input",
    },
    value: {
      type: String,
      default: "",
    },
  },

  methods: {
    onInput(event) {
      this.$emit("update:value", event.target.value);
    },
  },
};
</script>
```


### Computed Properties

`1.` Template tag dotor logic bichxer het nvserdeed bwal computed()-iig ashiglana.
`2.` A computed property will only re-evaluate when some of its reactive dependencies have changed 
> https://vuejs.org/guide/essentials/computed.html#writable-computed

```js
<template>
  <base-card>
      <base-button @click="setSelectedTab('stored-resources')" :mode="storedResButtonMode">Stored Resources</base-button>
  </base-card>
  <component :is="selectedTab"></component>
</template>

<script>
import StoredResources from './StoredResources.vue';

export default {
    components: {
        StoredResources,
    },
    computed: {
        storedResButtonMode() {
           return this.selectedTab==='stored-resources' ? null :'flat'
        },

    }    
  }
</script>    
```


### Custom Event ($emit)

`1.` Child-aas Parent rvvgee event damjuulahad ***$emit*** ashigladag.

> https://vuejs.org/api/component-instance.html#emit

```js
 <base-dialog
      v-if="inputIsInvalid"
      title="Invalid Input"
      @close="closeDialog"
    >
</base-dialog>
```

`2.` method dotor function-aar ashiglawal "this.$emit". Utga damjuulna gewel 2doh param-aar ***MANY ARGUMENTS*** damjuulj bolno.

```js

 <button @click="toggleFavorite">Toggle favorite</button>

 methods: {
 toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    },
 }
```

### Provide / Inject property

`1.` Parent-aas zaawal Child bolgon ruu yag daraallaar ni props damjuulahgvgeer provide/inject ashiglaj bolno.

> https://vuejs.org/guide/components/provide-inject.html#prop-drilling

![Example:](https://vuejs.org/assets/provide-inject.3e0505e4.png)


```js
// Parent 
  provide() {
    return {
      resources: this.storedResourcesArr,
      addResource: this.addResource,
      deleteResource: this.deleteResource,
    };
  },
```

```js
// Deep child 
export default {
  props: ['title', 'description', 'link', 'id'],
  inject: ['deleteResource'],
  methods: {
    onDelete(id) {
      this.deleteResource(id);
    },
  },
};
```

### Route

#### Params

`1.` router.js dotor "path: '/coaches/:id'" dynamic ID bga uchraas "this.$route.params.id"-aar ID-gaa awna.
```js
  this.requestsStore.contactCoach({
      email: this.email,
      message: this.message,
      coachId: this.$route.params.id,
    });
```

#### Jump to other page

`1.` router.replace('/coaches') ni RETURN boldoggv.

```js
  this.$router.replace('/coaches');
```

`2.` router.push('/coaches') ni RETURN boldog.

```js
  this.$router.push('/coaches');
```