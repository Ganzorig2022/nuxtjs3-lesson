import { defineStore } from 'pinia'

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: []
    }),

    getters: {
        loadedPosts(state) {
            return state.posts
        }
    },

    actions: {
        setPosts(posts) {
            return this.posts = posts
        }
    }
})