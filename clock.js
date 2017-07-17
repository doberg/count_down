function saveNote() {
  var newNote = document.getElementById('note');
  console.log(newNote.value);

  var element  = document.getElementById('note-list'); // assuming ul exists
  var fragment = document.createDocumentFragment();

  if (newNote) {
    notes.push(newNote.value)
    for (var i = 0, n; n = notes[i]; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = n;
      fragment.appendChild(liElement);
    }

    element.appendChild(fragment);
  }

  return newNote.value
}

function alertBadge(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#d13b2e";
  secondsSpan.style.background = "#d13b2e";
};

function alertBadgeRemove(id) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  minutesSpan.style.background = "#282c34";
  secondsSpan.style.background = "#282c34"
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
      document.getElementById('match').style.color = "#d13b2e";
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
  var clockOne = setInterval(updateClockOne, 1000);

  return endtime;
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
  var deadline  = new Date(currentTime + .3*60*1000);
  var deadline2 = new Date(currentTime +  .05*60*1000);
  var deadline3 = new Date(currentTime +  .05*60*1000);

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
    recordShieldLap()
    var two_old_element = document.getElementById("clock-two");
    var two_new_element = two_old_element.cloneNode(true);
    two_old_element.parentNode.replaceChild(two_new_element, two_old_element);
    var clockTwo = initializeClockTwo('clock-two', deadline2)
  } else if (id == 'clock-three') {
    clearInterval(clockThree);
    clockThree = null;
    recordInvisLap()
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

function recordShieldLap() {
  time = getTimeRemaining(clockOne)
  if (time) {
    shieldLaps.push(time.minutes + ':' + time.seconds)
    for (var i = 0, n; n = shieldLaps[i]; i++) {
        var liElement = document.createElement('li');
        liElement.innerText = n;
    }
    document.getElementById('shield-laps').appendChild(liElement);
  }

  return time.minutes + ':' + time.seconds
};

function recordInvisLap() {
  time = getTimeRemaining(clockOne)

  if (time) {
    invisLaps.push(time.minutes + ':' + time.seconds)
    for (var i = 0, n; n = invisLaps[i]; i++) {
        var liElement = document.createElement('li');
        liElement.innerText = n;
    }
    document.getElementById('invis-laps').appendChild(liElement);
  }

  return time.minutes + ':' + time.seconds
};

ready(function () {
  shieldLaps = []
  invisLaps = []
  notes = []
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + .3*60*1000);
  clockOne = initializeClockOne('clock-one', deadline);

  var currentTime2 = deadline
  var deadline2 = new Date((currentTime) + .05*60*1000);
  var clockTwo = initializeClockTwo('clock-two', deadline2)

  var currentTime3 = deadline
  var deadline3 = new Date((currentTime) + .05*60*1000);
  var clockThree = initializeClockThree('clock-three', deadline3)
});
