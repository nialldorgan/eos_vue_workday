<template>
  <div class="calendar-wrapper">
    <workday-week></workday-week>
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
    workDays: Array
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

  }
}

</script>