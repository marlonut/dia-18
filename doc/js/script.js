(() => {
  const formDOMEL = document.getElementById("form");
  const modalDOMEL = document.getElementById("modal");
  const flipCounterAllDOMEL = [...document.querySelectorAll(".flip__wrapper")];

  const animateTimer = (contentDOM, timers) => {
    console.log(timers);
    [...contentDOM.children].forEach((el) => {
      if (timers[0] < 10) {
        el.setAttribute(["data-initial"], "0".concat(timers[0].toString()));
        el.setAttribute(["data-last"], timers[1]);
      }
      if (timers[1] < 10) {
        el.setAttribute(["data-initial"], timers[0]);
        el.setAttribute(["data-last"], "0".concat(timers[1].toString()));
      }
      if ((timers[0] >=10) & (timers[1] >=10)) {
        el.setAttribute(["data-initial"], timers[0]);
        el.setAttribute(["data-last"], timers[1]);
      }
    });
  };

  const timerDates = (milliSecondsTime) => {
    let dayActual = parseInt(milliSecondsTime / 8.64e7),
      hoursActual = parseInt((milliSecondsTime % 8.64e7) / 3.6e6),
      minutesActual = parseInt((milliSecondsTime % 3.6e6) / 60000),
      secondsActual = parseInt((milliSecondsTime % 60000) / 1000);
    return [
      [dayActual - 1, dayActual],
      [hoursActual - 1, hoursActual],
      [minutesActual - 1, minutesActual],
      [secondsActual - 1, secondsActual],
    ];
  };
  const calculateTime = (milliSecondsTime) => {
    let time = 1000;
    setInterval(() => {
      let datesTimeCount = timerDates(milliSecondsTime);
      let [daysTime, hoursTime, minutesTime, secondsTime] = datesTimeCount;

      if (secondsTime[1] < 0) alert("end  to timer");
      if (hoursTime[0] < 0) hoursTime[0] = 59;
      if (minutesTime[0] < 0) minutesTime[0] = 59;
      if (secondsTime[0] < 0) secondsTime[0] = 59;
      datesTimeCount.forEach((time, id) =>
        animateTimer(flipCounterAllDOMEL[id], time)
      );
      milliSecondsTime = milliSecondsTime - time;
    }, time);
  };
  const setDeadTime = (form) => {
    let milliSecondsTime = [
      form.get("days") * 8.64e7,
      form.get("hours") * 3.6e6,
      form.get("minutes") * 60000,
      form.get("seconds") * 1000,
    ].reduce((prev, next) => prev + next, 0);
    return milliSecondsTime;
  };

  const getDatesForm = (target) => {
    const targetAll = [...target.querySelectorAll("input")];
    const mapTarget = new Map();
    targetAll.forEach((input) =>
      mapTarget.set(input.name, parseInt(input.value))
    );
    return mapTarget;
  };

  // const writeToCount = (timer) => {
  //   const timing = timerDates(timer);
  //   console.log(timing);
  //   flipCounterAllDOMEL.forEach((content, id) => {
  //     animateTimer(content, timing[id]);
  //   });
  // };
  const handleToSubmit = (e) => {
    e.preventDefault();
    const datesForm = getDatesForm(e.target);
    const convertTime = setDeadTime(datesForm);
    // writeToCount(convertTime);
    const intervalTime = calculateTime(convertTime);
    modalDOMEL.classList.add("modal--show");
  };

  formDOMEL.addEventListener("submit", (e) => handleToSubmit(e));
})();
