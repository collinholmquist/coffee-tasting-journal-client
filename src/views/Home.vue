<template>
  <div class="container">
    <header class='container-md'>
        <h1>
         Posts
        </h1>
    </header>

    <router-view/>

    <div v-for="post in publicPosts" :key="post.id">
          <Post v-bind:post= "post"
                v-bind:viewOnly="viewOnly"
          ></Post>
    </div>

  
  </div>
</template>

<style scoped>
    .container-md {
      padding-top: 1rem;
    }
</style>

<script>

import UserService from '../services/data.service'
import Post from '../views/Post'

export default {
  name: 'home',
  components: {
    Post
  },

  data() {
    return {
      publicPosts:  [],
      viewOnly: true
    }

  },

  methods: {

    getPublicPosts() {
        UserService.getPublic()
        .then(response => {
          this.publicPosts = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

    this.getPublicPosts()
   
  }
};
</script>
