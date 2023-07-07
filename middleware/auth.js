import { usePostsStore } from "@/store/posts"

export default defineNuxtRouteMiddleware((to, from) => {
    const postsStore = usePostsStore()

    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (to.params.id === '1') {
        return abortNavigation()
    }
    // // In a real app you would probably not redirect every route to `/`
    // if (to.path !== '/') {
    //     return navigateTo('/')
    // }

    // console.log("TO>>>>..", to.path)
    if (!postsStore.isAuthenticated) {
        return navigateTo('/admin/auth')
    }

})