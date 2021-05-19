<template>
    <div class='container'>
        <h1>Hello from User Posts</h1>
        <div class='jumbotron'>
            <router-view />

            <div v-for= "post in userPosts" v-bind:key="post.id" > 
                    <Post 
                        v-bind:post="post" 
                        @saved="updateOnePost"
                        @deleted="deleteOnePost"
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

            /* resetCurrentId() {

                console.log(this.selectedPost)
                console.log(this.currentId)

                this.activePost(null, -1)

            } */
            updateOnePost(post){

                UserService.updatePost(post, post.id, this.$store.state.auth.user.id)
                .then(response => {
                    console.log(response.data)

                    const postIndex = this.userPosts.findIndex(p => p.id === post.id)
                    this.userPosts.splice(postIndex, 1, post)
                })
            },
            deleteOnePost(post){

                UserService.deletePost(post.id, this.$store.state.auth.user.id)
                .then(response => {
                    console.log(response)
                    
                    const postIndex = this.userPosts.findIndex(p => p.id === post.id)
                
                    this.userPosts.splice(postIndex, 1)

                    /* this.userPosts.forEach(element => {
                        console.log(element.id)
                    })
                    console.log('to be deleted', postIndex)
                    //console.log(postIndex)
                    //delete from local state until refresh
                    */

                    /* this.userPosts.forEach(element => {
                        console.log(element.id)
                    }); */
                }).catch(e => {
                    console.log(e)
                }) 
            }
        },
        created() {
            this.getUserPosts(this.$store.state.auth.user.id)
            
        }
    }
    

</script>