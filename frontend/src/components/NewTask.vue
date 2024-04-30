<template>
  <div
    class="text-center text-white font-bold grid grid-cols-2 grid-rows-4 gap-4 border-solid border-2 border-gray-900/85 bg-gray-900/85 rounded-lg shadow-lg shadow-black z-50 absolute backdrop-blur-xl"
  >
    <h3 class="row-start-1 col-start-1 col-span-2">
      {{ editingMode ? 'Editar tarefa' : 'Nova Tarefa' }}
    </h3>
    <input
      class="task-input text-black col-start-1 row-start-2"
      placeholder="Título"
      v-model="task.title"
    />
    <input
      class="task-input text-black col-start-1 row-start-3"
      placeholder="Descrição"
      v-model="task.description"
    />
    <input
      class="task-input text-black col-start-2 row-start-2"
      placeholder="Hora"
      type="time"
      v-model="time"
    />
    <input
      class="task-input text-black col-start-2 row-start-3"
      placeholder="Duração"
      v-model="task.duration"
    />
    <button class="row-start-4 col-start-1 col-span-2" @click="saveTask">Salvar</button>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'NewTask',
  props: {
    taskEdit: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        date: '',
        duration: '',
        tag: 'tag'
      })
    },
    editingMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: this.taskEdit.time,
      task: this.taskEdit
    }
  },
  methods: {
    saveTask() {
      if (!this.editingMode) this.create()
      else this.update()
    },
    create() {
      this.task.date = new Date()
      const data = this.$parent.route.params.date.split('-')
      this.task.date.setFullYear(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]))
      const horario = this.time.split(':')
      this.task.date.setHours(horario[0])
      this.task.date.setMinutes(horario[1])
      axios.post('http://localhost:3000/tasks', this.task).then((response) => {
        console.log(response)
      })
      this.task.time = moment(this.task.date).format('HH:mm')
      this.$parent.addTask(this.task)
      this.$parent.showNewTask = false
    },
    update() {
      this.task.date = new Date(this.task.date)
      const horario = this.time.split(':')
      this.task.date.setHours(horario[0])
      this.task.date.setMinutes(horario[1])
      delete this.task.time
      axios.patch(`http://localhost:3000/tasks/${this.task.id}`, this.task).then((response) => {
        console.log(response)
      })
      this.task.time = moment(this.task.date).format('HH:mm')
      this.$parent.task = this.task
      this.$parent.showEditTask = false
    }
  }
}
</script>

<style>
.task-input {
  height: 5vh;
  width: 30vh;
  border: 5px solid #1a202c;
  border-radius: 20px;
  text-align: center;
}

.window {
  width: 50%;
  height: 40%;
  text-align: center;
  position: absolute;
  top: auto;
  left: auto;
  margin: auto;
  background-color: white;
  border-radius: 4px;
  z-index: 1;
}
</style>
