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
    })
    clearPage()
    //*** CLEARS PAGE AFTER LOG-IN */
    startGame()

}

const startGame = () => {
    clearPage()

    const rules = document.createElement('h1')
    rules.innerText = 'rules will go here'

    const startBtn = document.createElement('button')
    startBtn.innerHTML = 'START GAME'

    windowDiv.append(rules, startBtn)

    startBtn.addEventListener('click', function (e) {
        clearPage()
        startPhase1()


    })
}

const startPhase1 = () => {
    const showBox = document.querySelector('.hidden')
    showBox.classList.remove('hidden')
    showBox.classList.add('right-side-one')
    bodyCardsUp()

    // answer card logic
    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    answerImage.classList.add('answer-card')

    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let i = array[Math.floor(Math.random() * array.length)]
    answerImage.id = i

    fetch(`http://localhost:3000/api/v1/cards/${i}`)
        .then(res => res.json())
        .then(obj => answerImage.setAttribute('src', obj.img2))

    answerDiv.append(answerImage)
    showBox.append(answerDiv)

    const answerId = i


    // answerImage.addEventListener("load", makeAnswer(answerId));
    setTimeout(startPhase2, 1000, answerId)


}
// MOVING THING GOES HERE 
const startPhase2 = (answerId) => {
    clearPage2()
    answerId2 = answerId

    const canvas = document.createElement('div')
    canvas.classList.add('canvas')

    windowDiv.append(canvas)

    fetch('http://localhost:3000/api/v1/cards')
        .then(res => res.json())
        .then(function (json) {
            for (const img of json) {
                createBoard2(img)
            }
        })

    fetch(`http://localhost:3000/api/v1/cards/${answerId2}`)
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

    setTimeout(startPhase3, 8000, answerId)
}

const startPhase3 = (answerId) => {
    let oldChar = document.querySelector('.character')
    let dodgerInfo = oldChar.style.cssText

    clearPage2()

    bodyCardsUp()

    let canvas = document.querySelector('.canvas')
    let dummyDodger = document.createElement('div');
    dummyDodger.style.cssText = dodgerInfo
    dummyDodger.classList.add('character')
    dummyDodger.style.backgroundColor = "black";
    canvas.append(dummyDodger)


    fetch(`http://localhost:3000/api/v1/cards/${answerId2}`)
        .then(res => res.json())
        .then(obj => answerImage.setAttribute('src', obj.img1))

    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    const showBox = document.querySelector('.right-side-one')
    answerImage.classList.add('answer-card')
    answerDiv.append(answerImage)
    showBox.append(answerDiv)


    const getScore = (answerId) => {
        let x = document.getElementById(answerId)
        let cardCoordinates = x.getBoundingClientRect()
        let characterCoordinates = dummyDodger.getBoundingClientRect()
        console.log('card x:',cardCoordinates.x, 'card y:',cardCoordinates.y)
        console.log('char x:',characterCoordinates.x, 'char y:', characterCoordinates.y)
        function bottom(coordinates) {return coordinates.y + coordinates.height}

         if ((characterCoordinates.y > (cardCoordinates.y + cardCoordinates.height - 30)) || ((characterCoordinates.x + characterCoordinates.width) < cardCoordinates.x + 30) || ((characterCoordinates.y + characterCoordinates.height) < cardCoordinates.y + 30) || (characterCoordinates.x > (cardCoordinates.x + cardCoordinates.width - 30))) {
            return console.log("WRONG!")
        } else {
            return console.log("Success?!")
        }
    }
    setTimeout(getScore, 0200, answerId)


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

    fetch('http://localhost:3000/api/v1/cards')
        .then(res => res.json())
        .then(function (json) {
            for (const img of json) {
                createBoard(img)
            }
        })
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

