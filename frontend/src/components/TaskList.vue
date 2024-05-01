<template>
  <div>
    <task-item v-for="(task, index) in tasks" :key="task" :taskprop="task" :index="index" />
  </div>
</template>
<script>
import TaskItem from '@/components/TaskItem.vue'

export default {
  components: { TaskItem },
  props: {
    tasks: Array
  },
  methods: {
    deleteTask(index) {
      this.$parent.tasks.splice(index, 1)
    }
  }
}
</script>
<style></style>
