<template>
  <table border>
    <workday-header
    :days="days"
    :mode="mode"></workday-header>
    <tbody>
      <tr v-for="(hour, index) in hours" :key="index">
        <workday-hours :hour="hour"></workday-hours>
        <template v-for="(day, index) in days">
          <template v-if="_workday(day).length">
            <template v-for="workday in _workday(day)">
              <workday-day 
              @eventClick="emitEventClick"
              @cellClick="emitCellClick"
              :key="`${index}${workday.id}`" 
              :day="day"   
              :workday="workday"
              :hour="hour"></workday-day>
            </template>
          </template>
          <template v-else>
            <td></td>
          </template>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
/*  global  */
import { sortStartFinishTimes, getHours, workday } from '../../utils'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)
import WorkdayDay from './workday_day.vue'
import WorkdayHeader from './workday_header.vue'
import WorkdayHours from './workday_hours.vue'
export default {
  name: 'WorkdayWeek',

  props: {

  },

  data: function () {
    return {

    }
  },

  inject: ['workdayOptions', 'workDays'],

  components: {
    WorkdayDay,
    WorkdayHours,
    WorkdayHeader
  },

  mounted () {

  },

  computed: {
    mode: function () {
      return this.workdayOptions().mode
    },

    currentDay: function () {
      return dayjs(this.workdayOptions().focus_date)
    },

    startOfWeek: function () {
      return this.currentDay.startOf('isoWeek')
    },

    endOfWeek: function () {
      return this.currentDay.endOf('isoWeek')
    },

    workdayStartHour: function () {
      // if workDays is empty this will return undefined
      if (this.workDays().length) {
        return sortStartFinishTimes(this.workDays(), 'start_time')
      }
    },

    workdayEndHour: function () {
      // if workDays is empty this will return undefined
      if (this.workDays().length) {
        return sortStartFinishTimes(this.workDays(), 'finish_time', false)
      }
    },

    hours: function () {
      // if workDays is empty this will return the full 24 hour array
      return getHours({start_hour: this.workdayStartHour, end_hour: this.workdayEndHour})
    },

    days: function () {
      let days = []
      if (this.mode === 'day') {
        days.push({
          value: this.currentDay.toISOString(),
          index: 0
        })
      } else {
        let dateIterator = this.startOfWeek
        let index = 0
        while (dateIterator <= this.endOfWeek) {
          //need to do this to avoid problems with UTC and Summertime being not the same time and the day being altered as a result
          let jsNativeDate = new Date(`${dateIterator.format('YYYY-MM-DD')}T00:00:00.000Z`)
          days.push({
            value: jsNativeDate.toISOString(),
            index: index
          })
          dateIterator = dateIterator.add(1, 'day')
          index++
        }
      }
      return days
    }
  },

  methods: { 
    _workday (date) {
      return workday(date, this.workDays())
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