function initialGameObjects() {
    const gameScreen = document.querySelector('.game-screen');
    const gameScreenInformation = document.querySelector('.game-screen-information');
    const shipsForm = document.querySelector('.form');
    const startScreen = document.querySelector('.start-screen');
    const startScreenButton = document.querySelector('.start-screen>button')
    const usernameInput = document.querySelector('.username-input');
    const usernameInputMessage = document.querySelector('.username-input-message');
    const gameScreenUsername = document.querySelector('.game-screen-username');
    const gameScreenScore = document.querySelector('.score');
    const gameScreenLifes = document.querySelector('lifes');

    return {
        gameScreen,
        gameScreenInformation,
        shipsForm,
        startScreen,
        startScreenButton,
        usernameInput,
        usernameInputMessage,
        gameScreenUsername,
        gameScreenScore,
        gameScreenLifes,
        createShip(shipImg) {
            let shipElement = document.createElement('div');
            shipElement.classList.add('game-screen-ship');
            let image = document.createElement('img');
            image.src = shipImg;
            shipElement.appendChild(image);
            shipElement.style.left = `${state.ship.startX}%`;
            shipElement.style.bottom = `${state.ship.startY}%`;
            this.shipElement = shipElement;
            gameScreen.appendChild(shipElement);
            return shipElement;
        },
        createElectricball(ship, ball) {
            let electricballElement = document.createElement('div');
            electricballElement.classList.add('electricball');
            electricballElement.style.left = `${ship.startX - 0.5}%`;
            electricballElement.style.bottom = `${gameScreen.offsetHeight * ship.startY / 100 + 90}px`;
            electricballElement.style.width = `${ball.width}px`
            electricballElement.style.height = `${ball.height}px`

            gameScreen.appendChild(electricballElement);
        },
        createEnemy(posY) {
            let enemyElement = document.createElement('div');
            enemyElement.classList.add('enemy');
            enemyElement.style.top = `${posY}px`
            enemyElement.style.left = `${Math.random() * 96}%`
            gameScreen.appendChild(enemyElement);
            return enemyElement;
        },
        createEnemyTwo(posY) {
            let enemyElementTwo = document.createElement('div');
            enemyElementTwo.classList.add('enemy-two');
            enemyElementTwo.style.top = `${posY}px`
            enemyElementTwo.style.left = `${Math.random() * 96}%`
            gameScreen.appendChild(enemyElementTwo);
            return enemyElementTwo;
        },
        createBoss(posY) {
            let bossElement = document.createElement('div');
            bossElement.classList.add('boss');
            bossElement.style.top = `${posY}px`
            bossElement.style.left = `${Math.random() * 90}%`
            gameScreen.appendChild(bossElement);
            return bossElement;
        },
        createBonus(posY) {
            let bonusElement = document.createElement('div');
            bonusElement.classList.add('bonus');
            bonusElement.style.top = `${posY}px`
            bonusElement.style.left = `${Math.random() * 92}%`
            gameScreen.appendChild(bonusElement);
            return bonusElement;
        }
    }
}