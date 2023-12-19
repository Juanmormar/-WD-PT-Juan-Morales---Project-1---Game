let speedSuperman = 3
let  gravity = 0.5
let superman = document.querySelector(`#super-man`)

let superman_props = superman.getBoundingClientRect()

let startMessage = document.querySelector(`.start`)
let background = document.querySelector(`.background`)
let scoreTitle = document.querySelector(`.score-title`)
let scoreValue = document.querySelector(`.score-value`)


let gamesState = `Start`
startMessage.classList.add(`startStyle`)


document.addEventListener(`keydown`,(e)=>{
    if (e.key== `Enter` && gamesState != `Game`){
        document.querySelectorAll(`.kryptonite-blocks`).forEach((e)=>{
            e.remove()
        })
        superman.style.top = `40vh`
        gamesState = `Play`
        startMessage.innerHTML=``
        scoreTitle.innerHTML=`Score : `
        scoreValue.innerHTML = `0`
        startMessage.classList.remove(`startStyle`)
        play()

    
    }
})