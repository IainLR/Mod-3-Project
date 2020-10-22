const windowDiv = document.querySelector('.window')
const showBox = document.querySelector('#show-box')
const urlBase = 'http://localhost:3000/api/v1/users'

document.addEventListener("DOMContentLoaded", () => {
    createLogIn()
})

const createLogIn = () => {

    const loginForm = document.createElement('form')

    const usernameInput = document.createElement('input')
    usernameInput.type = 'text'
    usernameInput.placeholder = "Enter Your Username"

    const formBtn = document.createElement('button')
    formBtn.classList.add('start-btn')
    formBtn.type = 'submit'
    formBtn.innerText = "Continue"

    loginForm.append(usernameInput, formBtn)

    windowDiv.append(loginForm)


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const newUsername = usernameInput.value
        createUser(newUsername)
    })
}

const createUser = (username) => {
    fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: username,
            character_id: 2
        })
    }).then(res => res.json()).then(user => {

        let nameH1 = document.querySelector('h1')
        nameH1.classList.add(user.id)
        nameH1.innerText = user.name
    })


    clearPage()
    //*** CLEARS PAGE AFTER LOG-IN */
    startGame()

}

const startGame = () => {
    clearPage()
    const body = document.querySelector('body')
    body.style = 'padding-left: 0px'

    const ruleContainer = document.createElement('div')
    ruleContainer.classList.add('rule-container')

    const rules = document.createElement('h1')
    rules.innerText = 'RULES OF THE GAME'
    rules.classList.add('rule')

    const rule1 = document.createElement('h3')
    rule1.innerText = 'Look at the cards on the board'
    rule1.classList.add('rule')

    const rule2 = document.createElement('h3')
    rule2.innerText = 'Once the board is flipped, remember the answer card'
    rule2.classList.add('rule')

    const rule3 = document.createElement('h3')
    rule3.innerText = 'Move your character using the arrow keys'
    rule3.classList.add('rule')
    
    const rule4 = document.createElement('h3')
    rule4.innerText = 'You must be more than half way on the answer when time is up'
    rule4.classList.add('rule')
    
    const rule5 = document.createElement('h3')
    rule5.innerText = "Three Strikes and you're done"
    rule5.classList.add('rule')

    const startBtn = document.createElement('button')
    startBtn.innerHTML = 'START GAME'
    startBtn.classList.add('rule-btn')

    ruleContainer.append(rules, rule1, rule2, rule3, rule4, rule5, startBtn)
    windowDiv.append(ruleContainer)

    startBtn.addEventListener('click', function (e) {
        clearPage()
        startPhase1()
    })
}

const startPhase1 = () => {
    windowDiv.innerHTML = ''

    const body = document.querySelector('body')
    body.style = 'padding-left: 50px'

    let showBox = document.querySelector('.hidden')
    showBox.classList.remove('hidden')
    showBox.classList.add('right-side-one')
    scoreBox()

    let thisSet = bodyCardsUp()
    console.log('thisSet phase1', thisSet)
    
    // answer card logic
    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    answerImage.classList.add('answer-card')
    
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let i = array[Math.floor(Math.random() * array.length)]
    answerImage.id = i
    
    fetch(`http://localhost:3000/api/v1/${thisSet}/${i}`)
    .then(res => res.json())
    .then(obj => answerImage.setAttribute('src', obj.img2))
    
    answerDiv.append(answerImage)
    console.log(showBox, 'AND', answerDiv)
    showBox.append(answerDiv)
    
    const answerId = i
    
    bananaMan()




    setTimeout(startPhase2, 6000, answerId, thisSet)
}

