<template>
  <div class="container mt-5">
  <div class="row">
  
  </div>
   
<div class="row mt-3">
  
  <div class="col-md-3">
    
    <div class="p-2 alert alert-secondary">
      <h3>Not Started </h3>
      <p id="counttaskBackLog">3</p>
      <draggable class="list-group" :list="taskBackLog" group = "tasks">
        <div class="list-group-item" v-for="element in taskBackLog" :key="element.name">{{element.name}}</div>
      </draggable>
      <div class="form-inLine">
    <b-form-input v-model="newtaskBackLog" placeholder="Add new task" @keyup.enter="add"></b-form-input> 
    <b-button class ="ml-2" variant="primary" @click="addTask">Add</b-button>
  </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="p-2 alert alert-primary">
      <h3>In Progress </h3>
      <p id="counttaskInProgress">1</p>
      <draggable class="list-group" :list="taskInProgress" group = "tasks">
        <div class="list-group-item" v-for="element in taskInProgress" :key="element.name">{{element.name}}</div>
      </draggable>
      <div class="form-inLine">
    <b-form-input v-model="newtaskInProgress" placeholder="Add new task" @keyup.enter="add"></b-form-input> 
    <b-button class ="ml-2" variant="primary" @click="addTask">Add</b-button>
  </div>
    </div>
  </div>

  <div class="col-md-3">
    <div class="p-2 alert alert-warning">
      <h3>Completed </h3>
            <p id="counttaskDone">1</p>
      <draggable class="list-group" :list="taskDone" group = "tasks">
        <div class="list-group-item" v-for="element in taskDone" :key="element.name">{{element.name}}</div>
      </draggable>
      <div class="form-inLine">
    <b-form-input v-model="newtaskDone" placeholder="Add new task" @keyup.enter="add"></b-form-input> 
    <b-button class ="ml-2" variant="primary" @click="addTask">Add</b-button>
  </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "kanban-board",
  components: {
    draggable
  },
  data(){
    return{
      newtaskBackLog: "",
      newtaskInProgress: "",
      newtaskDone: "",
      taskBackLog:[
        {name:"Task A"},
        {name:"Task B"},   
        {name:"Task C"},  
      ],
      taskInProgress:[
        {name:"Task D"},
      ],
      taskDone:[{name:"Task E"},]
    }
  },
  methods:{
    addTask(){
      if(this.newtaskBackLog){
        this.taskBackLog.push({name: this.newtaskBackLog});
        this.newtaskBackLog = "";//Blank string to clear out the text box
        document.getElementById("counttaskBackLog").innerHTML = this.taskBackLog.length;
      }
      if(this.newtaskInProgress){
        this.taskInProgress.push({name: this.newtaskInProgress});
        this.newtaskInProgress = "";//Blank string to clear out the text box
        document.getElementById("counttaskInProgress").innerHTML = this.taskInProgress.length;

      }
      if(this.newtaskDone){
        this.taskDone.push({name: this.newtaskDone});
        this.newtaskDone = "";//Blank string to clear out the text box
        document.getElementById("counttaskDone").innerHTML = this.taskDone.length;

      }
    }
  }
}
</script>

<style>

</style>
