(() => {
  const formDOMEL = document.getElementById("form");
  const modalDOMEL = document.getElementById("modal");

  const calculateTime= (milliSecondsTime) => {
    let time = 1000;
    setInterval(() => {
      const dayActual = parseInt(milliSecondsTime / 8.64e7),
      hoursActual = parseInt((milliSecondsTime % 8.64e7) / 3.6e6),
      minutesActual = parseInt((milliSecondsTime % 3.6e6) / 60000),
      secondsActual = parseInt((milliSecondsTime % 60000) / 1000);
      milliSecondsTime = milliSecondsTime - time;
      console.log(secondsActual);
    },time);
  };

  const setDeadTime = (form) => {
    let milliSecondsTime = [
      form.get("days") * 8.64e7,
      form.get("hours") * 3.6e6,
      form.get("minutes") * 60000,
      form.get("seconds") * 1000,
    ].reduce((prev, next) => prev + next, 0);
    return milliSecondsTime
  };

  const getDatesForm = (target) => {
    const targetAll = [...target.querySelectorAll("input")];
    const mapTarget = new Map();
    targetAll.forEach((input) =>
      mapTarget.set(input.name, parseInt(input.value))
    );
    return mapTarget;
  };

  const handleToSubmit = (e) => {
    e.preventDefault();
    const datesForm = getDatesForm(e.target);
    const convertTime= setDeadTime(datesForm);
    const intervalTime=calculateTime(convertTime);
    modalDOMEL.classList.add("modal--show");
  };
  formDOMEL.addEventListener("submit", (e) => handleToSubmit(e));
})();
