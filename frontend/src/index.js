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
    const body = document.querySelector('body')
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

    body.append(loginForm)
    

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

const clearPage = () => {
    const body = document.querySelector('body')
    body.innerHTML = ''
}

const startGame = () => {
    console.log('game on')
    const body = document.querySelector('body')

    const rules = document.createElement('h1')
    rules.innerText = 'rules will go here'

    const startBtn = document.createElement('button')
    startBtn.innerHTML = 'START GAME'

    body.append(rules, startBtn)

    startBtn.addEventListener('click', function(e){
        clearPage()
        console.log('game would start here')
        startPhase1()
        

    })
}


// const characterImages = () => {
//     return fetch('http://localhost:3000/api/v1/characters')
//     .then(res => res.json()).then(characters => characters.forEach(character => charactersOnForm(character)))

// }

// const charactersOnForm = (character) => {
//     console.log(character)
//    const div = document.querySelector('.character-images')
// //    let body = document.querySelector('body')

// //    const charImg = document.createElement('img')
// //    charImg.setAttribute('src', character.img1)
// //    charImg.className = 'form-pic'

//    const characterSelect = document.createElement('input')
//     characterSelect.setAttribute('type','image')
//     characterSelect.setAttribute('src', character.img1)
//     characterSelect.className = 'form-pic'

//    const name = document.createElement('p')
//    name.innerText = character.name

//    div.append(characterSelect, name)

  

// }

const startPhase1 = () =>{
    const body = document.querySelector('body')

    const canvas = document.createElement('canvas')
    canvas.classList.add('canvas')
    

    body.append(canvas)

    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(function(json){
        for (const img of json){
            createBoard(img)
        }
    })
}

const createBoard = (image) => {
    const useImage = document.createElement('image')
    const canvas = document.querySelector('canvas')
    const imageCard = canvas.getContext('2d')
    useImage.setAttribute('src', image.img1)
    useImage.classList.add('board-card')

    useImage.addEventListener('load', function() {
        // execute drawImage statements here
        imageCard.drawImage(useImage, 10, 10, 200, 200)
      }, false);

     console.log(useImage)

    const body = document.querySelector('body')
    body.append(useImage)
    //SHOULD BE: canvas.append(useImage)

    
    
}