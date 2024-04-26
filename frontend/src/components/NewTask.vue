<template>
  <div class="text-center font-bold">
    <h3>Nova Tarefa</h3>
    <input class="task-input text-black" placeholder="Título" v-model="task.title" />
    <input class="task-input text-black" placeholder="Descrição" v-model="task.description" />
    <input class="task-input text-black" placeholder="Hora" v-model="task.date.time" />
    <input class="task-input text-black" placeholder="Duração" v-model="task.duration" />
    <button @click="$parent.addTask(task)">Salvar</button>
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
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  z-index: 1;
}
</style>
