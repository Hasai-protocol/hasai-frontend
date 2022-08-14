import DurationPlugin from 'dayjs/plugin/duration';
import utcPlugin from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utcPlugin);
dayjs.extend(DurationPlugin);
