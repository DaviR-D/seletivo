<template>
  <div
    class="window text-center text-white font-bold grid grid-cols-2 grid-rows-5 gap-4 border-solid border-2 border-gray-900/85 bg-gray-900/85 rounded-lg shadow-lg shadow-black z-50 backdrop-blur-xl"
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
      placeholder="Duração (minutos)"
      v-model="task.duration"
    />

    <select class="task-input text-black col-start-1 col-span-2 row-start-4" v-model="task.tag">
      <option value="" disabled selected hidden>Categoria</option>
      <option value="Casa">Casa</option>
      <option value="Estudo">Estudo</option>
      <option value="Trabalho">Trabalho</option>
      <option value="Lazer">Lazer</option>
    </select>

    <button class="row-start-5 col-start-1 col-span-2" @click="saveTask">Salvar</button>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'NewTask',
  props: {
    //Recebe a tarefa a ser editada e no caso de criação de uma nova define uma tarefa vazia
    taskEdit: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        date: '',
        duration: '',
        tag: ''
      })
    },
    //Define se será criada uma nova tarefa ou editada uma já existente
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
    //Checa se será criada ou atualizada uma tarefa e a direciona para o método correspondente
    saveTask() {
      if (!this.editingMode) this.create()
      else this.update()
    },
    create() {
      this.task.date = new Date()
      //Define a data a partir da string recebida nos parâmetros da rota
      const data = this.$parent.route.params.date.split('-')
      this.task.date.setFullYear(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]))

      //Define a hora a partir da string recebida no input time
      const horario = this.time.split(':')
      this.task.date.setHours(horario[0])
      this.task.date.setMinutes(horario[1])

      //Salva tarefa no banco de dados
      axios.post('http://localhost:3000/tasks', this.task).then((response) => {
        console.log(response)
      })

      //Formata o horário a ser exibido
      this.task.time = moment(this.task.date).format('HH:mm')

      //Adiciona a nova tarefa na lista exibida
      this.$parent.addTask(this.task)

      //Fecha essa janela
      this.$parent.showNewTask = false
    },
    update() {
      console.log(this.task.time)
      this.task.date = new Date(this.task.date)
      const horario = this.time.split(':')
      this.task.date.setHours(horario[0])
      this.task.date.setMinutes(horario[1])
      axios
        .patch(`http://localhost:3000/tasks/${this.task.id}`, {
          title: this.task.title,
          description: this.task.description,
          date: this.task.date,
          duration: this.task.duration,
          tag: this.task.tag
        })
        .then((response) => {
          console.log(response)
        })
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
  position: fixed;
  top: 35%;
  left: 35%;
}
</style>
