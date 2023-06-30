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
