<template>
  <div v-if="!listEmpty && !showTaskList && showPrintPage" class="w-100">
    <div class="row d-print-none">
      <div class="col-10 ml-0 mr-0 pr-0">
        <h5
          class="bg-success p-2 px-3 text-white user-select-none cursor-pointer"
          @click="downloadPDF"
        >Download PDF</h5>
      </div>
      <div class="col pl-0 ml-0" @click="goToPreviousPage">
        <h5 class="bg-dark p-2 px-3 text-white user-select-none cursor-pointer">Go back</h5>
      </div>
    </div>
    <div id="printcontent">
      <div class="row m-2 mt-5">
        <div class="col-12 ml-2 text-center">
          <h1 class="text-muted">Quotation</h1>
        </div>
      </div>
      <div class="row m-2 mt-5" v-if="form.client.name && form.user.name">
        <div class="col px-5 client">
          <div class="row">
            <h4>Buyer</h4>
            <table class="table table-hover table-bordered">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ form.client.name }}</td>
                </tr>
                <tr v-show="form.client.email">
                  <td>Email</td>
                  <td>{{ form.client.email }}</td>
                </tr>
                <tr v-show="form.client.address">
                  <td>Address</td>
                  <td>{{ form.client.address }}</td>
                </tr>
                <tr v-show="form.client.phone">
                  <td>Phone</td>
                  <td>{{ form.client.phone }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col px-5 seller">
          <div class="row">
            <h4>Seller</h4>
            <table class="table table-hover table-bordered">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ form.user.name }}</td>
                </tr>
                <tr v-show="form.user.email">
                  <td>Email</td>
                  <td>{{ form.user.email }}</td>
                </tr>
                <tr v-show="form.user.address">
                  <td>Address</td>
                  <td>{{ form.user.address }}</td>
                </tr>
                <tr v-show="form.user.phone">
                  <td>Phone</td>
                  <td>{{ form.user.phone }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row mx-4 my-5">
        <div class="col-12">
          <h4>Task</h4>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task</th>
                <th class="text-center" scope="col">Time</th>
                <th class="text-center" scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(task, index) in form.tasks"
                :key="index"
                class="cursor-pointer user-select-none"
                @click="editTask(task, index)"
              >
                <th scope="row">{{ index+1 }}</th>
                <td style="width: 500px">
                  <b>{{ task.name }}</b>
                  <div v-if="task.details">
                    <u>Task Details:</u>
                    {{ task.details }}
                  </div>
                </td>
                <td class="text-center">{{ task.timeRequired }} days</td>
                <td class="text-center">${{ task.cost }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Total: {{ form.tasks.length }}</th>
                <th class="text-center" scope="col">Total: {{ sumOfDays }} Days</th>
                <th class="text-center" scope="col">Cost: ${{ sumOfCost }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="row mx-4 my-5" v-if="form.terms">
        <div class="col-12">
          <h4>Terms & Conditions</h4>
          <div>{{ form.terms }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    $(this.$refs.vuemodal).on("hidden.bs.modal", this.changeEditingStatus);
  },
  data() {
    return {
      taskEditing: false,
      task: {
        name: "",
        description: "",
        time: 0,
        cost: 0,
      },
    };
  },
  computed: {
    ...mapState(["listEmpty", "form", "showTaskList", "showPrintPage"]),
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
    downloadPDF() {
      window.print();
      return false;
      // var doc = new jsPDF();
      // var elementHTML = $("#printcontent").html();
      // var specialElementHandlers = {
      //   "#elementH": function (element, renderer) {
      //     return true;
      //   },
      // };
      // doc.fromHTML(elementHTML, 15, 15, {
      //   width: 170,
      //   elementHandlers: specialElementHandlers,
      // });

      // // Save the PDF
      // doc.save("quote.pdf");
    },
    changeEditingStatus() {
      this.taskEditing = false;
      this.task.name = "";
      this.task.description = "";
      this.task.time = 0;
      this.task.cost = 0;
    },
    saveData(e) {
      console.log(e);
    },
    goToPreviousPage() {
      this.$store.commit("SHOW_TASK_LIST", true);
    },
    clearTaskList() {
      this.$store.commit("CLEAR_TASK_LIST");
    },
    saveTask() {
      if (!this.taskEditing) {
        this.$store.commit("ADD_TASK", this.task);
        this.task.name = "";
        this.task.description = "";
        this.task.time = 0;
        this.task.cost = 0;
        $("#taskCreate").modal("hide");
        return false;
      } else {
        this.task.time = Math.ceil(this.task.time);
        this.task.cost = Number.parseFloat(this.task.cost);
        this.$store.commit("UPDATE_TASK", this.task);
        this.taskEditing = false;
        $("#taskCreate").modal("hide");
      }
    },
    editTask(task, index) {
      this.taskEditing = true;
      this.task.name = task.name;
      this.task.description = task.details;
      this.task.time = Number.parseInt(task.timeRequired);
      this.task.cost = Number.parseInt(task.cost);
      this.$store.commit("SET_TASK_EDIT_DATA", task);
      $("#taskCreate").modal("show");
    },
  },
};
</script>
<style lang="css">
.table > tbody > tr > td.text-center {
  vertical-align: middle;
}
#printcontent {
  border: 10px double lightgray;
  margin: 50px 50px;
}
@media print {
  body {
    -webkit-transition: padding 0.3s;
    padding: 20px;
  }
}
</style>