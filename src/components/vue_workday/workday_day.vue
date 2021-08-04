<template>
  <td>
    <ul>
      <workday-cell
      @eventClick="emitEventClick"
      @cellClick="emitCellClick"
      :cellData="hourCell"
      :workday="workday"
      v-for="hourCell in getHourCells(day, hour.value)" :key="hourCell.index"></workday-cell>
    </ul>
  </td>
</template>

<script>
/*  global  */
import dayjs from 'dayjs'
import WorkdayCell from './workday_cell.vue'
export default {
  name: 'WorkdayDay',

  props: {
    hour: Object,
    day: Object,
    workday: Object
  },

  data: function () {
    return {

    }
  },

  components: {
    WorkdayCell
  },

  mounted () {

  },

  computed: {

  },

  methods: {
    getHourCells (day, start) {      
      let index = 0
      let startHour = dayjs(`${dayjs(day.value).format('YYYY-MM-DD')} ${dayjs(start).format('HH:mm')}`)
      let end = startHour.add(1, 'hour')
      let hourCells = []
      while(startHour < end) {
        hourCells.push({
          value: startHour.format('YYYY-MM-DD HH:mm'),
          index: index
        })
        // five minute intervals
        startHour = startHour.add(5, 'minutes')
        index++
      }
      return hourCells
    },

    emitEventClick (event) {
      this.$emit('eventClick', event)
    },
    
    emitCellClick (event) {
      this.$emit('cellClick', event)
    }
  }
}

</script>