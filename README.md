# eos_vue_workday

## A Vue component to display an event scheduling diary
Based on a working day, each working day object will contain its own list of events
* Allows creation of a schedule for multiple users on each calendar day
* Allows for for appointments/events to be created only on days with a schedule
* Allows for custom behaviour in reacting to component events, simply update the workday events array

Main component is the WorkdayContainer
This takes 2 props 
1. An workday array
2. A workday options object

### Workday Object
| Property | Type (description) |
| -------- | ------------------ |
| id | String (schedule/workday id) |
| start_time | String (the start time of the work day) |
| finish_time | String (the end time of the work day) |
| user | Object (a user object see below) |
| events | Array (an array of event objects for this day) |
| other | Array (optional, an array of other objects/data which you can add and which will be included in the cellEvent) |

### User Object
| Property | Type (description) |
| -------- | ------------------ |
| id | String (user id) |
| name | String |

### Event Object
| Property | Type (description) |
| -------- | ------------------ |
| id | String (event id) |
| user_id | String |
| title | String (event title) |
| description | String (a description for the event) |
| color | String (a hex color for the event) |
| start_time | String (a start time and date for the event in the format YYY-MM-DD HH:mm:ss) |
| end_time | String (an end time and date for the event in the same format as start time) |

### Workday Options Object
| Property | Type (description) |
| -------- | ------------------ |
| mode | String (either of 'week' or 'day') |
| five_minute_height | Number (the number of pixels to represent 5 minutes on the calendar) |
| focus_date | String (date the calendar will set as the current date) |
| primary_color | String (hex color for the current day) |

### Events
| Event | Description |
| ----- | ----------- |
| cellClick | emitted when an empty cell is clicked, use to book an event |
| eventClick | emitted when an event is clicked, use to update or delete an event |

| Event | Payload |
| ----- | ------- |
| cellClick | cellData { index (Number), value ( String 'YYYY-MM-DD HH:mm:ss')} |
| evnetClick | event (an event object) |