<template>
    <div v-if="!listEmpty && !showTaskList && !showPrintPage" class="w-100">
        <form action="#" @submit.prevent="saveData">
            <h5><span class="bg-warning p-1">Buyer Details</span></h5>
            <div class="row py-3 mb-4">
                <div class="col-6">
                    <div class="form-group">
                        <label for="nameinput">Buyer Name</label>
                        <input type="text" v-model="form.client.name" class="form-control" id="nameinput" name="clientName" placeholder="Enter buyer name" required>
                        <small class="form-text text-muted">Required</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" v-model="form.client.email" class="form-control" id="exampleInputEmail1" name="clientEmail" placeholder="Enter email">
                        <small class="form-text text-muted">Optional</small>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="nameinput">Address</label>
                        <input type="text" v-model="form.client.address" class="form-control" id="nameinput" name="clientAddress" placeholder="Enter address">
                        <small class="form-text text-muted">Optional</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Phone number</label>
                        <input type="text" v-model="form.client.phone" class="form-control" id="exampleInputEmail1" name="clientPhone" placeholder="Enter phone number">
                        <small class="form-text text-muted">Optional</small>
                    </div>
                </div>
            </div>
            <h5><span class="bg-warning p-1">Seller Details</span></h5>
            <div class="row py-3 mb-4">
                <div class="col-6">
                    <div class="form-group">
                        <label for="user-name">Seller Name</label>
                        <input type="text" v-model="form.user.name" class="form-control" id="user-name" name="userName" placeholder="Enter seller name" required>
                        <small class="form-text text-muted">Required</small>
                    </div>
                    <div class="form-group">
                        <label for="user-email">Email address</label>
                        <input type="email" v-model="form.user.email" class="form-control" id="user-email" name="userEmail" placeholder="Enter email">
                        <small class="form-text text-muted">Optional</small>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="user-address">Address</label>
                        <input type="text" v-model="form.user.address" class="form-control" id="user-address" name="userAddress" placeholder="Enter address">
                        <small class="form-text text-muted">Optional</small>
                    </div>
                    <div class="form-group">
                        <label for="user-phone">Phone number</label>
                        <input type="text" v-model="form.user.phone" class="form-control" id="user-phone" name="userAddress" placeholder="Enter phone number">
                        <small class="form-text text-muted">Optional</small>
                    </div>
                </div>
            </div>
            <h5><span class="bg-warning p-1">Terms & Conditions</span></h5>
            <div class="row py-3 mb-4">
                <div class="col-12">
                    <div class="form-group">
                        <label for="termsAndCondition">Terms & Condition</label>
                        <textarea class="form-control" v-model="form.terms" id="termsAndCondition" rows="5" name="termsConditions" placeholder="Enter terms & conditions"></textarea>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 ml-auto">
                    <button type="submit" class="btn btn-primary btn-lg">Save & Next</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['listEmpty', 'form', 'showTaskList', 'showPrintPage'])
    },
    methods: {
        ...mapActions(['updateListState']),
        saveData(){
            // validate the data then
            this.$store.commit('SHOW_TASK_LIST', true);
        }
    },
}
</script>
<style lang="css">

</style>