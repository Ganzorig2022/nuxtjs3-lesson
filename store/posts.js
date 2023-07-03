import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: []
    }),


    // COMPUTED PROPERTIES
    getters: {
        loadedPosts(state) {
            return state.posts
        }
    },

    // METHODS PROPERTIES
    actions: {
        setPosts(posts) {
            return this.posts = posts
        },

        // Server side Fetching
        async fetch() {
            return axios.get('https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts.json').then(res => {
                const postsArray = []

                for (const key in res.data) {
                    postsArray.push({ ...res.data[key], id: key })
                }
                this.setPosts(postsArray)


            }).catch(err => console.log(err));

        }
    }
})