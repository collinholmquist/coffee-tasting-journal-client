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
                <button @click='toggleEditingForm' class='btn'> Edit</button>
                <li>{{singlePost.id}}</li>
                <li>{{singlePost.roaster}}</li>
            </div>
    </div>
</template>

<script>

//import UserService from "../services/data.service"
import EditModal from '../views/EditPost'

export default ({
    components:{
        EditModal
    },
    props: {
        post: Object,
    },
    data() {
        return {
            //singlePost is the components version of one post from the list of posts
            singlePost: null,
            postBeforeEdit: null,
            postId: null,
            isEditing: false
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
            }/* ,
            
            close() {

                this.$emit('close')
            } */
    }
    
})
</script>
