<template>
  <div class="task text-white mt-4 font-bold grid grid-cols-3 grid-rows-3 gap-4">
    <h1 class="col-end-1 row-start-1">{{ `${task.title} (${task.tag})` }}</h1>
    <!-- Exibe a data quando estiver na visualização por mês e a hora na visualização por dia -->
    <span class="col-start-2 row-start-1">{{ task.showDate ? showDate() : showTime() }}</span>
    <span class="col-span-4 row-start-2 row-span-3 overflow-y-auto">{{ task.description }}</span>
    <button class="col-start-4 row-start-1" @click="deleteTask">
      <div class="delete-icon">X</div>
    </button>
    <button class="col-start-4 row-start-2" @click="showEditTask = true">
      <div class="edit-icon">✎</div>
    </button>
  </div>
  <new-task v-if="showEditTask" :taskEdit="task" :editingMode="true" />
</template>
<script>
import NewTask from '@/components/NewTask.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  components: { NewTask },
  name: 'TaskItem',
  props: {
    taskprop: { type: Object },
    index: { type: Number }
  },
  data() {
    return {
      showEditTask: false,
      task: this.taskprop
    }
  },
  methods: {
    deleteTask() {
      axios.delete(`http://localhost:3000/tasks/${this.task.id}/`).then(() => {
        this.$parent.deleteTask(this.index)
      })
    },
    //Calcula o horário de fim da tarefa baseado na hora de início e na duração
    calculateEndTime() {
      return (this.endTime = moment(this.task.time, 'HH:mm')
        .add(this.task.duration, 'minutes')
        .format('HH:mm'))
    },
    showDate() {
      return moment(this.task.date).format('DD/MM')
    },
    showTime() {
      return `${this.task.time} - ${this.calculateEndTime()}`
    }
  }
}
</script>
<style>
.task {
  min-height: 5vh;
  min-width: 40vh;
  max-width: 80vh;
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

.edit-icon {
  border: 5px solid transparent;
  border-radius: 100%;
  transition:
    color 0.3s,
    border-color 0.3s,
    background-color 0.3s;
}

.edit-icon:hover {
  color: #000;
  border-color: #ffe599;
  background-color: #ffe599;
}
</style>
