<template>
    <div class='container'>
        <h1>Hello from User Posts</h1>
        <div class='jumbotron'>
            <router-view />

            <div v-for= "post in userPosts" 
                    :key="post.id" 
                    @click="activePost(post, post.id)"
                    :class="{active: post.id == currentId}"> 
                    <Post 
                        v-bind:post="post" 
                        v-bind:current_post_id="currentId"
                        v-on:reset-current-id="resetCurrentId"
                        @saved="updateOnePost" :from_post="post"
                    >
                    </Post>
            </div>
        </div>
    </div>
</template>

<script>

    import UserService from "../services/data.service"
    import Post from '../views/Post'

    export default {
        name: 'get-user-posts',
        components: {
            Post
        },
        data() {
            return {
                user: {},
                userPosts: [],
                currentPost: null,
                currentId: -1,
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
             getUserPosts(id) {
                 UserService.getUserPosts(id)
                .then(response => {
                    this.userPosts = response.data
                })
                .catch(e => {
                    console.log(e)
                })
            },

            activePost(post, id) {
                this.currentPost = post
                this.currentId = id
                //console.log(this.currentId)
            },

            resetCurrentId() {
                this.currentPost = null
                this.currentId = -1
            },
            updateOnePost(post){

                UserService.updatePost(post, this.currentId, this.$store.state.auth.user.id)
                .then(response => {
                    console.log(response.data)
                    //this.$router.push({name: "UserPosts"})
                })
            }
        },
        created() {
            this.getUserPosts(this.$store.state.auth.user.id)
            
        }
    }
    

</script>