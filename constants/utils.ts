export const getDateStringFromUTCString = (dateString: Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  const hours = date.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
};
