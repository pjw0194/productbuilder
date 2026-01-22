function generatePowerballNumbers() {
    const whiteBallsContainer = document.getElementById('numbers-container');
    const generateBtn = document.getElementById('generate-btn');

    // Disable button during animation
    generateBtn.disabled = true;
    generateBtn.innerText = 'Generating...';
    
    // Clear previous numbers
    whiteBallsContainer.innerHTML = '';

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
            whiteBallsContainer.appendChild(ball);

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

document.getElementById('generate-btn').addEventListener('click', generatePowerballNumbers);
