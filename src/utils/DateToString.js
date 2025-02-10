const DateToString = (date) => {
  const writtenDate = new Date(date);
  const year = writtenDate.getFullYear();

  let month;
  if (writtenDate.getMonth() < 10) month = "0" + (writtenDate.getMonth() + 1);
  else month = writtenDate.getMonth() + 1;

  let dDate;
  if (writtenDate.getDate() < 10) dDate = "0" + (writtenDate.getDate() + 1);
  else dDate = writtenDate.getDate() + 1;

  let hour;
  if (writtenDate.getHours() < 10) hour = "0" + (writtenDate.getHours() + 1);
  else hour = writtenDate.getHours() + 1;

  let minute;
  if (writtenDate.getMinutes() < 10)
    minute = "0" + (writtenDate.getMinutes() + 1);
  else minute = writtenDate.getMinutes() + 1;
  return `${year}:${month}:${dDate}:${hour}:${minute}`;
};

export default DateToString;
