function alertBadge(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#d13b2e";
  secondsSpan.style.background = "#d13b2e"
};

function alertBadgeRemove(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#282c34";
  secondsSpan.style.background = "#282c34"
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
      resetClock('clockdiv');
    }
  }

  updateClockOne();
  var clockOne = setInterval(updateClockOne, 1000);
};

function initializeClockTwo(id, endtime) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  alertBadgeRemove(id);
  document.getElementById('shield').className = "shield"

  function updateClockTwo() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockTwo);
      clockTwo = null;
      alertBadge(id);
      document.getElementById('shield').className = "shield red"
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
  alertBadgeRemove(id);
  document.getElementById('eye').className = "eye"

  function updateClockThree() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockThree);
      clockThree = null;
      alertBadge(id);
      document.getElementById('eye').className = "eye red"
    }
  }

  updateClockThree();
  var clockThree = setInterval(updateClockThree, 1000);
};

function resetClock(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#282c34";
  secondsSpan.style.background = "#282c34";
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
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + .5*60*1000);
  var clockOne = initializeClockOne('clockdiv', deadline);

  var currentTime2 = deadline
  var deadline2 = new Date((currentTime) + .1*60*1000);
  var clockTwo = initializeClockTwo('clockdiv2', deadline2)

  var currentTime3 = deadline
  var deadline3 = new Date((currentTime) + .4*60*1000);
  clockThree = initializeClockThree('clockdiv3', deadline3)
});
