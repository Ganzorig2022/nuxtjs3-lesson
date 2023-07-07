import { usePostsStore } from "@/store/posts"

export default defineNuxtRouteMiddleware((to, from) => {

    const postsStore = usePostsStore()

    if (process.client)
        postsStore.initAuth()
})