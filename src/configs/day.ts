import dayjs from 'dayjs'

// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

// dayjs.extend(utc)
// dayjs.extend(timezone)
dayjs.extend(minMax)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
