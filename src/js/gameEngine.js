let finalScore = document.querySelector('.final-score');

function start(state, gameObjects) {
    gameObjects.createShip(state.ship.imageUrl);
    window.requestAnimationFrame(timestamp => gameLoop(state, gameObjects, timestamp));
}

function gameLoop(state, gameObjects, timestamp) {
    let { ship } = state;
    let { shipElement } = gameObjects;

    document.querySelector('.score').textContent = state.score;
    document.querySelector('.lifes').textContent = state.ship.lifes;


    if (state.keys.KeyD) {
        if (ship.startX < 96) {
            ship.startX += ship.speed;
        }
    }
    if (state.keys.KeyA) {
        if (ship.startX > 4) {
            ship.startX -= ship.speed;
        }
    }
    if (state.keys.KeyW) {
        if (ship.startY < 80) {
            ship.startY += ship.speedForword;
        }
    }
    if (state.keys.KeyS) {
        if (ship.startY > 1) {
            ship.startY -= ship.speedBack;
        }
    }
    //Space shoot:
    if (state.keys.Space && timestamp - state.electricball.nextTimestamp > state.electricball.interval) {
        gameObjects.createElectricball(ship, state.electricball);
        state.electricball.nextTimestamp = timestamp
    }

    if (timestamp > state.enemy.nextTimestamp) {
        if(state.score > 250){
            state.enemy.enemySpeed = 2;
        }
        if(state.score > 600){
            state.enemy.enemySpeed = 3;
        }
        gameObjects.createEnemy(state.enemy.startY);
        state.enemy.nextTimestamp = timestamp + Math.random() * state.enemy.maxInterval;
    }

    if (timestamp > state.enemyTwo.nextTimestamp) {
        if (state.score > 150) {
            state.enemyTwo.enemySpeed = 2;
        }
        if (state.score > 300) {
            state.enemyTwo.enemySpeed = 4;
        }
        gameObjects.createEnemyTwo(state.enemyTwo.startY);
        state.enemyTwo.nextTimestamp = timestamp + Math.random() * state.enemyTwo.maxInterval;
    }

    if (timestamp > state.boss.nextTimestamp) {
        if (state.score % 33 === 0 && state.score !== 0) {
            if (state.score > 270) {
                state.boss.enemySpeed = 5;
            }
            gameObjects.createBoss(state.boss.startY);
            state.boss.nextTimestamp = timestamp + Math.random() * state.boss.maxInterval;
        }
    }

    if (timestamp > state.bonus.nextTimestamp) {
        if (state.score % 44 === 0 && state.score !== 0) {
            gameObjects.createBonus(state.bonus.startY);
            state.bonus.nextTimestamp = timestamp + Math.random() * state.bonus.maxInterval;
        }
    }

    let electricballElements = document.querySelectorAll('.electricball');
    let enemyElements = document.querySelectorAll('.enemy');
    let enemyTwoElements = document.querySelectorAll('.enemy-two');
    let bossElements = document.querySelectorAll('.boss');
    let bonusElements = document.querySelectorAll('.bonus');
    let currentShip = document.querySelector('.game-screen-ship');

    electricballElements.forEach(ball => {
        let positionY = parseInt(ball.style.bottom);
        enemyElements.forEach(enemy => {
            if (detectCollision(ball, enemy)) {
                enemy.classList.add('enemy-destroyed');
                ball.remove();
                setTimeout(() => {
                    enemy.remove();
                }, 50);
                state.score += state.enemy.points;
            }
        });

        enemyTwoElements.forEach(enemy => {
            if (detectCollision(ball, enemy)) {
                enemy.classList.add('enemy-destroyed');
                ball.remove();
                setTimeout(() => {
                    enemy.remove();
                }, 50);
                state.score += state.enemyTwo.points;
            }
        });

        bossElements.forEach(enemy => {
            if (detectCollision(ball, enemy)) {
                enemy.classList.add('enemy-destroyed');
                ball.remove();
                setTimeout(() => {
                    enemy.remove();
                }, 50);
                state.score += state.boss.points;
            }
        });

        if (positionY < gameObjects.gameScreen.offsetHeight - 20) {
            ball.style.bottom = `${positionY + state.electricball.speed}px`;
        } else {
            ball.remove();
        }
    });

    enemyElements.forEach(enemy => {
        let positionY = parseInt(enemy.style.top);
        if (detectCollision(enemy, currentShip)) {
            state.ship.lifes -= 1;
            enemy.remove();
            currentShip.classList.add('ship-destroyed');
            if (state.ship.lifes > 0) {
                setTimeout(() => {
                    currentShip.classList.remove('ship-destroyed');
                }, 200)
            } else {
                setTimeout(() => {
                    state.gameOver = true;
                }, 500);
            }
        }

        if (positionY < gameObjects.gameScreen.offsetHeight - 50) {
            enemy.style.top = `${positionY + state.enemy.enemySpeed}px`;
        } else {
            enemy.remove();
        }
    });

    enemyTwoElements.forEach(enemy => {
        let positionY = parseInt(enemy.style.top);
        if (detectCollision(enemy, currentShip)) {
            state.ship.lifes -= 1;
            enemy.remove();
            currentShip.classList.add('ship-destroyed');
            if (state.ship.lifes > 0) {
                setTimeout(() => {
                    currentShip.classList.remove('ship-destroyed');
                }, 200)
            } else {
                setTimeout(() => {
                    state.gameOver = true;
                }, 500);
            }
        }

        if (positionY < gameObjects.gameScreen.offsetHeight - 90) {
            enemy.style.top = `${positionY + state.enemyTwo.enemySpeed}px`;
        } else {
            enemy.remove();
        }
    });

    bossElements.forEach(enemy => {
        let positionY = parseInt(enemy.style.top);
        if (detectCollision(enemy, currentShip)) {
            state.ship.lifes -= 1;
            enemy.remove();
            currentShip.classList.add('ship-destroyed');
            if (state.ship.lifes > 0) {
                setTimeout(() => {
                    currentShip.classList.remove('ship-destroyed');
                }, 200)
            } else {
                setTimeout(() => {
                    state.gameOver = true;
                }, 500);
            }
        }

        if (positionY < gameObjects.gameScreen.offsetHeight - 80) {
            enemy.style.top = `${positionY + state.boss.enemySpeed}px`;
        } else {
            enemy.remove();
        }
    });

    bonusElements.forEach(bonus => {
        let positionY = parseInt(bonus.style.top);
        if (detectCollision(bonus, currentShip)) {
            bonus.remove();
            state.ship.lifes += 1;
        }

        if (positionY < gameObjects.gameScreen.offsetHeight - 80) {
            bonus.style.top = `${positionY + state.bonus.speed}px`;
        } else {
            bonus.remove();
        }
    });

    finalScore.textContent = state.score

    shipElement.style.left = `${ship.startX}%`;
    shipElement.style.bottom = `${ship.startY}%`;

    if (!state.gameOver) {
        window.requestAnimationFrame(gameLoop.bind(null, state, gameObjects));
    } else {
        document.querySelector('.game-screen').classList.add('hidden');
        document.querySelector('.game-over-screen').classList.remove('hidden');
    }
}

function detectCollision(firstObject, secondObject) {
    let first = firstObject.getBoundingClientRect();
    let second = secondObject.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right);

    return hasCollision;
}