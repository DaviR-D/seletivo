<template>
  <div class="background">
    <div class="top-bar">
      <button @click="returnToCalendar()">{{ '<' }}</button>
      {{ date }}
      <button @click="showNewTask = !showNewTask">{{ showNewTask ? 'x' : '+' }}</button>
    </div>
    <div class="items-center justify-center flex flex-col text-black">
      <new-task v-if="showNewTask" />
      <task-list :tasks="tasks" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import TaskList from '@/components/TaskList.vue'
import NewTask from '@/components/NewTask.vue'
import router from '../router'
import moment from 'moment'
import axios from 'axios'

export default {
  components: { TaskList, NewTask },
  mounted() {
    this.date = moment(this.route.params.date).format('DD/MM/YYYY')
    this.getTasks()
  },
  data() {
    return {
      showNewTask: false,
      tasks: [],
      route: useRoute(),
      date: ''
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push(task)
    },
    returnToCalendar() {
      router.push('/')
    },
    //Recupera as tarefas e filtra pelo dia
    getTasks() {
      axios.get('http://localhost:3000/tasks').then((response) => {
        response.data.forEach((task) => {
          if (moment(task.date).format('DD/MM/YYYY') == this.date) {
            let formatedTask = task
            formatedTask.time = moment(task.date).format('HH:mm')
            this.tasks.push(formatedTask)
          }
        })
      })
    }
  }
}
</script>

<style scoped></style>
