<template>
    
    <div class='submit-form'>
        <div v-if="!submitted">
            <div class='form-group'>
                <label for='roaster'>Roaster</label>
                <input 
                    type='text'
                    class='form-control'
                    id='roaster'
                    required
                    v-model='post.roaster'
                    name='roaster'
                />
            </div>    

            <div class='form-group'>
                <label for='origin'>Origin</label>
                <input 
                    type ='text'
                    class='form-control'
                    id='origin'
                    required
                    v-model='post.origin'
                    name='origin'
                />
            </div>    

            <div class='form-group'>
                <label for='brew_method'>Brew Method</label>
                <input 
                    type='text'
                    class='form-control'
                    id='brew_method'
                    required
                    v-model="post.brew_method"
                    name='brew_method'
                />
            </div>    

            <div class='form-group'>
                <label for='tasting_notes'>Tasting Notes</label>
                <input 
                    type='text'
                    class='form-control'
                    id='tasting_notes'
                    required
                    v-model='post.tasting_notes'
                    name='tasting_notes'
                />
            </div>    

            <div class='form-group'>
                <label>Rating</label>
                <select class='form-select' v-model="post.rating">
                    <option disabled value=''>Select a Rating</option>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1'>1</option>
                </select>
            </div>  

            <div class='form-group'>
                <label for='comments'>Comments</label>
                <input 
                    type='text'
                    class='form-control'
                    id='comments'
                    v-model='post.comments'
                    name='comments'
                />
            </div> 

            <div class='form-group'>
                <label for='public'>Make Public?</label>
                <input type ='checkbox' id='public' v-model="post.public">
            </div>    

            <button @click="createPost" class='btn btn-success'>Submit</button>     

        </div>
        <div v-else>
            <button class="btn btn-success" @click="newPost">Add New Post</button>
        </div>
    </div>
</template>

<script>
import DataService from "../services/data.service"


export default {
    name: "add-post",
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    data() {
        return {
            post: {
                author_id: null,
                roaster: '',
                origin: '',
                brew_method: '',
                tasting_notes: '',
                rating: null,
                comments: '',
                public: false
            },
            submitted: false
        }
        
    },
    methods: {

        createPost() {

            //get user id from localstorage

            let data = {
                author_id: this.currentUser.id,
                roaster: this.post.roaster,
                origin: this.post.origin,
                brew_method: this.post.brew_method,
                tasting_notes: this.post.tasting_notes,
                rating: this.post.rating,
                comments: this.post.comments,
                public: this.post.public
            }

            DataService.createPosts(data)
                .then(response => {
                    console.log(response.data)
                    this.submitted = true
                })
                .catch(e => {
                    console.log(e)
                })
        },

        newPost() {
            this.submitted = false,
            this.post = {}
        }
    }


}
</script>
