const windowDiv = document.querySelector('.window')
const showBox = document.querySelector('#show-box')

document.addEventListener("DOMContentLoaded", () => {
    createLogIn()

    // fetch('http://localhost:3000/api/v1/cards')
    // .then(res => res.json())
    // .then(function(json){
    //     for (const img of json){
    //         const hiddenImg = document.createElement('image')
    //         hiddenImg.setAttribute('src', image.img1)
    //         hiddenImg.classList.add('hidden')
})

const urlBase = 'http://localhost:3000/api/v1/users'

const createLogIn = () => {
    const loginForm = document.createElement('form')

    // const charDiv = document.createElement('div')
    // charDiv.className = 'character-images'


    const usernameInput = document.createElement('input')
    usernameInput.type = 'text'
    usernameInput.placeholder = "Enter Your Username"


    const formBtn = document.createElement('button')
    formBtn.type = 'submit'
    formBtn.innerText = "Continue"


    loginForm.append(usernameInput, formBtn)
    // characterImages()
    // loginForm.append(formBtn)

    windowDiv.append(loginForm)


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log("clicked")
        const newUsername = usernameInput.value
        console.log(usernameInput.value)
        //render new form
        createUser(newUsername)
        // characterSelectForm()
    })
}

const createUser = (username) => {
    console.log(urlBase)
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
    }).then(res => res.json()).then(data => console.log(data))
    clearPage()
    //*** CLEARS PAGE AFTER LOG-IN */
    startGame()
    //     .then(function(response){
    //         response.json()
    //     })
    // .then(function(object){
    //     console.log(object)
    // })

}

const startGame = () => {
    clearPage()
    console.log('game on')

    const rules = document.createElement('h1')
    rules.innerText = 'rules will go here'

    const startBtn = document.createElement('button')
    startBtn.innerHTML = 'START GAME'

    windowDiv.append(rules, startBtn)

    startBtn.addEventListener('click', function (e) {
        clearPage()
        console.log('game would start here')
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

    let array = [100, 101, 102, 103, 104, 105, 106, 107, 108]
    let i = array[Math.floor(Math.random() * array.length)]
    answerImage.id = i

    fetch(`http://localhost:3000/api/v1/cards/${i}`)
        .then(res => res.json())
        .then(obj => answerImage.setAttribute('src', obj.img2))

    answerDiv.append(answerImage)
    showBox.append(answerDiv)

    const answerId = i
    setTimeout(startPhase2, 3000, answerId)

}

const startPhase2 = (answerId) => {
    clearPage2()
    answerId2 = answerId
    console.log('phase 2 started', 'answerId =', answerId)

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
 
    setTimeout(startPhase3, 5000, answerId)
}

const startPhase3 = (answerId) => {
    clearPage2()
    console.log('answerId =', answerId)

    bodyCardsUp()

    fetch(`http://localhost:3000/api/v1/cards/${answerId2}`)
    .then(res => res.json())
    .then(obj => answerImage.setAttribute('src', obj.img1))
    
    const answerDiv = document.createElement('div')
    const answerImage = document.createElement('img')
    const showBox = document.querySelector('.right-side-one')
    answerImage.classList.add('answer-card')
    answerDiv.append(answerImage)
    showBox.append(answerDiv)
    
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