const startPhase1Alt = () => {
    windowDiv.innerHTML = ''
    
    let showBox = document.querySelector('.right-side-one')
    showBox.innerHTML = ''
    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    answerImage.classList.add('answer-card')

    let thisSet = bodyCardsUp()

    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let i = array[Math.floor(Math.random() * array.length)]
    answerImage.id = i

    fetch(`http://localhost:3000/api/v1/${thisSet}/${i}`)
        .then(res => res.json())
        .then(obj => answerImage.setAttribute('src', obj.img2))

    answerDiv.append(answerImage)
    console.log(showBox, 'AND', answerDiv)
    showBox.append(answerDiv)

    const answerId = i

    setTimeout(startPhase2, 6000, answerId, thisSet)

}

// MOVING THING GOES HERE 
const startPhase2 = (answerId, thisSet) => {
    clearPage2()
    answerId2 = answerId

    const canvas = document.createElement('div')
    canvas.classList.add('canvas')

    windowDiv.append(canvas)

    fetch(`http://localhost:3000/api/v1/${thisSet}`)
        .then(res => res.json())
        .then(function (json) {
            for (const img of json) {
                createBoard2(img)
            }
        })

    fetch(`http://localhost:3000/api/v1/${thisSet}/${answerId2}`)
        .then(res => res.json())
        .then(obj => answerImage.setAttribute('src', obj.img1))

    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    const showBox = document.querySelector('.right-side-one')
    answerImage.classList.add('answer-card')
    answerDiv.append(answerImage)
    showBox.append(answerDiv)

    makeDodger()
    console.log(answerId)

    setTimeout(startPhase3, 8000, answerId, thisSet)
}

const startPhase3 = (answerId, thisSet) => {
    let oldChar = document.querySelector('.character')
    let dodgerInfo = oldChar.style.cssText

    clearPage2()

    bodyCardsUpAlt(thisSet)

    let canvas = document.querySelector('.canvas')
    let dummyDodger = document.createElement('div');
    dummyDodger.style.cssText = dodgerInfo
    dummyDodger.classList.add('character')
    dummyDodger.style.backgroundColor = "black";
    canvas.append(dummyDodger)


    fetch(`http://localhost:3000/api/v1/${thisSet}/${answerId2}`)
        .then(res => res.json())
        .then(obj => answerImage.setAttribute('src', obj.img1))

    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    const showBox = document.querySelector('.right-side-one')
    answerImage.classList.add('answer-card')
    answerDiv.append(answerImage)
    showBox.append(answerDiv)

    const score = document.querySelector('.score')
    const strikes = document.querySelector('.strikes')
    const streak = document.querySelector('.streak')

    const getScore = (answerId) => {
        let x = document.getElementById(answerId)
        let cardCoordinates = x.getBoundingClientRect()
        let characterCoordinates = dummyDodger.getBoundingClientRect()


        function bottom(coordinates) { return coordinates.y + coordinates.height }

        if ((characterCoordinates.y > (cardCoordinates.y + cardCoordinates.height - 30)) || ((characterCoordinates.x + characterCoordinates.width) < cardCoordinates.x + 30) || ((characterCoordinates.y + characterCoordinates.height) < cardCoordinates.y + 30) || (characterCoordinates.x > (cardCoordinates.x + cardCoordinates.width - 30))) {
            console.log("WRONG!")
            dummyDodger.style.backgroundColor = "red"
            let oldValueStrike = parseInt(strikes.innerHTML)
            console.log(oldValueStrike)
            strikes.innerHTML = oldValueStrike + 1
            streak.innerHTML = '0'
            if (strikes.innerHTML >= 3) {
                setTimeout(postScore, 5000)
                return console.log('please just stop it...')
            } else {
                setTimeout(roundLoop, 5000)
            }

        } else {
            console.log("Success?!")
            dummyDodger.style.backgroundColor = "green"
            let streakCounter = parseInt(streak.innerHTML) + 1
            streak.innerHTML = streakCounter
            console.log(streakCounter)
            let streakModifier
            if (streakCounter < 3) {
                streakModifier = 1
            }
            if (streakCounter < 9 && streakCounter >= 3) {
                streakModifier = 1.25
            }
            if (streakCounter >= 9) {
                streakModifier = 1.5
            }

            console.log('modifier', streakModifier)
            let scoreUpdate = parseInt(score.innerHTML) + 100 * streakModifier
            score.innerHTML = scoreUpdate

            setTimeout(roundLoop, 5000)

            // score.innerHTML = parseInt(score.innerHTML) + 100
        }
    }
    setTimeout(getScore, 0200, answerId)


}

