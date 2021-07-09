(() => {
  const differentTime = (year, month, day) => {
    const actualTime = new Date().getTime();
    const dateBirthDay = new Date(year, month, day).getTime();
    const differentTime = dateBirthDay - actualTime;
    return differentTime;
  };

  const calculateTimeYear = (year, month, day) => {
    setInterval(() => {
      const timeActual = differentTime(year, month, day),
        dayActual = parseInt(timeActual / 8.64e7),
        hoursActual = parseInt((timeActual % 8.64e7) / 3.6e6),
        minutesActual = parseInt((timeActual % 3.6e6) / 60000),
        secondsActual = parseInt((timeActual % 60000) / 1000);
    }, 1000);
  };
  calculateTimeYear(2021, 8, 21);
})();
