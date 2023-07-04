import { defineStore } from 'pinia'
import axios from 'axios'


export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: [],
        token: ''
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
            const config = useRuntimeConfig()

            return axios.get(`${config.public.firebase_url}/posts.json`).then(res => {
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
            const config = useRuntimeConfig()

            axios
                .post(
                    `${config.public.firebase_url}/posts.json`,
                    newPost
                )
                .then((res) => { this.posts.push(post) }
                )
                .catch((err) => console.log(err));
        },

        editPost(editedPost) {
            const config = useRuntimeConfig()

            console.log("URL", config.public.firebase_url)
            axios
                .put(
                    `${config.public.firebase_url}/posts/${editedPost.id}.json`,
                    { ...editedPost, updatedDate: new Date() }
                )
                .then((res) => {
                    const postIndex = this.posts.findIndex(post => post.id === editedPost.id)
                    this.posts[postIndex] = editedPost // update current store's post by its id
                })
                .catch((err) => console.log(err));

        },

        async authenticateUser(userData) {
            const config = useRuntimeConfig();
            const key = config.public.firebase_api_key;
            const { isLogin, email, password } = userData

            // is LOGIN
            if (isLogin) {
                try {
                    const res = await axios.post(
                        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${key}`,
                        {
                            email,
                            password,
                            returnSecureToken: true,
                        }
                    );

                    console.log("res", res);
                } catch (error) {
                    console.log("error", error);
                }
            }
            // is SIGNUP
            else {
                try {
                    const res = await axios.post(
                        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
                        {
                            email,
                            password,
                            returnSecureToken: true,
                        }
                    );

                    // console.log("RES", res)
                    // TOKEN save
                    this.token = res.data.idToken;

                    if (res.status === 200) return 'success'

                } catch (error) {
                    console.log("error", error);
                }
            }
        }
    }
})