const postScore = () => {
    const score = document.querySelector('.score')
    const newUser = document.querySelector('h1')
    const newUserId = parseInt(newUser.className)
    const newScore = parseInt(score.innerText)
    console.log("post score data", newUserId, newScore)
    return fetch('http://localhost:3000/api/v1/rounds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            score: newScore,
            user_id: newUserId
        })
    }).then(endGameScreen())

}

const endGameScreen = () => {

    console.log('got to end game')
    let body = document.querySelector('body')
    body.style = 'padding-left: 0px'
    let userName = document.querySelector('h1')
    let userScore = document.querySelector('.score')
    let usernameScoreCombo = document.createElement('h2')
    usernameScoreCombo.classList.add('your-results')
    usernameScoreCombo.innerText = `Name: ${userName.innerText}, Your Score: ${userScore.innerText}`
    body.innerHTML = ''
    let gameOver = document.createElement('h1')
    gameOver.innerText = "GAME OVER"
    gameOver.classList.add('game-over')

    let tryAgnBtn = document.createElement('button')
    tryAgnBtn.innerText = "Try Again?"
    tryAgnBtn.classList.add('tryAgn-btn')
    let homeScreenBtn = document.createElement('button')
    homeScreenBtn.innerText = "Home Screen"
    homeScreenBtn.classList.add('home-btn')


    let endDiv = document.createElement('div')
    endDiv.classList.add('end-container')
    endDiv.append(gameOver, usernameScoreCombo)
    body.append(endDiv, tryAgnBtn, homeScreenBtn)

    tryAgnBtn.addEventListener('click', () => {
        console.log('try again click')
        // startPhase1Alt()
        location.reload()
    })
    homeScreenBtn.addEventListener('click', () => {
        console.log("home screen click")
        // createLogIn()
    })
    leaderBoard(endDiv)
}

const leaderBoard = (div) => {
    fetch('http://localhost:3000/api/v1/rounds')
    .then(res => res.json()).then(function(rounds){
        console.log("unordered rounds", rounds)
        let sortedRounds = rounds.sort((a, b) => {return b.score - a.score})
        console.log("theoretically sorted rounds", sortedRounds)
        let limitedRounds = sortedRounds.slice(0, 10)
        limitedRounds.forEach(round => findUser(round, div))
    })

    function findUser(round, div){
            let nameScore = document.createElement('h3')
            nameScore.innerText = `name: ${round.user.name} Score: ${round.score}`
            nameScore.classList.add('nameScore')
            div.append(nameScore) 
    }
}


const clearPage = () => {
    windowDiv.innerHTML = ''
}

const clearPage2 = () => {
    windowDiv.innerHTML = ''

    const box = document.querySelector('.right-side-one')
    box.innerHTML = ''
}

const createBoard = (image) => {
    const useImage = document.createElement('img')
    useImage.setAttribute('src', image.img1)
    useImage.classList.add('board-card')
    useImage.id = image.id



    const canvas = document.querySelector('.canvas')
    canvas.append(useImage)
}

const createBoard2 = (image) => {
    const useImage = document.createElement('img')
    useImage.setAttribute('src', image.img2)
    useImage.classList.add('board-card')
    useImage.id = image.id

    const canvas = document.querySelector('.canvas')
    canvas.append(useImage)
}

