function alertBadge(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#DE413A";
  secondsSpan.style.background = "#DE413A";
};

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
};

function initializeClockOne(id, endtime) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClockOne() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockOne);
      clockOne = null;
      alertBadge(id);
    }
  }

  updateClockOne();
  var clockOne = setInterval(updateClockOne, 1000);
};

function initializeClockTwo(id, endtime) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  document.getElementById('reset-one').style.display = "none"

  function updateClockTwo() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockTwo);
      clockTwo = null;
      alertBadge(id);
      document.getElementById('reset-one').style.display = "inline-block"
    }
  }

  updateClockTwo();
  var clockTwo = setInterval(updateClockTwo, 1000);
};

function initializeClockThree(id, endtime) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var resetButton = clock.querySelector('.reset-button');
  document.getElementById('reset-two').style.display = "none"

  function updateClockThree() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockThree);
      clockThree = null;
      alertBadge(id);
      document.getElementById('reset-two').style.display = "inline-block"
    }
  }

  updateClockThree();
  var clockThree = setInterval(updateClockThree, 1000);
};

function resetClock(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#C26225";
  secondsSpan.style.background = "#C26225";
  var currentTime = Date.parse(new Date());
  var deadline  = new Date(currentTime + 12*60*1000);
  var deadline2 = new Date(currentTime +  4*60*1000);
  var deadline3 = new Date(currentTime +  4*60*1000);

  if (id == 'clockdiv') {
    clearInterval(clockOne);
    clockOne = null;
    var clockOne = initializeClockOne('clockdiv', deadline)
    clearInterval(clockTwo);
    clockTwo = null;
    var clockTwo = initializeClockTwo('clockdiv2', deadline2)
    clearInterval(clockThree);
    clockThree = null;
    var clockThree = initializeClockThree('clockdiv3', deadline3)
  } else if (id == 'clockdiv2') {
    clearInterval(clockTwo);
    clockTwo = null;
    var clockTwo = initializeClockTwo('clockdiv2', deadline2)
  } else if (id == 'clockdiv3') {
    clearInterval(clockThree);
    clockThree = null;
    var clockThree = initializeClockThree('clockdiv3', deadline3)
  }
};




window.readyHandlers = [];
window.ready = function ready(handler) {
  window.readyHandlers.push(handler);
  handleState();
};

window.handleState = function handleState () {
  if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
    while(window.readyHandlers.length > 0) {
      (window.readyHandlers.shift())();
    }
  }
};

document.onreadystatechange = window.handleState;

ready(function () {
  var timeInMinutes = 12;
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + timeInMinutes*60*1000);
  var clockOne = initializeClockOne('clockdiv', deadline);

  var currentTime2 = deadline
  var deadline2 = new Date((currentTime) + .2*60*1000);
  var clockTwo = initializeClockTwo('clockdiv2', deadline2)

  var currentTime3 = deadline
  var deadline3 = new Date((currentTime) + 4*60*1000);
  clockThree = initializeClockThree('clockdiv3', deadline3)
});
