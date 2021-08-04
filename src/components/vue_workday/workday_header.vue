<template>
  <thead>
    <tr>
      <td rowspan="2"></td>
      <th :class="[{today: _isToday(day.value)}, 'day-indicator']"
      v-for="(day, index) in days" :colspan="colspan(day)">
        <div class="calendar-header">
          <span class="letters-date">{{_formatDayTitle(day)[0]}}</span>
          <span class="number-date" :style="backgroundColor(day.value)">{{_formatDayTitle(day)[1]}}</span>
        </div>        
      </th>
    </tr>
    <tr>
      <template v-for="(day, index) in days" >
        <template v-if="_workday(day).length">
          <th v-for="workday in _workday(day)" :key="`${index}${workday.id}`">{{workday.user.name}}</th>
        </template> 
        <template v-else>
          <th><div style="height: 30px;"></div></th>
        </template>       
      </template>
    </tr>
  </thead>
</template>

<script>
/*  global  */
import dayjs from 'dayjs'
import {
  workday,
  isToday,
  formatDayTitle
} from '../../utils.js'
export default {
  name: 'WorkdayHeader',

  props: {
    mode: String,
    days: Array,
  },

  data: function () {
    return {

    }
  },

  inject: ['workdayOptions', 'workDays'],

  components: {

  },

  mounted () {

  },

  computed: {

  },

  methods: {
    _formatDayTitle (date) {
      return formatDayTitle(date)
    },

    _isToday (date) {
      return isToday(date)
    },

    backgroundColor (date) {
      if (this.workdayOptions().primary_color && this._isToday(date)) {
        return 'background-color: ' + this.workdayOptions().primary_color
      } else {
        return ''
      }
    },

    _workday (date) {
      return workday(date, this.workDays())
    },

    colspan (date) {
      const workdays = this._workday(date)
      if (workdays.length) {
        return workdays.length
      } else {
        return 1
      }
    }
  }
}

</script>