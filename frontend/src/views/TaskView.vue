<template>
  <div>
    <div class="top-bar">{{ date }}</div>

    <div class="background items-center justify-center flex flex-col text-black">
      <input class="task-input text-black" v-model="task" @keypress.enter="addTask()" />
      <ul>
        <li
          class="task text-white mt-4 font-bold grid grid-cols-3 gap-4"
          v-for="(task, index) in tasks"
          :key="task"
        >
          <span class="col-span-3">{{ task }}</span>
          <button class="col-start-4" @click="deleteTask(index)">D</button>
        </li>
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
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
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

.task {
  min-height: 5vh;
  min-width: 40vh;
  background-color: #1a202c;
  border-radius: 10px;
  padding: 10px;
}
</style>
