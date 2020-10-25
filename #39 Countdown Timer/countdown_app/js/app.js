const dateCountdown = document.querySelector('#date-countdown');
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');

const minDate = () => {
   const targetedDate = new Date();
   const getTommorow = targetedDate.setDate(targetedDate.getDate() + 1);
   const tommorowDate = new Date(getTommorow).toISOString().slice(0, 10);
   dateCountdown.setAttribute('min', tommorowDate);
};

const getDateValue = (date) => {
   return date.value;
};

const showDate = () => {
   let date = getDateValue(dateCountdown);
   let dateInput = new Date(date).setHours(0);
   const currentDate = new Date();

   if (isNaN(dateInput)) dateInput = new Date();

   const totalSecond = (dateInput - currentDate) / 1000;
   const days = Math.floor(totalSecond / 3600 / 24);
   const hours = Math.floor(totalSecond / 3600) % 24;
   const minutes = Math.floor(totalSecond / 60) % 24;
   const seconds = Math.floor(totalSecond % 60);

   daysElement.innerHTML = formatNumber(days);
   hoursElement.innerHTML = formatNumber(hours);
   minutesElement.innerHTML = formatNumber(minutes);
   secondsElement.innerHTML = formatNumber(seconds);
};

const formatNumber = (time) => {
   if (time < 10 && time >= 0) {
      return `0${time}`;
   } else if (time < 0) {
      return '00';
   } else {
      return time;
   }
};
minDate();
setInterval(showDate, 1000);
