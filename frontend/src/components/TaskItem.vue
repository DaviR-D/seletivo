<template>
  <div class="task text-white mt-4 font-bold grid grid-cols-3 grid-rows-3 gap-4">
    <h1 class="col-end-1 row-start-1">{{ task.title }}</h1>
    <span class="col-start-2 row-start-1">{{ task.time }}</span>
    <span class="col-span-4 row-start-2 row-span-3 overflow-y-auto">{{ task.description }}</span>
    <button class="col-start-4 row-start-2" @click="deleteTask">
      <div class="delete-icon">X</div>
    </button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'TaskItem',
  props: {
    task: { type: Object },
    index: { type: Number }
  },
  methods: {
    deleteTask() {
      axios.delete(`http://localhost:3000/tasks/${this.task.id}/`).then(() => {
        this.$parent.deleteTask(this.index)
      })
    }
  }
}
</script>
<style>
.task {
  min-height: 5vh;
  min-width: 40vh;
  max-width: 70vh;
  max-height: 20vh;
  background-color: #1a202c;
  border-radius: 10px;
  padding: 10px;
  transition: transform 0.2s ease-in-out;
}

.task:hover {
  transform: scale(1.1);
}

.delete-icon {
  border: 5px solid transparent;
  border-radius: 100%;
  transition:
    color 0.3s,
    border-color 0.3s,
    background-color 0.3s;
}

.delete-icon:hover {
  color: #000;
  border-color: #d84e4e;
  background-color: #d84e4e;
}
</style>
