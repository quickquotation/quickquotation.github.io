<template>
  <div id="app">
    <div class="container bg-white p-2" style="height: 100vh">
      <div class="row py-2 mb-4 border-bottom d-print-none">
        <div class="col-10">
          <div class="row">
            <h1>QuickQuotation</h1>
          </div>
        </div>
        <div class="col-2">
          <div class="row">
            <button @click="updateListState" v-if="listEmpty" class="btn btn-dark border btn-lg w-100">Start</button>
            <button @click="reloadPage" v-if="!listEmpty" class="btn btn-danger btn-lg w-100">Reset</button>
          </div>
        </div>
      </div>
      <router-view style="overflow-y: auto; overflow-x: hidden" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'App',
    computed: {
        ...mapState(['listEmpty'])
    },
    methods: {
        ...mapActions(['updateListState']),
        reloadPage(){
          location.reload();
          return false;
        }
    },
}
</script>

<style>
</style>
