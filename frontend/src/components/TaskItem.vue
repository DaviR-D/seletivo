<template>
  <div class="task text-white mt-4 font-bold grid grid-cols-3 grid-rows-2">
    <h1 class="col-start-0">{{ task.title }}</h1>
    <span class="col-start-1">{{ task.date.time }}</span>
    <span class="col-end-1">{{ task.description }}</span>
    <button class="col-start-3 row-start-1" @click="$parent.deleteTask(index)">X</button>
  </div>
</template>
<script>
export default {
  name: 'TaskItem',
  props: {
    task: { type: Object },
    index: { type: Number }
  }
}
</script>
<style>
.task {
  min-height: 5vh;
  min-width: 40vh;
  max-width: 70vh;
  background-color: #1a202c;
  border-radius: 10px;
  padding: 10px;
}
</style>
