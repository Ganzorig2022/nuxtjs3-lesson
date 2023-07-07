import { defineStore } from 'pinia'
import axios from 'axios'


export const usePostsStore = defineStore('postsStore', {
    state: () => ({
        posts: [],
        token: null,
    }),


    // COMPUTED PROPERTIES
    getters: {
        loadedPosts(state) {
            return state.posts
        },

        isAuthenticated(state) {
            // if token is not null, then TRUE
            return state.token != null
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

            // authenticate using idToken
            axios
                .put(
                    `${config.public.firebase_url}/posts/${editedPost.id}.json?auth=${this.token}`,
                    { ...editedPost, updatedDate: new Date() }
                )
                .then((res) => {

                    console.log("res", res)
                    const postIndex = this.posts.findIndex(post => post.id === editedPost.id)
                    this.posts[postIndex] = editedPost // update current store's post by its id
                })
                .catch((err) => console.log(err));

        },

        // SIGN UP, LOGIN
        async authenticateUser(userData) {
            const config = useRuntimeConfig();
            const key = config.public.firebase_api_key;
            const { isLogin, email, password } = userData

            let authURL =
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`

            // is SIGN UP
            if (!isLogin) {
                authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
            }

            try {
                const res = await axios.post(
                    authURL,
                    {
                        email,
                        password,
                        token: this.token,
                        returnSecureToken: true,
                    }
                );

                // TOKEN save
                this.token = res.data.idToken;
                localStorage.setItem('token', this.token)
                localStorage.setItem('tokenExpiration', new Date().getTime() + res.data.expiresIn * 1000) // 1688712135748 milliseconds

                //Logout when token expires
                this.setLogoutTimer(res.data.expiresIn * 1000)

                if (res.status === 200) return 'success'
            } catch (error) {
                console.log("error", error);
                return 'failed'
            }
        },

        setLogoutTimer(duration) {
            setTimeout(() => {
                this.clearToken()
            }, duration) // 3600*1000 = 3600000msec = 1 hour
        },

        clearToken() {
            this.token = null
        },

        initAuth() {
            const token = localStorage.getItem('token')
            const expirationDate = localStorage.getItem('tokenExpiration')

            if (new Date().getTime() > +expirationDate || !token) {
                console.log('Invalid token or no token')
                this.clearToken()
                return
            }

            this.setLogoutTimer(+expirationDate - new Date().getTime())
            this.token = token
        },

        logout() {
            this.clearToken();

            if (process.client) {
                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpiration')
            }
        }
    }
})