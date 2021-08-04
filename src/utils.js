import dayjs from 'dayjs'
import hourUtils from './components/vue_workday/hours.js'

const formatDayTitle = (date) => {
  let dayObj = dayjs(date.value)
  return [dayObj.format('ddd'), dayObj.format('D')]
}

const formatLeftHours = (date) => {
    return dayjs(date).format('h A')
}

const isToday = (date) => {
  if (!date) return
  let today = new Date(`${dayjs().format('YYYY-MM-DD')}T00:00:00.000Z`)
  return date === today.toISOString()
}

const getHours = (hour_options = null) => {
  // let date = new Date()
  // date.setUTCHours(0, 0, 0, 0)
  // let iso_date = getYearMonthDay(date)

  let day_hours = hourUtils.getFullHours()
  if (hour_options) {
    let { start_hour, end_hour } = hour_options
    day_hours = day_hours.slice(start_hour, end_hour)
  }
  let hours = []
  for (let idx = 0; idx < day_hours.length; idx++) {
    let value = dayjs(`${dayjs().format('YYYY-MM-DD')} ${day_hours[idx]}`).format('YYYY-MM-DD HH:mm:ss')
    hours.push({
      value,
      index: idx,
      visible: true
    })
  }
  return hours
}

const getHourlessDate = (date_string) => {
  let today = date_string ? new Date(date_string) : new Date()
  let year = today.getFullYear() + "",
    month = (today.getMonth() + 1 + "").padStart(2, "0"),
    day = (today.getDate() + "").padStart(2, "0")

  return `${year}-${month}-${day}T00:00:00.000Z`
}

const getYearMonthDay = (date_string) => {
  return getHourlessDate(date_string).slice(0, 10)
}

const sortStartFinishTimes = (workdayArray, fieldToSort, earliestFirst = true) => {
  const my_workdays = JSON.parse(JSON.stringify(workdayArray))
  my_workdays.sort((a, b) => {
    const timeA = dayjs(`${dayjs().format('YYYY-MM-DD')} ${dayjs(a[fieldToSort]).format('HH:mm:ss')}`)
    const timeB = dayjs(`${dayjs().format('YYYY-MM-DD')} ${dayjs(b[fieldToSort]).format('HH:mm:ss')}`)
    if (timeA.isAfter(timeB)) {
      if (earliestFirst) {
        return 1
      } else {
        return -1
      }
    } else {
      if (earliestFirst) {
        return -1
      } else {
        return 1
      }
    }
  })
  if (parseInt(dayjs(my_workdays[0][fieldToSort]).format('mm')) > 0) {    
    return parseInt(dayjs(my_workdays[0][fieldToSort]).format('HH')) + 1
  } else {
    return parseInt(dayjs(my_workdays[0][fieldToSort]).format('HH'))
  }
}

const workday = (date, workdayArray) => {
  return workdayArray.filter(workday => {
    return dayjs(workday.start_time).format('YYYY-MM-DD') === dayjs(date.value).format('YYYY-MM-DD')
  })
}

export { 
  workday,
  isToday,
  getHours,
  formatDayTitle,
  formatLeftHours,
  sortStartFinishTimes
}
export default {
  workday,
  isToday,
  getHours,
  formatDayTitle,
  formatLeftHours,
  sortStartFinishTimes
}