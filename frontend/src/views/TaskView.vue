<template>
  <div>
    <div class="top-bar">
      <button @click="returnToCalendar()"><</button>
      {{ date }}
      <button>+</button>
    </div>

    <div class="background items-center justify-center flex flex-col text-black">
      <input class="task-input text-black" v-model="task" @keypress.enter="addTask()" />
      <task-item v-for="(task, index) in tasks" :key="task" :task="task" :index="index" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import TaskItem from '@/components/TaskItem.vue'
import router from '../router'
import moment from 'moment'
export default {
  components: { TaskItem },
  mounted() {
    this.date = moment(this.route.params.date).format('DD/MM/YYYY')
  },
  data() {
    return {
      task: '',
      tasks: [
        {
          title: 'tarefa1',
          description: 'Realizar a primeira tarefa no prazo adequado',
          date: { time: '17:00' },
          duration: '01:30'
        },
        {
          title: 'Segunda Tarefa',
          description:
            'Testando a capacidade do componente tarefa de manter o design adequado mesmo com descrições grandes',
          date: { time: '17:00' },
          duration: '01:30'
        }
      ],
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
    },
    returnToCalendar() {
      router.push('/')
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
