<template>
  <div class="calendar-wrapper">
    <workday-week
    @eventClick="emitEventClick"
    @cellClick="emitCellClick"></workday-week>
  </div>
</template>

<script>
/*  global  */
import dayjs from 'dayjs'
import WorkdayWeek from './workday_week.vue'

export default {
  name: 'WorkdayContainer',

  props: {
    workdayOptions: {
        type: Object,
        default: () => {
            return {
                mode: 'week',
                five_minute_height: 10,
                focus_date: dayjs().format('YYYY-MM-DD'),
                primary_color: '#1de9b6'
            }
        }
    },

    // if workDays is not defined as a prop the default is used
    // NB this will not be used if an empty array is provided
    workDays: {
      type: Array,
      default: () => {
        return [
          {
            id: null,
            user: null,
            start_time: '1970-01-01 09:00',
            finish_time: '1970-01-01 17:00',
          }
        ]
      }
    }
  },

  data: function () {
    return {

    }
  },

  provide: function () {
    return {
      workdayOptions: () => this.workdayOptions,
      workDays: () => this.workDays
    }
  },

  components: {
    WorkdayWeek
  },

  mounted () {

  },

  computed: {

  },

  methods: {
    emitEventClick (event) {
      this.$emit('eventClick', event)
    },

    emitCellClick (event) {
      this.$emit('cellClick', event)
    }
  }
}

</script>