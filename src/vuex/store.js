import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    listEmpty: true,
    showTaskList: false,
    showPrintPage: false,
    taskEditData: {},
    form: {
        client:{
          name: 'Charlie Patel',
          email: 'charlie@99robots.com',
          address: 'New Jersey, USA',
          phone: '555-555-5555'
        },
        user:{
          name: 'Abdulla Malik',
          email: 'abdulla.coder@gmail.com',
          address: 'Sylhet, Bangladesh',
          phone: '01739843500'
        },
        terms: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque?',
        tasks: [
          {
            name: 'Example Task', 
            details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati nam incidunt doloremque laudantium cupiditate blanditiis! Natus expedita rerum dolor distinctio quaerat architecto? Perferendis iusto provident esse laudantium itaque corporis atque?', 
            timeRequired: 3, 
            cost: 1500
          },
          {
            name: 'Example Task', 
            details: '', 
            timeRequired: 1, 
            cost: 100 
          },
        ]
    }
  },
  mutations: {
    TOGGLE_LIST_VISIBILITY(state, payload){
      state.listEmpty = !state.listEmpty;
    },
    SHOW_TASK_LIST(state, payload){
      state.showTaskList = payload;
    },
    SHOW_PRINT_PAGE(state, payload){
      state.showPrintPage = payload;
    },
    CLEAR_TASK_LIST(state, payload){
      state.form.tasks = []
    },
    ADD_TASK(state, payload){
      state.form.tasks.push({
        name: payload.name,
        details: payload.description,
        timeRequired: payload.time,
        cost: payload.cost
      });
    },
    SET_TASK_EDIT_DATA(state, payload){
      state.taskEditData = payload;
    },
    UPDATE_TASK(state, payload){
      let data = _.find(state.form.tasks, (object, index) =>{
        if(object == state.taskEditData){
          object.name = payload.name;
          object.details = payload.description;
          object.timeRequired = payload.time;
          object.cost = payload.cost;
        }
      });
    },
    REMOVE_TASK(state, payload){
      // let d = _.remove(state.form.tasks, (o) => {
      //   return o == state.taskEditData;
      // });
      // console.log(d);
      state.form.tasks = _.reject(state.form.tasks, (el) => { return el === state.taskEditData; });
    }
  },
  actions: {
    updateListState({ commit, state }){
      commit('TOGGLE_LIST_VISIBILITY');
    }
  }
})

export default store;