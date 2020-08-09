<template>
  <div v-if="!listEmpty && showTaskList" class="w-100">
    <form action="#" @submit.prevent="saveData">
        <div class="row">
            <div class="col-7 ml-0 mr-0 pr-0">
                <h5 class="bg-success p-2 px-3 text-white user-select-none cursor-pointer" @click="changeEditingStatus"  data-toggle="modal" data-target="#taskCreate">Add New Task</h5>
            </div>
            <div class="col pl-0 ml-0 mr-0 pr-0">
                <h5 class="bg-warning p-2 px- user-select-none cursor-pointer" @click="clearTaskList">Clear Task List</h5>
            </div>
            <div class="col pl-0 ml-0" @click="goToPreviousPage">
                <h5 class="bg-dark p-2 px-3 text-white user-select-none cursor-pointer">Go back</h5>
            </div>
        </div>

        <div class="row ml-1 mb-4 justify-content-center mt-5" v-if="!form.tasks.length">
            <h1 class="text-center text-secondary">Your List Is Empty! Please Add New Task</h1>
        </div>

        <div class="row mb-4" v-if="form.tasks.length">
        <div class="col-12">
            <table class="table table-hover table-striped table-bordered">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Task</th>
                <th scope="col">Time</th>
                <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in form.tasks" :key="index" class="cursor-pointer user-select-none" @click="editTask(task, index)">
                <th scope="row">{{ index+1 }}</th>
                <td style="width: 800px">
                    <b>{{ task.name }}</b>
                    <div v-if="task.details">
                        <u>Task Details:</u> {{ task.details }}
                    </div>
                </td>
                <td class="text-center">{{ task.timeRequired }} days</td>
                <td class="text-center">${{ task.cost }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Total Task: {{ form.tasks.length }}</th>
                <th scope="col">Total Time: {{ sumOfDays }} Days</th>
                <th scope="col">Cost: ${{ sumOfCost }}</th>
                </tr>
            </tfoot>
            </table>
        </div>
        </div>
        <div class="row mb-3" v-if="form.tasks.length">
        <div class="col-12 ml-auto">
            <button type="submit" @click="showPrintPage" class="btn btn-primary btn-lg">Save & Next</button>
        </div>
        </div>
    </form>

    <!-- Modal -->
    <div class="modal fade" id="taskCreate" tabindex="-1" role="dialog" aria-labelledby="taskCreate" aria-hidden="true" ref="vuemodal">
    <div class="modal-dialog modal-dialog-centered border-0" role="document">
        <div class="modal-content border-0">
        <div class="modal-header border-0">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ this.taskEditing ? 'Update Task' : 'Add New Task' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" @click="changeEditingStatus">&times;</span>
            </button>
        </div>
        <form action="" @submit.prevent="saveTask">
        <div class="modal-body border-0">
            <div class="form-group">
                <label for="task">Task</label>
                <input type="text" v-model="task.name" class="form-control" id="task" name="userAddress" placeholder="Enter task" required>
            </div>
            <div class="form-group">
                <label for="task-description">Task Description</label>
                <textarea class="form-control" v-model="task.description" id="task-description" rows="5" name="termsConditions" placeholder="Enter task description"></textarea>
            </div>
            <div class="form-group">
                <label for="task-time">Task Time Required(in days)</label>
                <input type="number" v-model="task.time" class="form-control" id="task-time" name="userAddress" placeholder="Enter task time required in days" required>
            </div>
            <div class="form-group">
                <label for="task-cost">Task Cost(in US dollar)</label>
                <input type="number" v-model="task.cost" class="form-control" id="task-cost" name="userAddress" placeholder="Enter task cost in US dollar" required>
            </div>
        </div>
        <div class="modal-footer border-0">
            <button type="button" class="btn btn-danger" @click="deleteTask">Delete Task</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">{{ this.taskEditing ? 'Update' : 'Add Task' }}</button>
        </div>
        </form>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    mounted(){
        $(this.$refs.vuemodal).on("hidden.bs.modal", this.changeEditingStatus);
    },
    data(){
        return {
            taskEditing: false,
            task:{
                name: '',
                description: '',
                time: 0,
                cost: 0
            }
        };
    },
  computed: {
    ...mapState(["listEmpty", "form", "showTaskList"]),
    sumOfDays(){
        let sum = this.form.tasks.reduce((s, f) => {
            return Number.parseInt(s) + Number.parseInt(f.timeRequired)
        }, 0);
        return sum;
    },
    sumOfCost(){
        let sum = this.form.tasks.reduce((s, f) => {
            return Number.parseInt(s) + Number.parseInt(f.cost)
        }, 0);
        return sum;
    }
  },
  methods: {
    ...mapActions(["updateListState"]),
    changeEditingStatus(){
        this.taskEditing = false;
        this.task.name = "";
        this.task.description = "";
        this.task.time = 0;
        this.task.cost = 0;
    },
    saveData(e) {
      console.log(e);
    },
    goToPreviousPage(){
        this.$store.commit('SHOW_TASK_LIST', false);
        this.$store.commit('SHOW_PRINT_PAGE', false);
    },
    clearTaskList(){
        this.$store.commit('CLEAR_TASK_LIST');
    },
    saveTask(){
        if(!this.taskEditing){
            this.$store.commit('ADD_TASK', this.task);
            this.task.name = "";
            this.task.description = "";
            this.task.time = 0;
            this.task.cost = 0;
            $('#taskCreate').modal('hide');
            return false;
        }else{
            this.task.time = Math.ceil(this.task.time);
            this.task.cost = Number.parseFloat(this.task.cost);
            this.$store.commit('UPDATE_TASK', this.task);
            this.taskEditing = false;
            $('#taskCreate').modal('hide');
        }
    },
    editTask(task, index){
        this.taskEditing = true;
        this.task.name = task.name;
        this.task.description = task.details;
        this.task.time = Number.parseInt(task.timeRequired);
        this.task.cost = Number.parseInt(task.cost);
        this.$store.commit('SET_TASK_EDIT_DATA', task);
        $('#taskCreate').modal('show');
    },
    showPrintPage(){
        this.$store.commit('SHOW_PRINT_PAGE', true);
        this.$store.commit('SHOW_TASK_LIST', false);
    },
    deleteTask(){
        this.$store.commit('REMOVE_TASK');
        $('#taskCreate').modal('hide');
    }
  },
};
</script>
<style lang="css">
.table > tbody > tr > td.text-center{
    vertical-align: middle;
}
</style>