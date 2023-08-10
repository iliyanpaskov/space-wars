function initialState() {


    const state = {
        username: '',
        gameOver:false,
        ship: {
            imageUrl: '',
            startX: 50,
            startY: 10,
            speed: 0.22,
            speedForword: 0.14,
            speedBack: 0.35,
            lifes:3

        },
        score: 0,
        keys: {
            KeyA: false,
            KeyS: false,
            KeyD: false,
            KeyW: false,
            Space: false,
        },
        electricball:{
            width:20,
            height:20,
            startY: 0,
            speed:3,
            nextTimestamp: 0,
            interval: 210,
        },
        enemy: {
            width: 0,
            height: 0,
            startX: 0,
            startY: 0,
            nextTimestamp: 0,
            maxInterval: 1500,
            enemySpeed: 1,
            points:3
        },
        enemyTwo: {
            width: 0,
            height: 0,
            startX: 0,
            startY: 0,
            nextTimestamp: 0,
            maxInterval: 3500,
            enemySpeed: 1,
            points:5
        },
        boss: {
            width: 0,
            height: 0,
            startX: 0,
            startY: 0,
            nextTimestamp: 0,
            maxInterval: 5500,
            enemySpeed: 3,
            points:13
        },
        bonus: {
            width: 0,
            height: 0,
            startX: 0,
            startY: 0,
            nextTimestamp: 0,
            maxInterval: 8500,
            speed: 1,
        },
    }

    return state;
}