export function getCurrentDate(separator = "") {
  let myCurrentDate = new Date();
  let date = myCurrentDate.getDate();
  let month = myCurrentDate.getMonth() + 1;
  let year = myCurrentDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}
