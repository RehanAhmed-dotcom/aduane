export function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function format12To24(time: any) {
  let hours = Number(time.match(/^(\d+)/)[1]);
  let minutes = Number(time.match(/:(\d+)/)[1]);
  let AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == 'PM' && hours < 12) hours = hours + 12;
  if (AMPM == 'AM' && hours == 12) hours = hours - 12;
  let sHours = hours.toString();
  let sMinutes = minutes.toString();
  if (hours < 10) sHours = '0' + sHours;
  if (minutes < 10) sMinutes = '0' + sMinutes;

  return `${sHours}.${sMinutes}`;
}

export function isRestaurantClosed(open: string, close: string) {
  return (
    format12To24(open) < format12To24(formatAMPM(new Date())) &&
    format12To24(close) < format12To24(formatAMPM(new Date()))
  );
}
