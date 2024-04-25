<template>
  <div>
    <div class="top-bar">
      <button @click="setMonth(-1)"><</button>
      {{ monthName }}
      <button @click="setMonth(1)">></button>
    </div>
    <div class="absolute top-16 left-0 w-full h-full bg-white text-black">
      <ul class="flex flex-wrap">
        <li class="font-bold day" v-for="index in mounthDays" :key="index">
          <button class="day">{{ index }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',
  mounted() {
    this.setMonth(0)
  },
  data() {
    return {
      date: new Date(),
      monthName: '',
      mounthDays: 0
    }
  },
  methods: {
    setMonth(increment) {
      this.date.setMonth(this.date.getMonth() + increment)
      this.monthName = this.date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
      this.mounthDays = new Date(2024, this.date.getMonth() + 1, 0).getDate()
    }
  }
}
</script>

<style scoped>
.day {
  border: 1px solid #1a202c;
  height: 20vh;
  width: 20vh;
  font-size: 8vw;
}

.day:hover {
  transform: scale(1.1);
  border: 0px;
}
</style>
