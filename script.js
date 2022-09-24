// 1 - Capturar elementos

//Mode Color
const lightButton = document.querySelector('#sunButton')
const darkButton = document.querySelector('#moonButton')

//Timer

const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

const buttonPlay = document.querySelector('#play')
const buttonPause = document.querySelector('#pause')
const buttonStop = document.querySelector('#stop')
const buttonSum = document.querySelector('#sum')
const buttonSub = document.querySelector('#sub')

//Cards
const cardForest = document.querySelector('#forest')
const cardRain = document.querySelector('#rain')
const cardCoffee = document.querySelector('#coffee')
const cardFlames = document.querySelector('#flames')

//Sounds
const forestSound = new Audio('./assets/sounds/Floresta.wav')
const rainSound = new Audio('./assets/sounds/Chuva.wav')
const coffeeSound = new Audio('./assets/sounds/Cafeteria.wav')
const flamesSound = new Audio('./assets/sounds/Lareira.wav')

//Volume
let forestVolume = document.querySelector('#forestRange')
let rainVolume = document.querySelector('#rainRange')
let coffeeVolume = document.querySelector('#coffeeRange')
let flamesVolume = document.querySelector('#flamesRange')

// Criar função aonde clicar no play faz começar uma contagem regressiva
let timer
function countdown() {
  minutes = minutesDisplay
  seconds = secondsDisplay

  timer = setTimeout(function () {
    if (minutes.textContent <= 0 && seconds.textContent == 0) {
      resetTimer()
      return
    }

    if (seconds.textContent <= 0) {
      seconds.textContent = 60
      minutes.textContent = String(minutes.textContent - 1).padStart(2, 0)
    }
    seconds.textContent = String(seconds.textContent - 1).padStart(2, 0)

    countdown()
  }, 1000)
}

buttonPlay.onclick = () => {
  togglePlayPause()
  countdown()
}

// Criar função que ao clicar no play, o pause a parece e ao clicar no pause o contador pause e o play aparece
function togglePlayPause() {
  buttonPlay.classList.toggle('hide')
  buttonPause.classList.toggle('hide')
}
buttonPause.addEventListener('click', function () {
  clearTimeout(timer)
  togglePlayPause()
})

// Criar função que ao clicar no Stop o contador volte ao estado inicial e resete os controles

function resetTimer() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  minutesDisplay.textContent = '25'
  secondsDisplay.textContent = '00'
  clearTimeout(timer)
}

buttonStop.addEventListener('click', function () {
  resetTimer()
})

// Criar função que ao clicar em + atribua 5 minutos ao timer

buttonSum.addEventListener('click', function () {
  minutesDisplay.textContent = Number(minutesDisplay.textContent) + 5
})

// Criar função que ao clicar em - tire 5 minutos ao timer

buttonSub.addEventListener('click', function () {
  minutesDisplay.textContent = Number(minutesDisplay.textContent) - 5
})

// Criar função que ao clicar no botão Lua ou sol, interaja com a cor do projeto

let body = document.querySelector('body')
body.classList.add('control-dark')
let time = document.querySelector('.timer')
function lightMode() {
  body.classList.toggle('control-dark')
  body.classList.add('control-light')
  body.style.backgroundColor = 'var(--bg-lightmode)'
  time.style.color = 'var(--icons-color-lightmode)'
  document.documentElement.style.setProperty(
    '--icons-color-darkmode',
    '#323238',
  )

  document.documentElement.style.setProperty('--bg-card-darkmode', '#e1e1e6')

  document.documentElement.style.setProperty('--range-darkmode', '#323238')

  document.documentElement.style.setProperty(
    '--bg-card-hover-darkmode',
    '#02799d',
  )

  lightButton.classList.toggle('hide')
  darkButton.classList.toggle('hide')
}

darkButton.addEventListener('click', function () {
  lightMode()
})

function darkMode() {
  body.classList.remove('control-light')
  body.classList.toggle('control-dark')
  body.style.backgroundColor = 'var(--bg-darkmode)'
  time.style.color = 'var(--icons-color-darkmode)'
  document.documentElement.style.setProperty('--icons-color-darkmode', 'white')

  document.documentElement.style.setProperty(
    '--bg-card-darkmode',
    'hsla(240, 6%, 17%, 1)',
  )

  document.documentElement.style.setProperty('--range-darkmode', 'white')

  document.documentElement.style.setProperty(
    '--bg-card-hover-darkmode',
    '#0a3442',
  )

  lightButton.classList.toggle('hide')
  darkButton.classList.toggle('hide')
}

lightButton.addEventListener('click', function () {
  darkMode()
})

// Criar função que ao clicar no card, reproduza o audio
function toggleSound(mainAmbient, ambient2, ambient3, ambient4) {
  if (mainAmbient.paused == true) {
    mainAmbient.play()
    mainAmbient.loop = true
    ambient2.pause()
    ambient3.pause()
    ambient4.pause()
  } else {
    mainAmbient.pause()
    ambient2.pause()
    ambient3.pause()
    ambient4.pause()
  }
}

//Criar função que faz o input range controlar o Volume do audio

function volumeAmbient(mainSound, ambient) {
  mainSound.volume = ambient.value
}

function inputClick(event, mainAmbient, ambient2, ambient3, ambient4) {
  if (event.target.tagName == 'INPUT') {
    return
  } else {
    toggleSound(mainAmbient, ambient2, ambient3, ambient4)
  }
}

cardForest.addEventListener('click', function () {
  if (forestSound.paused) {
    cardBackgroundDark(cardForest, cardRain, cardCoffee, cardFlames)
  } else {
    cardBackgroundDark(cardForest, cardRain, cardCoffee, cardFlames)
  }
  inputClick(event, forestSound, rainSound, coffeeSound, flamesSound)

  cardForest.oninput = () => {
    volumeAmbient(forestSound, forestVolume)
  }
})

cardRain.addEventListener('click', function () {
  if (rainSound.paused) {
    cardBackgroundDark(cardRain, cardCoffee, cardFlames, cardForest)
  } else {
    cardBackgroundDark(cardRain, cardCoffee, cardFlames, cardForest)
  }
  inputClick(event, rainSound, forestSound, coffeeSound, flamesSound)

  cardRain.oninput = () => {
    volumeAmbient(rainSound, rainVolume)
  }
})

cardCoffee.addEventListener('click', function () {
  if (coffeeSound.paused) {
    cardBackgroundDark(cardCoffee, cardFlames, cardForest, cardRain)
  } else {
    cardBackgroundDark(cardCoffee, cardFlames, cardForest, cardRain)
  }
  inputClick(event, coffeeSound, forestSound, rainSound, flamesSound)

  cardCoffee.oninput = () => {
    volumeAmbient(coffeeSound, coffeeVolume)
  }
})

cardFlames.addEventListener('click', function () {
  if (flamesSound.paused) {
    cardBackgroundDark(cardFlames, cardForest, cardRain, cardCoffee)
  } else {
    cardBackgroundDark(cardFlames, cardForest, cardRain, cardCoffee)
  }
  inputClick(event, flamesSound, forestSound, rainSound, coffeeSound)

  cardFlames.oninput = () => {
    volumeAmbient(flamesSound, flamesVolume)
  }
})

if (body.classList.contains('control-dark')) {
  function cardBackgroundDark(mainCard, otherCards1, otherCards2, otherCards3) {
    mainCard.classList.toggle('cardActive')
    otherCards1.classList.remove('cardActive')
    otherCards2.classList.remove('cardActive')
    otherCards3.classList.remove('cardActive')
    return
  }
}
