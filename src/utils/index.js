export function getTimeAgo(time) {
  if (!(time instanceof Date)) {
    time = new Date(time);
  }
  let interval = Math.ceil((Date.now() - time) / 1000);
  let temp = 0;
  if (interval < 60) {
    if (interval === 1) return 'a second';
    return interval + ' seconds';
  }
  if ((temp = interval / 60 ) < 60) {
    if (temp < 2) return 'a minute';
    return Math.ceil(temp) + ' minutes';
  }
  if ((temp = temp / 60 ) < 24) {
    if (temp < 2) return 'an hour';
    return Math.ceil(temp) + ' hours';
  }
  if ((temp = temp / 24 ) < 30) {
    if (temp < 2) return 'a day';
    return Math.ceil(temp) + ' days';
  }
  if ((temp = temp / 30 ) < 12) {
    if (temp < 2) return 'a month';
    return Math.ceil(temp) + ' months';
  }
  if ((temp = Math.ceil(temp / 12)) === 1)
    return 'a year';
  return temp + ' years';
}
