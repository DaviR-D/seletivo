<template>
  <div>
    <div class="top-bar">{{ date }}</div>

    <div class="background items-center justify-center flex text-black">
      <input class="task-input text-black" v-model="task" @keypress.enter="addTask()" />
      <ul>
        <li v-for="task in tasks" :key="task">{{ task }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import moment from 'moment'
export default {
  mounted() {
    this.date = moment(this.route.params.date).format('DD/MM/YYYY')
  },
  data() {
    return {
      task: '',
      tasks: [],
      route: useRoute(),
      date: ''
    }
  },
  methods: {
    addTask() {
      this.tasks.push(this.task)
      this.task = ''
    }
  }
}
</script>

<style scoped>
.task-input {
  height: 5vh;
  width: 30vh;
  border: 5px solid #1a202c;
  border-radius: 20px;
}
</style>
