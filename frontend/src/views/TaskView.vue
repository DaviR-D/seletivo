<template>
  <div>
    <div class="top-bar">
      <button @click="returnToCalendar()">{{ '<' }}</button>
      {{ date }}
      <button @click="showNewTask = !showNewTask">{{ showNewTask ? 'x' : '+' }}</button>
    </div>
    <div class="background items-center justify-center flex flex-col text-black">
      <new-task v-if="showNewTask" :props="editTask" />
      <task-item v-for="(task, index) in tasks" :key="task" :taskprop="task" :index="index" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import TaskItem from '@/components/TaskItem.vue'
import NewTask from '@/components/NewTask.vue'
import router from '../router'
import moment from 'moment'
import axios from 'axios'

export default {
  components: { TaskItem, NewTask },
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
    deleteTask(index) {
      this.tasks.splice(index, 1)
    },
    returnToCalendar() {
      router.push('/')
    },
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
