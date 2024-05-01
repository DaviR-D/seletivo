<template>
  <div class="background">
    <div class="top-bar">
      <button @click="setMonth(-1)">{{ '<' }}</button>
      <input
        type="search"
        placeholder="Buscar tarefa"
        class="task-search text-black text-xl text-center"
        v-model="search"
      />
      {{ monthName }}
      <select class="task-search text-black text-xl text-center" v-model="tagFilter">
        <option value="" disabled selected hidden>Categoria</option>
        <option value="">Todas</option>
        <option value="Casa">Casa</option>
        <option value="Estudo">Estudo</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Lazer">Lazer</option>
      </select>
      <button @click="setMonth(1)">{{ '>' }}</button>
    </div>
    <div class="text-black">
      <ul class="flex flex-wrap">
        <li
          class="font-bold day"
          v-for="index in mounthDays"
          :key="index"
          :class="{
            today: isToday(index)
          }"
        >
          <button @click="openTasks(index)" class="day">
            <div class="day-number font-bold">{{ index }}</div>
          </button>
        </li>
      </ul>
      <task-list class="grid grid-cols-3 gap-8" :tasks="filterTasks()" />
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import router from '../router'
import moment from 'moment'
import axios from 'axios'
export default {
  components: { TaskList },
  name: 'CalendarView',
  mounted() {
    this.setMonth(0)
    this.getTasks()
  },
  data() {
    return {
      date: new Date(),
      today: moment().format('DD/MM/YY'),
      monthName: '',
      mounthDays: 0,
      tasks: [],
      search: '',
      tagFilter: ''
    }
  },
  methods: {
    //Muda o mês exibido de acordo com o incremento
    setMonth(increment) {
      this.date.setMonth(this.date.getMonth() + increment)
      this.monthName = this.date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
      this.mounthDays = new Date(2024, this.date.getMonth() + 1, 0).getDate()
      this.filterTasks()
    },
    //Abre a vizualização por dia
    openTasks(day) {
      router.push(`/tasks/${this.date.getFullYear()}-${this.date.getMonth() + 1}-${day}`)
    },
    //Destaca dia atual no calendário
    isToday(day) {
      return this.today ==
        moment(new Date(this.date.getFullYear(), this.date.getMonth(), day)).format('DD/MM/YY')
        ? true
        : false
    },
    //Carrega todas as tarefas do backend
    getTasks() {
      axios.get('http://localhost:3000/tasks').then((response) => {
        this.tasks = response.data
      })
    },
    //Filtra as tarefas exibidas de acordo com mês, título buscado e categoria selecionada
    filterTasks() {
      return this.tasks
        .filter((task) => {
          return (
            moment(task.date).format('MM') === moment(this.date).format('MM') &&
            task.title.toUpperCase().includes(this.search.toUpperCase()) &&
            task.tag.includes(this.tagFilter)
          )
        })
        .map((task) => {
          return {
            ...task,
            time: moment(task.date).format('HH:mm'),
            showDate: true
          }
        })
    }
  }
}
</script>

<style scoped>
.day {
  border: 2px solid #1a202c;
  height: 18vh;
  width: 18vh;
}

.day-number {
  font-size: 6vw;
  transition: transform 0.2s ease-in-out;
}

.day-number:hover {
  transform: scale(1.2);
}

.today {
  background-color: #add8e6;
}

.task-search {
  height: 5vh;
  width: 25vh;
  border-radius: 20px;
}
</style>
