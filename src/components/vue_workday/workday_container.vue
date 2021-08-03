<template>
  <div class="calendar-wrapper">
  </div>
</template>

<script>
/*  global  */
import dayjs from 'dayjs'
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

  components: {

  },

  mounted () {

  },

  computed: {

  },

  methods: {

  }
}

</script>