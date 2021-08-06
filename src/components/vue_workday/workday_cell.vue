<template>
  <li 
  @click.stop="cellClickEvent"  
  class="calendar-cell"  
  :style="`height: ${cellHeight}px`">
    <!-- to view all the times uncomment this line below -->
    <!-- <span style="font-size: 7px">{{cellData.value}}</span> -->
    <template>
      <workday-event 
      @eventClick="emitEventClick"
      :style="`width: calc(${eventWidth}% + 0px);` + 'left: calc('+ calcLeftInset(eventWidth, index) +'% + 0px)'"
      v-for="(event, index) in cellEvents" 
      :key="event.id" 
      :event="event" 
      :cellData="cellData"></workday-event>
    </template>
  </li>
</template>

<script>
/*  global  */
import WorkdayEvent from './workday_event.vue'
import big from 'big.js'
export default {
  name: 'WorkdayCell',

  props: {
    cellData: Object,
    workday: Object
  },

  data: function () {
    return {

    }
  },

  inject: ['workdayOptions'],

  components: {
    WorkdayEvent
  },

  mounted () {

  },

  computed: {
    cellHeight: function () {
      // remove one for the border
        return this.workdayOptions().five_minute_height - 1
    },

    eventWidth: function () {
      // percentage width of each cell event
      return big(1).div(big(this.cellEvents.length)).times(100).toNumber()
    },

    cellEvents: function () {
      return this.workday.events.filter(event => {
        return (event.start_time === this.cellData.value)
      })
    }
  },

  methods: {
    calcLeftInset (width, index) {
      return big(width).times(index).toNumber()
    },
    
    cellClickEvent () {
      if (this.cellEvents.length) {
        return
      } else {
        this.$emit('cellClick', {
          cellData: this.cellData.value,
          workday_id: this.workday.id,
          user_id: this.workday.user.id,
          other: this.workday.other
        })
      }
    },

    emitEventClick (event) {
      this.$emit('eventClick', event)
    }
  }
}

</script>