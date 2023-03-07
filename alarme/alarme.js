const tempoPresente = document.querySelector("#alarme h1");
const audio = new Audio("alarme/alarme.mp3");

audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const upcomingAlarmList = document.querySelector("#upcoming-alarms-list");
const addAlarm = document.querySelector(".setAlarm");

const alarmList = [];

function ring(realTime) {
  audio.play();
  alert(`São ${realTime}`);
}

let msg = document.querySelector(".msg p");

function atualizarHora() {
  const today = new Date();
  const hour = formatTime(today.getHours());
  const minutes = formatTime(today.getMinutes());
  const seconds = formatTime(today.getSeconds());
  const realTime = `${hour}:${minutes}:${seconds}`;

  tempoPresente.innerText = `${hour} : ${minutes} : ${seconds}`;

  if (alarmList.includes(realTime)) {
    ring(realTime);
  }

  if (hour >= 6 && hour < 12) {
    //dia
    msg.innerHTML = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    //tarde
    msg.innerHTML = "Boa tarde";
  } else {
    //noite
    msg.innerHTML = "Boa noite";
  }
}

function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}

function stopAlarm() {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }
}

upcomingAlarmList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

const remove = (value) => {
  let newList = alarmList.filter((time) => time != value);
  alarmList.length = 0;
  alarmList.push.apply(alarmList, newList);
};

function addNewAlarm(newAlarm) {
  const html = `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Excluir</button>       
    </li>`;
  upcomingAlarmList.innerHTML += html;
}

addAlarm.addEventListener("submit", (event) => {
  event.preventDefault();

  let hour = formatTime(addAlarm.hr.value);
  if (hour === "0") {
    hour = "00";
  }
  let minute = formatTime(addAlarm.min.value);
  if (minute === "0") {
    minute = "00";
  }
  let second = formatTime(addAlarm.sec.value);
  if (second === "0") {
    second = "00";
  }

  const newAlarm = `${hour}:${minute}:${second}`;

  if (isNaN(newAlarm)) {
    if (!alarmList.includes(newAlarm)) {
      alarmList.push(newAlarm);
      addNewAlarm(newAlarm);
      addAlarm.reset();
    } else {
      alert(`Alarme para ${newAlarm} já criado.`);
    }
  } else {
    alert("Alarme inválido");
  }
});

setInterval(atualizarHora, 1000);