const bodyCardsUp = () => {
    const canvas = document.createElement('div')
    canvas.classList.add('canvas')

    windowDiv.append(canvas)

    let array = ['cards', 'altcards']
    let i = array[Math.floor(Math.random() * array.length)]
    useThis = i

    fetch(`http://localhost:3000/api/v1/${useThis}`)
        .then(res => res.json())
        .then(function (json) {
            for (const img of json) {
                createBoard(img)
            }
        })
    return useThis
}

const bodyCardsUpAlt = (thisSet) => {
    const canvas = document.createElement('div')
    canvas.classList.add('canvas')

    windowDiv.append(canvas)

    fetch(`http://localhost:3000/api/v1/${thisSet}`)
        .then(res => res.json())
        .then(function (json) {
            for (const img of json) {
                createBoard(img)
            }
        })
    return useThis
}

const makeDodger = () => {
    let dodger = document.createElement('div');
    dodger.classList.add('character')
    dodger.style = "bottom: 400px; left: 350px"
    let canvas = document.querySelector('.canvas')
    canvas.append(dodger)
    dodger.style.backgroundColor = "#FF69B4";

    function moveDodgerLeft() {
        let leftNumbers = dodger.style.left.replace("px", "");
        let left = parseInt(leftNumbers, 10);

        if (left > 62) {
            dodger.style.left = `${left - 8}px`;
        }
    }

    function moveDodgerRight() {
        let leftNumbers = dodger.style.left.replace("px", "");
        let left = parseInt(leftNumbers, 10);

        if (left < 612) {
            dodger.style.left = `${left + 8}px`;
        }

    }

    function moveDodgerDown() {
        let bottomNumbers = dodger.style.bottom.replace("px", "");
        let bottom = parseInt(bottomNumbers, 10);

        if (bottom > 96) {
            dodger.style.bottom = `${bottom - 8}px`;
        }
    }

    function moveDodgerUp() {
        let bottomNumbers = dodger.style.bottom.replace("px", "");
        let bottom = parseInt(bottomNumbers, 10);

        if (bottom < 654) {
            dodger.style.bottom = `${bottom + 8}px`;
        }
    }


    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
            moveDodgerLeft();
        }
        if (e.key === "ArrowRight") {
            moveDodgerRight();
        }
        if (e.key === "ArrowDown") {
            moveDodgerDown()
        }
        if (e.key === "ArrowUp") {
            moveDodgerUp()
        }
    });
}

const scoreBox = () => {
    const going = document.querySelector('right-side-two')

    console.log(going)

    if (going === null) {

        const rightSideTwo = document.createElement('div')
        rightSideTwo.classList.add('right-side-two')
        const body = document.querySelector('body')
        body.append(rightSideTwo)

        const scoreBar = document.createElement('h1')
        scoreBar.innerText = "SCORE"
        const scoreBar2 = document.createElement('h2')
        scoreBar2.classList.add('score')
        scoreBar2.innerText = "0"

        const strikeBar = document.createElement('h2')
        strikeBar.innerHTML = "STRIKES "
        const strikeBar2 = document.createElement('h2')
        strikeBar2.classList.add('strikes')
        strikeBar2.innerHTML = "0"

        const streakBar = document.createElement('h2')
        streakBar.innerHTML = "STREAK"
        const streakBar2 = document.createElement('h2')
        streakBar2.innerHTML = "0"
        streakBar2.classList.add('streak')

        rightSideTwo.append(scoreBar, scoreBar2, strikeBar, strikeBar2, streakBar, streakBar2)

    }


}

const roundLoop = () => {
    startPhase1Alt()
    // else POST score and create game object with longest streak
}



const bananaMan = () => {
    let body = document.querySelector('body')
    let bananaManDiv = document.createElement('div')
    bananaManDiv.classList.add('banana-man')

    let bananaMan = document.createElement('img')
    bananaMan.setAttribute('src','src/images/bananaman.gif')

    body.append(bananaManDiv)
    bananaManDiv.append(bananaMan)
}