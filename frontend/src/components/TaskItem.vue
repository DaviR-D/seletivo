<template>
  <div class="task text-white mt-4 font-bold grid grid-cols-3 grid-rows-3 gap-4">
    <h1 class="col-end-1 row-start-1">{{ task.title }}</h1>
    <span class="col-start-2 row-start-1">{{ task.date.time }}</span>
    <span class="col-span-4 row-start-2 row-span-3 overflow-y-auto">{{ task.description }}</span>
    <button class="col-start-4 row-start-2" @click="$parent.deleteTask(index)">X</button>
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
  max-height: 20vh;
  background-color: #1a202c;
  border-radius: 10px;
  padding: 10px;
}
</style>
