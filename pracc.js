let dice = document.querySelectorAll("#dice");
let scores = document.querySelectorAll(".grid-item")

let clikables = document.querySelectorAll("#clikable")

let rollknap = document.getElementById("rollKnap")
let restartKnap = document.getElementById("restart")

let _upperSectionTotal = document.getElementById("upperSectionTotal")
let _bonus = document.getElementById("bonus")
let _grandTotal = document.getElementById("grandtotal")

let _threeOfAKind = clikables[6]
let _fourOfAKind = clikables[7]
let _fullHouse = clikables[8]
let _smallStraight = clikables[9]
let _largeStraight = clikables[10]
let _Chance = clikables[11]
let _yatzy = clikables[12]

let h2 = document.querySelector("h2")

let upperSelcetionTotal = 0;
let grandTotal = 0;
let rollCount = 0;
let hasPicked = true;

let diceLocked = [false, false, false, false, false]
let scoreLocked = [false, false, false, false, false, false, false, false, false, false, false, false]
let calculateScore = [singles, singles, singles, singles, singles, singles, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, chance, yatzy]
let diceFrequncy = [0, 0, 0, 0, 0, 0]

for (let i = 0; i < dice.length; i++) {
  dice[i].onclick = () => {
    if (rollCount === 0) return;
    if (diceLocked[i]) {
      diceLocked[i] = false;
      dice[i].style.backgroundColor = "White";
    } else {
      diceLocked[i] = true;
      dice[i].style.backgroundColor = "blue";
    }
  }
}

restart();

restartKnap.onclick = () => restart();
rollknap.onclick = () => roll();

// Funktion til kastning af terninger
function roll() {
  hasPicked = false;
  rollCount++;
  h2.textContent = "ANTAL SLAG SLÅET: " + rollCount;
  diceFrequncy = [0, 0, 0, 0, 0, 0]
  for (let i = 0; i < dice.length; i++) {
    if (!diceLocked[i]) {
      dice[i].value = Math.floor(Math.random() * 6) + 1;
    }
    diceFrequncy[dice[i].value - 1] += 1;
  }

  for (let i = 0; i < clikables.length; i++) {
    if (scoreLocked[i] === true) continue;
    calculateScore[i](i);
  }

  if (rollCount === 1) {
    dice.forEach(die => {
      die.style.color = "black"
      die.style.borderColor = "black"
    });
  }

  if (rollCount === 3) {
    rollknap.disabled = true;
    return;
  }
}

// Genstarter spillet
function restart() {
  rollknap.disabled = false;
  h2.textContent = "ANTAL SLAG SLÅET: 0";
  for (let i = 0; i < dice.length; i++) {
    dice[i].value = 0;
    dice[i].style.backgroundColor = "White";
    diceLocked[i] = false;
    rollCount = 0;
  }
  upperSelcetionTotal = 0;
  grandTotal = 0;
  rollCount = 0;
  hasPicked = true;
  diceFrequncy = [0, 0, 0, 0, 0, 0]
  _upperSectionTotal.textContent = "0"
  _grandTotal.textContent = "0"

  for (let i = 0; i < clikables.length; i++) {
    clikables[i].onclick = () => handleClick(i)
    clikables[i].style.backgroundColor = "White"
    clikables[i].textContent = "0"
    scoreLocked[i] = false;
  }
}

// Når spilleren vælger points
function handleClick(i) {
  if (hasPicked || scoreLocked[i]) {
    return
  }
  hasPicked = true;

  scoreLocked[i] = true;

  clikables[i].style.backgroundColor = "gray";
  clikables[i].disabled = true;

  for (let i = 0; i < dice.length; i++) {
    dice[i].style.color = "gray"
    dice[i].style.borderColor = "gray"
    dice[i].style.backgroundColor = "White";
    diceLocked[i] = false;
  }

  rollCount = 0;
  h2.textContent = "ANTAL SLAG SLÅET: 0";
  rollknap.disabled = false;

  if (i < 6) { // antal af ens / upperSelection'
    upperSelcetionTotal += parseInt(clikables[i].textContent);
    grandTotal += parseInt(clikables[i].textContent);
    _upperSectionTotal.textContent = "" + upperSelcetionTotal;
    if (upperSelcetionTotal >= 63) {
      _bonus.textContent = "50";
      _upperSectionTotal.textContent = upperSelcetionTotal + parseInt(_bonus.textContent);
    }
  } else { // andre / lowerSelection
    grandTotal += parseInt(clikables[i].textContent);
  }
  _grandTotal.textContent = "" + grandTotal;

  for (let i = 0; i < scoreLocked.length; i++) {
    if (!scoreLocked[i]) {
      return
    }
  }
  setTimeout(end,500)
}

function end() {
  alert("Spillet er færdigt, og din slut score er: " + grandTotal)
  restart()
}



function singles(i) {
  clikables[i].textContent = "" + diceFrequncy[i] * (i + 1);
}

function threeOfAKind() {
  _threeOfAKind.textContent = "0";
  for (let j = 0; j < diceFrequncy.length; j++) {
    if (diceFrequncy[j] >= 3) {
      _threeOfAKind.textContent = "" + (j + 1) * 3;
    }
  }
}

function fourOfAKind() {
  _fourOfAKind.textContent = "0";
  for (let j = 0; j < diceFrequncy.length; j++) {
    if (diceFrequncy[j] >= 4) {
      _fourOfAKind.textContent = "" + (j + 1) * 4;
    }
  }
}

function fullHouse() {
  _fullHouse.textContent = "0";
  for (let I = 0; I < diceFrequncy.length; I++) {
    if (diceFrequncy[I] == 3) {
      for (let j = 0; j < diceFrequncy.length; j++) {
        if (I != j && diceFrequncy[j] == 2) {
          _fullHouse.textContent = "" + ((I + 1) * 3 + (j + 1) * 2);
        }
      }
    }
  }
}


function smallStraight() {
  for (let i = 0; i < diceFrequncy.length - 1; i++) {
    if (diceFrequncy[i] != 1) {
      _smallStraight.textContent = "0";
      return;
    }
  }
  _smallStraight.textContent = "15";
}

function largeStraight() {
  for (let i = 1; i < diceFrequncy.length; i++) {
    if (diceFrequncy[i] != 1) {
      _largeStraight.textContent = "0";
      return;
    }
  }
  _largeStraight.textContent = "20";
}


function chance() {
  let sum = 0;
  for (let i = 0; i < diceFrequncy.length; i++) {
    sum += diceFrequncy[i] * i;

  }
  _Chance.textContent = "" + sum;
}

function yatzy() {
  for (let i = 0; i < diceFrequncy.length; i++) {
    if (diceFrequncy[i] === 5) {
      _yatzy.textContent = "50"
    }
  }
}