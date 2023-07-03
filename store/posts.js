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

                // reformatting response data with "id" field...
                for (const key in res.data) {
                    postsArray.push({ ...res.data[key], id: key })
                }
                this.setPosts(postsArray)


            }).catch(err => console.log(err));

        },

        addPost(post) {
            const newPost = {
                ...post, updatedDate: new Date()
            }

            axios
                .post(
                    "https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts.json",
                    newPost
                )
                .then((res) => { this.posts.push(post) }
                )
                .catch((err) => console.log(err));
        },

        editPost(editedPost) {
            axios
                .put(
                    `https://vue-http-demo-f00ab-default-rtdb.firebaseio.com/posts/${editedPost.id}.json`,
                    { ...editedPost, updatedDate: new Date() }
                )
                .then((res) => {
                    const postIndex = this.posts.findIndex(post => post.id === editedPost.id)
                    this.posts[postIndex] = editedPost // update current store's post by its id
                })
                .catch((err) => console.log(err));

        }
    }
})