<template>
  <div
    class="text-center text-white font-bold grid grid-cols-2 grid-rows-4 gap-1 border-solid border-2 border-gray-900/85 bg-gray-900/85 rounded-lg shadow-lg shadow-black z-50 absolute backdrop-blur-xl"
  >
    <h3 class="row-start-1 col-start-1 col-span-2">Nova Tarefa</h3>
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
      v-model="task.date.time"
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
export default {
  name: 'NewTask',
  data() {
    return {
      task: {
        title: '',
        description: '',
        date: { time: '' },
        duration: ''
      }
    }
  },
  methods: {
    saveTask() {
      this.$parent.addTask(this.task)
      this.$parent.showNewTask = false
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
