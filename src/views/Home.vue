<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    
    </p>

    <router-view/>

    <div v-for="post in publicPosts" :key="post.id">
          <Post v-bind:post= "post"></Post>
    </div>

  
  </div>
</template>

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
      publicPosts:  []
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
