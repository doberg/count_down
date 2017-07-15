function alertBadge(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "red";
  secondsSpan.style.background = "red";
};

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
};

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      alertBadge(id);
      if (id == 'clockdiv') {
        location.reload()
      }
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
};


function resetClock(id, time) {
  var clock = document.getElementById(id);

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
  var clockOne = initializeClock('clockdiv', deadline);

  var currentTime2 = deadline
  var deadline2 = new Date((currentTime - 1) + 4*60*1000);
  var clockTwo = initializeClock('clockdiv2', deadline2)

  var currentTime3 = deadline
  var deadline3 = new Date((currentTime - 1) + 4*60*1000);
  var clockThree = initializeClock('clockdiv3', deadline3)

  var currentTime4 = deadline
  var deadline4 = new Date((currentTime - 1) + 4*60*1000);
  var clockFour = initializeClock('clockdiv4', deadline4)
});
