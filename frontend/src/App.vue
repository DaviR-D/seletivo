<script>
import './index.css'
export default {
  name: 'CalendarView',
  data() {
    return {
      months: ['JANEIRO', 'FEVEREIRO', 'MARÇO'],
      monthIndex: 0
    }
  },
  methods: {}
}
</script>

<template>
  <div>
    <div
      class="justify-between fixed top-0 left-0 right-0 items-center h-16 bg-gray-900 text-white font-bold text-5xl flex justify-center"
    >
      <button @click="monthIndex -= 1">PREV</button>
      {{ months[monthIndex] }}
      <button @click="monthIndex += 1">PROX</button>
    </div>
    <div class="absolute top-16 left-0 w-full h-full bg-white"></div>
  </div>
</template>

<style scoped></style>
