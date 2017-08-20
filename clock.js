function saveNote() {
  var newNote = document.getElementById('note');
  var newColorOne = document.getElementById('colorOne').value;
  var newColorTwo = document.getElementById('colorTwo').value;
  var newColorThree = document.getElementById('colorThree').value;
  var element  = document.getElementById('note-list'); // assuming ul exists
  var fragment = document.createDocumentFragment();

  if (newNote) {
    notes.push(newNote.value)
    var liElement = document.createElement('li');
    liElement.textContent = notes[notes.length-1];
    liElement.style.backgroundColor = newColorTwo;
    liElement.style.color = newColorThree;
    liElement.borderLeftColor = newColorOne;
    fragment.appendChild(liElement);
    element.appendChild(fragment);
  }
  newNote.value = '';
  return newNote.value
}

function alertBadge(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#44a36f";
  secondsSpan.style.background = "#44a36f";
};

function alertBadgeRemove(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#282c34";
  secondsSpan.style.background = "#282c34";
};

function clearHist() {
  shieldLaps = []
  invisLaps = []
  invisList = document.getElementById('invis-laps')
  while( invisList.firstChild ){
    invisList.removeChild( invisList.firstChild );
  }
  shieldList = document.getElementById('shield-laps')
  while( shieldList.firstChild ){
    shieldList.removeChild( shieldList.firstChild );
  }
}

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
  document.getElementById('match').style.cursor = "not-allowed";
  var old_element = document.getElementById("match");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
  var t = getTimeRemaining(endtime);

  function updateClockOne() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(clockOne);
      clockOne = null;
      alertBadge(id);
      document.getElementById('match').style.color = "#44a36f";
      document.getElementById('match').style.cursor = "pointer";

      document.getElementById('match').addEventListener("click", function(e) {
        resetClock(id);
      }, false);

      var two_old_element = document.getElementById("clock-two");
      var two_new_element = two_old_element.cloneNode(true);
      two_old_element.parentNode.replaceChild(two_new_element, two_old_element);

      var three_old_element = document.getElementById("clock-three");
      var three_new_element = three_old_element.cloneNode(true);
      three_old_element.parentNode.replaceChild(three_new_element, three_old_element);
    }
  }

  updateClockOne();
  clockOne = setInterval(updateClockOne, 1000);

  return endtime;
};

function initializeClockTwo(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  alertBadgeRemove(id);
  document.getElementById('shield').className = "shield";
  var old_element = document.getElementById("shield");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);

  function updateClockTwo() {
    clockTwoTimeLeft = getTimeRemaining(endTimeClockTwo);

    minutesSpan.innerHTML = ('0' + clockTwoTimeLeft.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + clockTwoTimeLeft.seconds).slice(-2);

    if (clockTwoTimeLeft.total <= 0) {
      clearInterval(clockTwo);
      clockTwo = null;
      clockTwoTimeLeft = null;
      endTimeClockTwo = null;
      alertBadge(id);
      document.getElementById('shield').className = "shield green";
      document.getElementById('shield').addEventListener("click", function(e) {
        resetClock(id);
      }, false);
    }
  }

  updateClockTwo();
  clockTwo = setInterval(updateClockTwo, 1000);

  return endTimeClockTwo;
};

function initializeClockThree(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  // var resetButton = clock.querySelector('.reset-button');
  var eye = document.getElementById('eye')
  alertBadgeRemove(id);
  document.getElementById('eye').className = "eye"
  var old_element = document.getElementById("eye");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);

  function updateClockThree() {
    clockThreeTimeLeft = getTimeRemaining(endTimeClockThree);

    minutesSpan.innerHTML = ('0' + clockThreeTimeLeft.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + clockThreeTimeLeft.seconds).slice(-2);

    if (clockThreeTimeLeft.total <= 0) {
      clearInterval(clockThree);
      clockThree = null;
      clockThreeTimeLeft = null;
      endTimeClockThree = null;
      alertBadge(id);
      document.getElementById('eye').className = "eye green";
      document.getElementById('eye').addEventListener("click", function(e) {
        resetClock(id);
      }, false);
    }
  }

  updateClockThree();
  clockThree = setInterval(updateClockThree, 1000);

  return endTimeClockThree;
};

