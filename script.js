const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers-container');
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

function generatePowerballNumbers() {
	// Disable button during animation
	generateBtn.disabled = true;
	generateBtn.innerText = 'Generating...';

	// Clear previous numbers
	numbersContainer.innerHTML = '';

	// Generate 5 unique numbers between 1 and 69
	const whiteBalls = new Set();
	while (whiteBalls.size < 5) {
		whiteBalls.add(Math.floor(Math.random() * 69) + 1);
	}

	// Sort numbers numerically
	const sortedWhiteBalls = Array.from(whiteBalls).sort((a, b) => a - b);

	// Generate Powerball number (1-26)
	const powerBall = Math.floor(Math.random() * 26) + 1;

	// Combine all balls for display logic
	const allBalls = [...sortedWhiteBalls, powerBall];

	// Display balls with staggered animation
	allBalls.forEach((number, index) => {
		setTimeout(() => {
			const ball = document.createElement('div');
			ball.className = 'ball';

			// Check if it's the last ball (Powerball)
			if (index === 5) {
				ball.classList.add('powerball');
			}

			ball.innerText = number;
			numbersContainer.appendChild(ball);

			// Re-enable button after last ball
			if (index === 5) {
				setTimeout(() => {
					generateBtn.disabled = false;
					generateBtn.innerText = 'Generate Numbers';
				}, 500);
			}
		}, index * 200); // 200ms delay between each ball
	});
}

// --- Theme Switcher ---
function setInitialTheme() {
	const savedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;

	if (savedTheme === 'light') {
		body.classList.add('light-mode');
		themeSwitcher.innerText = '🌙';
	} else if (savedTheme === 'dark') {
		body.classList.remove('light-mode');
		themeSwitcher.innerText = '☀️';
	} else if (prefersDark) {
		body.classList.remove('light-mode');
		themeSwitcher.innerText = '☀️';
	} else {
		body.classList.add('light-mode');
		themeSwitcher.innerText = '🌙';
	}
}

function toggleTheme() {
	body.classList.toggle('light-mode');
	if (body.classList.contains('light-mode')) {
		themeSwitcher.innerText = '🌙';
		localStorage.setItem('theme', 'light');
	} else {
		themeSwitcher.innerText = '☀️';
		localStorage.setItem('theme', 'dark');
	}
}

// Event Listeners
generateBtn.addEventListener('click', generatePowerballNumbers);
themeSwitcher.addEventListener('click', toggleTheme);
document.addEventListener('DOMContentLoaded', setInitialTheme);
