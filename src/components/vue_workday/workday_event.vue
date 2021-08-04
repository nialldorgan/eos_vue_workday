<template>
  <div class="calendar-event"
  @click="$emit('eventClick', event)" 
  :style="eventStyle"> 
    <div class="calendar-event-text">
      <span class="calendar-event-title">{{event.title}}</span>
      <span>{{event.description}}</span>
      <span>{{ `${eventStartTime.format('h:mm A')} - ${eventEndTime.format('h:mm A')} ` }}</span>
    </div>    
   </div>
</template>

<script>
/*  global  */
import big from 'big.js'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
export default {
  name: 'WorkdayEvent',

  props: {
    event: Object,
    cellData: Object
  },

  data: function () {
    return {
    }
  },

  inject: ['workdayOptions'],

  components: {

  },

  mounted () {

  },

  computed: {
    eventDuration: function () {
      return dayjs.duration(this.eventEndTime.diff(this.eventStartTime)).asMinutes()
    },

    eventHeight: function () {
      // (event duration / five minutes) * five_minute_height
      return 'height: ' + big(this.eventDuration).div(5).times(this.workdayOptions().five_minute_height).toNumber() + 'px;'
    },

    eventStartTime: function () {
      return dayjs(this.event.start_time)
    },

    eventEndTime: function () {
      return dayjs(this.event.end_time)
    },

    eventBackgroundColor: function () {
      return `background-color: ${this.event.color}; `
    },

    eventStyle: function () {      
      return `${this.eventBackgroundColor} ${this.eventHeight}`
    }
  },

  methods: {

  }
}

</script>