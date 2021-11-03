document.addEventListener('DOMContentLoaded', () =>{

	const startBtn = document.querySelector('#start')
	const screens = document.querySelectorAll('.screen')
	const timeList = document.querySelector('#time-list')
	const timeElement = document.querySelector('#time')
	const board = document.querySelector('#board')
	const startOverBtn = document.querySelector('#start-over')

	let time = 0

	let score = 0

	let intrevalTimer = 0;

	startBtn.addEventListener('click', (e) => {
		e.preventDefault()
		screens[0].classList.add('up')
		startOverBtn.classList.add('hide')
	})

	timeList.addEventListener('click', (e) => {
		e.preventDefault()
		if (e.target.classList.contains('time-btn')) {
			time = parseInt(e.target.getAttribute('data-time'))
			screens[1].classList.add('up')
			startGame()
		}
	})

	board.addEventListener('click', (e) => {
		if (e.target.classList.contains('circle')) {
			score++
			e.target.remove()
			generateRandomCircle()
		}
	})

	startOverBtn.addEventListener('click', (e) => {
		screens.forEach(screen => {
			screen.classList.remove('up')
		})
		clearInterval(intrevalTimer)
		const titleTime = screens[2].getElementsByTagName('h3')[0]
		titleTime.classList.remove('hide')
		board.innerHTML = ''
		score = 0;
	})

	function startGame() {
		intrevalTimer = setInterval(decreaseTime, 1000)
		setTime(time)
		generateRandomCircle()
	}

	function decreaseTime() {
		console.log('decreaseTime')
		if (time === 0) {
			finishGame()
		} else {
			let currentTime = --time
			if (currentTime < 10) {
				currentTime = `0${currentTime}`
			}
			setTime(currentTime)
		}
	}

	function setTime(value) {
		timeElement.innerHTML = `00:${value}`
	}

	function finishGame() {
		timeElement.parentNode.classList.add('hide')
		board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
		startOverBtn.classList.remove('hide')
	}

	function generateRandomCircle() {
		const circle = document.createElement('div')
		const size = getRandomNumber(10, 70)
		const {width, height} = board.getBoundingClientRect();
		const x = getRandomNumber(0, width - size)
		const y = getRandomNumber(0, height - size)

		circle.classList.add('circle')
		circle.style.width = `${size}px`
		circle.style.height = `${size}px`
		circle.style.top = `${y}px`
		circle.style.left = `${x}px`
		circle.style.boxShadow = '0 0 5px red';
		circle.style.background = `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 47%, ${getRandomColor()} 100%)`

		board.append(circle)
	}

	function getRandomColor(){
	return `#${Math.floor(Math.random()*16777215).toString(16)}`
	}

	function getRandomNumber(min, max) {
		return Math.round((Math.random() * (max - min) + min))
	}
})
function huckWinTheGame() {
	function kill() {
		const circle = document.querySelector('.circle')
		if (circle) {
			circle.click()
		} else {
			clearInterval(localInterval)
		}
	}
	let localInterval = setInterval(kill, 42)
}