let move_speed = 3
let grativy = 0.5
let superman = document.querySelector('.superman')
let img = document.getElementById('superman-1')

let supemanInPlace = superman.getBoundingClientRect()


let background = document.querySelector('.background').getBoundingClientRect()

let scoreValue = document.querySelector('.score_val')
let startMessage = document.querySelector('.startMessage')
let scoreTitle = document.querySelector('.score_title')

let gameScreen = 'Start'
img.style.display = 'none'
startMessage.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && gameScreen != 'Game'){
        document.querySelectorAll('.kryptoBlocks').forEach((e) => {
            e.remove()
        })
        img.style.display = 'block'
        superman.style.top = '40vh'
        game_state = 'Play'
        startMessage.innerHTML = ''
        scoreTitle.innerHTML = 'Score : '
        scoreValue.innerHTML = '0'
        startMessage.classList.remove('messageStyle')
        game();
    }
})


