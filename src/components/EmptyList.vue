<template>
    <div class="col-12" v-if="listEmpty">
        <div class="row">
            <div class="border p-4 w-100 mb-3">
                <h2>Welcome To QuickQuotation</h2>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque?
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['listEmpty'])
    },
    methods: {
        ...mapActions(['updateListState'])
    },
}
</script>
<style lang="css">

</style>