function resetClock(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#282c34";
  secondsSpan.style.background = "#282c34";
  var currentTime = Date.parse(new Date());
  var deadline  = new Date(currentTime + 12*60*1000);

  if (id == 'clock-one') {
    clearInterval(clockOne);
    clockOne = null;
    clearHist()
    var one_old_element = document.getElementById("clock-one");
    var one_new_element = one_old_element.cloneNode(true);
    one_old_element.parentNode.replaceChild(one_new_element, one_old_element);
    clockOne = initializeClockOne('clock-one', deadline)
    clearInterval(clockTwo);
    clockTwo = null;
    clearInterval(clockThree);
    clockThree = null;
  } else if (id == 'clock-two') {
    clearInterval(clockTwo);
    clockTwo = null;
    clockTwoTimeLeft = null;
    endTimeClockTwo = null;
    endTimeClockTwo = new Date(currentTime +  2*60*1000);
    recordShieldLap()
    var two_old_element = document.getElementById("clock-two");
    var two_new_element = two_old_element.cloneNode(true);
    two_old_element.parentNode.replaceChild(two_new_element, two_old_element);
    clockTwo = initializeClockTwo('clock-two')
  } else if (id == 'clock-three') {
    clearInterval(clockThree);
    clockThree = null;
    clockThreeTimeLeft = null;
    endTimeClockThree = null;
    endTimeClockThree = new Date(currentTime +  2*60*1000);
    recordInvisLap()
    var three_old_element = document.getElementById("clock-three");
    var three_new_element = three_old_element.cloneNode(true);
    three_old_element.parentNode.replaceChild(three_new_element, three_old_element);
    clockThree = initializeClockThree('clock-three')
    console.log(clockThree)
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

function recordShieldLap() {
  time = getTimeRemaining(clockOne)
  var element  = document.getElementById('shield-laps'); // assuming ul exists
  var fragment = document.createDocumentFragment();

  if (time) {
    shieldLaps.push(time.minutes + ':' + time.seconds)

    var liElement = document.createElement('li');
    liElement.textContent = shieldLaps[shieldLaps.length-1];
    fragment.appendChild(liElement);

    element.appendChild(fragment);
  }

  return time.minutes + ':' + time.seconds
};

function recordInvisLap() {
  time = getTimeRemaining(clockOne)
  var element  = document.getElementById('invis-laps'); // assuming ul exists
  var fragment = document.createDocumentFragment();

  if (time) {
    invisLaps.push(time.minutes + ':' + time.seconds)

    var liElement = document.createElement('li');
    liElement.textContent = invisLaps[invisLaps.length-1];
    fragment.appendChild(liElement);

    element.appendChild(fragment);
  }

  return time.minutes + ':' + time.seconds
};

function minusSeconds(id, seconds) {
  var sec = seconds * 1000
  if (id == 'clock-two') {
    console.log(clockTwo)
    // clockTwo.setSeconds(clockTwo.getSeconds() - seconds);
    console.log(endTimeClockTwo);
    clearInterval(clockTwo);
    clockTwo = null;
    clockTwoTimeLeft = null;
    endTimeClockTwo = new Date(endTimeClockTwo.getTime() - sec);
    console.log(endTimeClockTwo);
    var two_old_element = document.getElementById(id);
    var two_new_element = two_old_element.cloneNode(true);
    two_old_element.parentNode.replaceChild(two_new_element, two_old_element);
    clockTwo = initializeClockTwo(id);
    console.log(clockTwo);

  } else if (id == 'clock-three') {
    console.log(clockThree);
    // clockThree = clockThree.setSeconds(clockThree.getSeconds() - seconds);
    console.log(endTimeClockThree);
    clearInterval(clockThree);
    clockThree = null;
    clockThreeTimeLeft = null;
    endTimeClockThree = new Date(endTimeClockThree.getTime() - sec);
    console.log(endTimeClockThree);
    var three_old_element = document.getElementById(id);
    var three_new_element = three_old_element.cloneNode(true);
    three_old_element.parentNode.replaceChild(three_new_element, three_old_element);
    clockThree = initializeClockThree(id);
    console.log(clockThree);
  }
};

var clockOne;
var clockTwo;
var clockThree;
var endTimeClockOne;
var endTimeClockTwo;
var endTimeClockThree;
var clockOneTimeLeft;
var clockTwoTimeLeft;
var clockThreeTimeLeft;

ready(function () {
  shieldLaps = []
  invisLaps = []
  notes = []
  // clockOne = undefined;
  // clockTwo = undefined;
  // clockThree = undefined;
  currentTime = Date.parse(new Date());
  deadline = new Date(currentTime + .2*60*1000);

  document.getElementById('match').addEventListener("click", function(e) {
    resetClock('clock-one');
  }, false);

  document.getElementById('shield').addEventListener("click", function(e) {
    resetClock('clock-two');
  }, false);

  document.getElementById('eye').addEventListener("click", function(e) {
    resetClock('clock-three');
  }, false);

  document.getElementById('clock-two-minus-two').addEventListener("click", function(e) {
    minusSeconds('clock-two', 2);
  }, false);

  document.getElementById('clock-two-minus-three').addEventListener("click", function(e) {
    minusSeconds('clock-two', 3);
  }, false);

  document.getElementById('clock-two-minus-five').addEventListener("click", function(e) {
    minusSeconds('clock-two', 5);
  }, false);


  document.getElementById('clock-three-minus-two').addEventListener("click", function(e) {
    minusSeconds('clock-three', 2);
  }, false);

  document.getElementById('clock-three-minus-three').addEventListener("click", function(e) {
    minusSeconds('clock-three', 3);
  }, false);

  document.getElementById('clock-three-minus-five').addEventListener("click", function(e) {
    minusSeconds('clock-three', 5);
  }, false);


});
