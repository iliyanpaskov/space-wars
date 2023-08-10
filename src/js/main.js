let state = initialState();
let gameObjects = initialGameObjects();

const avaliableKeys = ['KeyA', 'KeyW', 'KeyS', 'KeyD', 'Space']

document.addEventListener('keydown', (e) => {
    if (avaliableKeys.includes(e.code)) {
        state.keys[e.code] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (avaliableKeys.includes(e.code)) {
        state.keys[e.code] = false;
    }
});


gameObjects.startScreenButton.addEventListener('click', (e) => {
    if (gameObjects.usernameInput.value !== '' && state.ship.imageUrl !== '') {
        gameObjects.startScreen.classList.add('hidden');
        gameObjects.gameScreen.classList.remove('hidden');
        state.username = gameObjects.usernameInput.value;
        gameObjects.gameScreenUsername.textContent = state.username;
        gameObjects.gameScreenScore.textContent = state.score;
    } else {
        gameObjects.usernameInputMessage.classList.remove('hidden');
    };
    start(state, gameObjects);
});

document.querySelector('.form').addEventListener('click', (e) => {
    if (e.target.value !== undefined) {
        state.ship.imageUrl = e.target.value;
    }
});