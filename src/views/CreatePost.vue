<template>
    <div class='row' style="padding-top:1rem;">
        <div class='col'>
            <h3>Add a new entry</h3>
           
                <div class='submit-form'>
                    <div v-if="!submitted">
                        <div class='mb-3'>
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

                        <div class='mb-3'>
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

                        <div class='mb-3'>
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

                        <div class='mb-3'>
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

                        <div class='mb-3'>
                            <label for='rating' class='form-label'>Rating</label>
                            <select class='form-select' v-model="post.rating">
                                <option selected>Select a Rating</option>
                                <option value='5'>5</option>
                                <option value='4'>4</option>
                                <option value='3'>3</option>
                                <option value='2'>2</option>
                                <option value='1'>1</option>
                            </select>
                        </div>  

                        <div class='mb-3'>
                            <label for='comments'>Comments</label>
                            <input 
                                type='text'
                                class='form-control'
                                id='comments'
                                v-model='post.comments'
                                name='comments'
                            />
                        </div> 

                        <div class='mb-3 form-check'>
                            <input type ='checkbox' class='form-check-input' id='public' v-model="post.public">
                            <label for='public' class='form-check-label'>Make Public?</label>
                            
                        </div>    

                        <button @click="createPost" class='btn btn-success'>Submit</button>     

                    </div>
                    <div v-else>
                        <div class='jumbotron'>
                            <button class="btn btn-success" @click="newPost">Add New Post</button>
                        </div>
                    </div>
                </div>
            
        </div>
        <div class='col'>
            <h3>☕ Coffee Tasting Guide</h3>
                <ul class='list-group'>
                    <li class='list-group-item'>
                        <h5>🌺 Fragrance</h5>
                        <p>What is the predominant fragrance when smelling dry coffee grounds? Fruit, Herbal, or Floral are common notes.  </p>
                    </li>
                    <li class='list-group-item'>
                        <h5>♨️ Aroma</h5>
                        <p>Once the initial drops of water have the hit the grounds, what notes are created? Nutty, caramel, and cocoa-like notes are common.  </p>
                    </li>
                    <li class='list-group-item'>
                        <h5>🍬 Sweetness</h5>
                        <p>Sweetness is percieved at the tip of the tongue.  Consider which type of sweetness
                            is tasted such as fresh fruit, honey, maple syrup or sugar.
                        </p>
                    </li>
                    <li class='list-group-item'>
                        <h5>🍋 Acidity</h5>
                        <p>Acidity is percieved on the lateral parts of the tongue.  It is a more mild acidity or tart like a lemon?
                             Darker roasts have acidity that is more muted and not as juicy or tart.  
                        </p>
                    </li>
                    <li class='list-group-item'>
                        <h5>⚖️ Body</h5>
                        <p>What is the perceived weight of the coffee? Is it like skim milk or heavy whipping cream?</p>
                    </li>
                </ul>
        </div>
    </div>
</template>

<style scoped>
    .container {
        padding: 2rem;
        margin: 1rem;
        width: 50%;
    }
</style>

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

            console.log(data)

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
