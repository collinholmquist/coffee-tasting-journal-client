<template>
    <div class='container'>

                <div class='row'>
                    <div class ='col-md-6'>
                        <div class='form-group'>
                            <label for='roaster'>Roaster</label>
                            <input 
                                type='text'
                                class='form-control'
                                id='roaster'
                                required
                                v-model='editedPost.roaster'
                                name='roaster'
                            />
                        </div>    
                    </div>
                    <div class='col-md-6'>
                        <div class='form-group'>
                            <label for='origin'>Origin</label>
                            <input 
                                type ='text'
                                class='form-control'
                                id='origin'
                                required
                                v-model='editedPost.origin'
                                name='origin'
                            />
                        </div>    
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='form-group'>
                            <label for='brew_method'>Brew Method</label>
                            <input 
                                type='text'
                                class='form-control'
                                id='brew_method'
                                required
                                v-model="editedPost.brew_method"
                                name='brew_method'
                            />
                        </div>  
                    </div>
                    <div class='col-md-6'>
                        <div class='form-group'>
                            <label for='tasting_notes'>Tasting Notes</label>
                            <input 
                                type='text'
                                class='form-control'
                                id='tasting_notes'
                                required
                                v-model='editedPost.tasting_notes'
                                name='tasting_notes'
                            />
                        </div> 

                    </div>
                </div>

                <div class='row'>
                    <div class='col-md-3'>
                        <div class='form-group'>
                            <select class='form-select form-select-lg' v-model="editedPost.rating">
                                <option disabled value=''>Select a Rating</option>
                                <option value='5'>5</option>
                                <option value='4'>4</option>
                                <option value='3'>3</option>
                                <option value='2'>2</option>
                                <option value='1'>1</option>
                            </select>
                        </div> 
                    </div>
                    <div class='col-md-6'>
                        <div class='form-group'>
                            <label for='comments'>Comments</label>
                            <input 
                                type='text'
                                class='form-control'
                                id='comments'
                                v-model='editedPost.comments'
                                name='comments'
                            />
                        </div> 
                    </div>
                    <div class='col-md-3'>
                        <div class='form-group form-check form-switch'>
                            <label class='form-check-label' for='public'>Make Public?</label>
                            <input class= 'form-check-input' type ='checkbox' id='public' v-model="editedPost.public">
                        </div>  
                    </div>
                </div>
                <div>
                    <button @click="save" class='btn'>Save</button>
                    <button @click="cancel" class="btn">Cancel</button>
                    <button @click="del" class="btn">Delete</button>
                </div>
               
        </div>
</template>

<style scoped>

</style>

<script>

export default ({
    props: {
        postToEdit: Object
    },
    data() {
        return {
           editedPost: null,
           postBeforeEdit: null
        } 
    },

    created() {
        this.setValues()
        this.postBeforeEdit = Object.assign({}, this.postToEdit)
    },

    methods: {

        setValues() {
            this.editedPost = this.postToEdit
        },

        save() {
            //will emit saved and pass up the edited form to Post.vue only if there is a change 
            if(this.editedPost && this.editedPost !== this.postBeforeEdit){
                //this is the correct edited version
                this.$emit('saved',this.editedPost)
            } 
        },

        cancel() {
            this.$emit("canceled")
        },

        del() {
            if(confirm('Do you want to delete this?')){
                this.$emit("deleted")
            }
            
        }
    }
})

</script>
