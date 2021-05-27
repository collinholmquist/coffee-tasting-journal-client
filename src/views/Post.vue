<template>
    <div>
            <div v-if="isEditing">
                <EditModal
                    :postToEdit="singlePost"
                    @deleted="del"
                    @saved='save' 
                    @canceled='cancel'
                ></EditModal>
                
            </div>

            <div v-else>

                <div class='card' >
                    <div class='row'> 
                        <div class='col-sm-10'>
                            <h5 class='card-title'> {{singlePost.roaster}} | {{this.convertDate(this.singlePost.updatedAt)}} </h5>
                            <h6 class='card-subtitle text-muted'> {{singlePost.origin}} </h6>
                            <hr>
                            <p class= 'card-text'><em>Brew Method: </em> {{singlePost.brew_method}} <br><em>Tasting Notes: </em> {{singlePost.tasting_notes}} </p>
                            <div>
                                <span v-for="(star, index) in starRating" v-bind:key=index>{{star}}</span>
                            </div> 
                          
                        </div>
                        <div class='col-sm-2'>
                             <button v-show='!viewOnly' @click='toggleEditingForm' class='btn'> Edit</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
    </div>
</template>

<style scoped>
    .card {
        width: 30rem;
        margin-top: 2rem;
        margin-bottom: 2rem; 
        padding: 1rem;
    }


</style>

<script>

//import UserService from "../services/data.service"
import EditModal from '../views/EditPost'

export default ({
    components:{
        EditModal
    },
    props: {
        post: Object,
        viewOnly: Boolean
    },
    data() {
        return {
            //singlePost is the components version of one post from the list of posts
            singlePost: null,
            postBeforeEdit: null,
            postId: null,
            isEditing: false,
            starRating: []
        }
    },
    mounted() {
       
    },
    created() {
    
        this.setValues()
        //create a copy if cancelled is pressed.  
        this.postBeforeEdit = Object.assign({}, this.post)
    },

    methods: {
       
            setValues() {
                this.singlePost = this.post
                this.postId = this.post.id
                this.createStarList(this.post.rating)  
            },

            save(singlePost) {
                this.$emit('saved', singlePost)
                this.isEditing = false
            },

            cancel() {
                Object.assign(this.post, this.postBeforeEdit)
                this.isEditing = false
            },

            toggleEditingForm() {
                this.isEditing = true
            },

            del(){
                this.isEditing = false
                this.$emit('deleted', this.post)
            },
            convertDate(date){

                let converted = new Date(date).toLocaleDateString(
                'en-us',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })

                return converted
            } ,

            createStarList(numStars){
                for(let i = 0; i < numStars; i++) {
                    this.starRating.push(String.fromCodePoint(0x2B50))
                }

            }
    }   
})
</script>
