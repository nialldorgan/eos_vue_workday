<template>
  <li 
  @click.stop="cellClickEvent"  
  :class="[{'break-cell' : cellIsOnABreak},'calendar-cell']"  
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
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
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
        return dayjs(event.start_time).isSame(dayjs(this.cellData.value))
      })
    },

    cellIsOnABreak: function () {
      if (this.workday.breaks) {
        return this.workday.breaks.filter(breaktime => {
          return dayjs(breaktime.start_time).isSameOrBefore(dayjs(this.cellData.value)) && dayjs(breaktime.finish_time).isAfter(dayjs(this.cellData.value))
        }).length
      } else {
        return false
      }
    }
  },

  methods: {
    calcLeftInset (width, index) {
      return big(width).times(index).toNumber()
    },
    
    cellClickEvent () {
      if (this.cellIsOnABreak) {
        return
      }
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