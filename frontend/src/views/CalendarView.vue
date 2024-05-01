<template>
  <div>
    <div class="top-bar">
      <button @click="setMonth(-1)">{{ '<' }}</button>
      {{ monthName }}
      <button @click="setMonth(1)">{{ '>' }}</button>
    </div>
    <div class="background text-black">
      <ul class="flex flex-wrap">
        <li
          class="font-bold day"
          v-for="index in mounthDays"
          :key="index"
          :class="{
            today: isToday(index)
          }"
        >
          <button @click="openTasks(index)" class="day">
            <div class="day-number font-bold">{{ index }}</div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from '../router'
import moment from 'moment'
export default {
  name: 'CalendarView',
  mounted() {
    this.setMonth(0)
  },
  data() {
    return {
      date: new Date(),
      today: moment().format('DD/MM/YY'),
      monthName: '',
      mounthDays: 0
    }
  },
  methods: {
    setMonth(increment) {
      this.date.setMonth(this.date.getMonth() + increment)
      this.monthName = this.date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
      this.mounthDays = new Date(2024, this.date.getMonth() + 1, 0).getDate()
    },
    openTasks(day) {
      router.push(`/tasks/${this.date.getFullYear()}-${this.date.getMonth() + 1}-${day}`)
    },
    isToday(day) {
      return this.today ==
        moment(new Date(this.date.getFullYear(), this.date.getMonth(), day)).format('DD/MM/YY')
        ? true
        : false
    }
  }
}
</script>

<style scoped>
.day {
  border: 2px solid #1a202c;
  height: 20vh;
  width: 20vh;
}

.day-number {
  font-size: 8vw;
  transition: transform 0.2s ease-in-out;
}

.day-number:hover {
  transform: scale(1.2);
}

.today {
  background-color: #add8e6;
}
</style>
