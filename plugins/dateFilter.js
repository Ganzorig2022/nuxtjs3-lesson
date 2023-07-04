
export default defineNuxtPlugin((nuxtApp) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const formattedDate = day + " " + months[month] + " " + year;
    return formattedDate; // 3. July 2023

  }

  nuxtApp.dateFilter = (value) => { return formatDate(value) }
})

