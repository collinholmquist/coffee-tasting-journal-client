<template>
    <div>
        <ul>
            <div v-if="post.id == current_post_id">

                <div class='form-group'>
                <label for='roaster'>Roaster</label>
                <input 
                    type='text'
                    class='form-control'
                    id='roaster'
                    required
                    v-model='singlePost.roaster'
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
                        v-model='singlePost.origin'
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
                        v-model="singlePost.brew_method"
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
                        v-model='singlePost.tasting_notes'
                        name='tasting_notes'
                    />
                </div>    

                <div class='form-group'>
                    <label>Rating</label>
                    <select class='form-select' v-model="singlePost.rating">
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
                        v-model='singlePost.comments'
                        name='comments'
                    />
                </div> 

                <div class='form-group'>
                    <label for='public'>Make Public?</label>
                    <input type ='checkbox' id='public' v-model="singlePost.public">
                </div>  



                <button @click="save" class='btn btn-primary'>Save</button>
                <button @click="cancel" class="btn btn-primary">Cancel</button>
            </div>

            <div v-else>
                <li>{{singlePost.id}}</li>
                <li>{{singlePost.roaster}}</li>
            </div>
            
        </ul>

    </div>
</template>

<script>

//import UserService from "../services/data.service"

export default ({
    props: {
        post: Object,
        current_post_id: Number
    },
    data() {
        return {
            singlePost: null,
            singlePostBefore: null,
            postId: null
        }
    },
    created() {
        this.setValues()
    },

    methods: {
        /* getOnePost(post_id) {
                 UserService.findOnePost(post_id, this.$store.state.auth.user.id )
                .then(response => {
                    this.currentPost = response.data

                })
                .catch(e => {
                    console.log(e)
                })
            }, */
            setValues() {
                this.singlePost = this.post
                this.postId = this.current_post_id
                this.singlePostBefore = this.post
            },

            save() {
                
                this.$emit('saved', {from_post: this.singlePost})
            },

            cancel() {
                this.setValues()
            }
    }
    
})
</script>
