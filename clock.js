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
  document.getElementById('match').style.color = "#e2c08d";
  var old_element = document.getElementById("match");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);

  function updateClockOne() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockOne);
      clockOne = null;
      alertBadge(id);
      document.getElementById('match').style.color = "#d13b2e";
      document.getElementById('match').addEventListener("click", function(e) {
        resetClock(id);
      }, false);

      var two_old_element = document.getElementById("clock-two");
      var two_new_element = two_old_element.cloneNode(true);
      two_old_element.parentNode.replaceChild(two_new_element, two_old_element);

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
  document.getElementById('shield').className = "shield";
  var old_element = document.getElementById("shield");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);

  function updateClockTwo() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockTwo);
      clockTwo = null;
      alertBadge(id);
      document.getElementById('shield').className = "shield red";
      document.getElementById('shield').addEventListener("click", function(e) {
        resetClock(id);
      }, false);
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
  var eye = document.getElementById('eye')
  alertBadgeRemove(id);
  document.getElementById('eye').className = "eye"
  var old_element = document.getElementById("eye");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);

  function updateClockThree() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockThree);
      clockThree = null;
      alertBadge(id);
      document.getElementById('eye').className = "eye red";
      document.getElementById('eye').addEventListener("click", function(e) {
        resetClock(id);
      }, false);
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
  var deadline2 = new Date(currentTime +  2*60*1000);
  var deadline3 = new Date(currentTime +  2*60*1000);

  if (id == 'clock-one') {
    clearInterval(clockOne);
    clockOne = null;
    var one_old_element = document.getElementById("clock-one");
    var one_new_element = one_old_element.cloneNode(true);
    one_old_element.parentNode.replaceChild(one_new_element, one_old_element);
    var clockOne = initializeClockOne('clock-one', deadline)
    clearInterval(clockTwo);
    clockTwo = null;
    var clockTwo = initializeClockTwo('clock-two', deadline2)
    clearInterval(clockThree);
    clockThree = null;
    var three_old_element = document.getElementById("clock-three");
    var three_new_element = three_old_element.cloneNode(true);
    three_old_element.parentNode.replaceChild(three_new_element, three_old_element);
    var clockThree = initializeClockThree('clock-three', deadline3)
  } else if (id == 'clock-two') {
    clearInterval(clockTwo);
    clockTwo = null;
    var two_old_element = document.getElementById("clock-two");
    var two_new_element = two_old_element.cloneNode(true);
    two_old_element.parentNode.replaceChild(two_new_element, two_old_element);
    var clockTwo = initializeClockTwo('clock-two', deadline2)
  } else if (id == 'clock-three') {
    clearInterval(clockThree);
    clockThree = null;
    var three_old_element = document.getElementById("clock-three");
    var three_new_element = three_old_element.cloneNode(true);
    three_old_element.parentNode.replaceChild(three_new_element, three_old_element);
    var clockThree = initializeClockThree('clock-three', deadline3)
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
  var clockOne = initializeClockOne('clock-one', deadline);

  var currentTime2 = deadline
  var deadline2 = new Date((currentTime) + .1*60*1000);
  var clockTwo = initializeClockTwo('clock-two', deadline2)

  var currentTime3 = deadline
  var deadline3 = new Date((currentTime) + .2*60*1000);
  clockThree = initializeClockThree('clock-three', deadline3)
});
