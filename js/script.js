
let superman = document.querySelector('.superman')
let img = document.getElementById('superman-1')
let gameOverSound = new Audio('audio/GameOverSound.mp3')
gameOverSound.volume = 0.2
let backgroundMusic = new Audio('audio/Superman • Main Theme • John Williams.mp3')
backgroundMusic.loop = true
backgroundMusic.volume = 0.2
let supermanHolds = superman.getBoundingClientRect()
let background = document.querySelector('.background')
let score_val = document.querySelector('.score_val')
let message = document.querySelector('.message')
let score_title = document.querySelector('.score_title')
let kryptoTop = document.querySelector('.kryptoTop')
let kryptoBottom = document.querySelector('.kryptoBottom')
let kryptoBlock = document.querySelectorAll('.kryptoBlock')
kryptoBlock.increaseScore = '1'
let game_state = 'Start'
img.style.display = 'none'
let move_speed = 3
let grativy = 1



document.addEventListener('keydown', (e) => {
    
    if(e.key === 'Enter' && game_state !== 'Play'){
        document.querySelectorAll('.kryptoBlock').forEach((e) => {
            e.remove()
        })
        game_state = 'Play'
        kryptoTop.style.display = 'block'
        kryptoBottom.style.display = 'block'
        img.style.display = 'block'
        superman.style.top = '40vh'
        message.innerHTML = ''
        score_title.innerHTML = 'Dodged : '
        score_val.innerHTML = '0'
        play()
    }
})



function play(){


    function move(){
    backgroundMusic.play()
    if(game_state !== 'Play'){
    backgroundMusic.pause()
        return}

        let kryptoBlock = document.querySelectorAll('.kryptoBlock')
        kryptoBlock.forEach((element) => {
            let kryptoHolds = element.getBoundingClientRect()
            supermanHolds = superman.getBoundingClientRect()
            let kryptoTop = document.querySelector('.kryptoTop').getBoundingClientRect()
            let kryptoBottom = document.querySelector('.kryptoBottom').getBoundingClientRect()

            // Collision logic

  
            if (supermanHolds.top < kryptoTop.bottom || supermanHolds.bottom > kryptoBottom.top ) {
                game_state = 'End'
                message.innerHTML = 'Game Over' + '<br>Press Enter To Try Again'
                message.classList.add('messageStyle')
                img.style.display = 'none'
                gameOverSound.play()
                return
        }      
        
            else if(supermanHolds.left < kryptoHolds.left + kryptoHolds.width 
                    && supermanHolds.left + supermanHolds.width > kryptoHolds.left && 
                    supermanHolds.top < kryptoHolds.top + kryptoHolds.height &&
                    supermanHolds.top + supermanHolds.height > kryptoHolds.top){
                    game_state = 'End'
                    message.innerHTML = 'Game Over' + '<br>Press Enter To Try Again'
                    message.classList.add('messageStyle')
                    img.style.display = 'none'
                    gameOverSound.play()
                    return
            }

            // Score logic

            else if(kryptoHolds.right <= 0){
                element.remove()
            }
            else if
                    (kryptoHolds.right < supermanHolds.left && 
                        kryptoHolds.right + move_speed >= supermanHolds.left && 
                        element.increaseScore === '1'){
                            score_val.innerHTML = parseInt(score_val.innerHTML) + 1
                        
                    }
                    element.style.left = kryptoHolds.left - move_speed + 'px'
                
            
        })
        requestAnimationFrame(move)
    }


    requestAnimationFrame(move)

    let supermanGrav = 0

    
    function apply_gravity(){
        if(game_state !== 'Play') return

        supermanGrav = supermanGrav + grativy
        document.addEventListener('keydown', (e) => {
            if( e.key === ' '){
                img.src = './images/superman2.png'
                supermanGrav = -8
            }
        })

        document.addEventListener('keyup', (e) => {
            if( e.key === ' '){
                img.src = './images/superman1.png'
            }
        })

        if(supermanHolds.top <= 0 || supermanHolds.bottom >= background.bottom){
            game_state = 'End'
            message.style.left = '28vw'
            gameOverSound.play()
            window.location.reload()
            message.classList.remove('messageStyle')
            return
        }
        superman.style.top = supermanHolds.top + supermanGrav + 'px'
        supermanHolds = superman.getBoundingClientRect()
        requestAnimationFrame(apply_gravity)
        
    }
    requestAnimationFrame(apply_gravity)

    let kryptoSeparation = 0

    let kryptoGap = 34  

    // Creating blocks 

    function createBlock(){
        if(game_state !== 'Play') return;
        

        if(kryptoSeparation > 120){
            kryptoSeparation = 0

            let kryptoPosition = Math.floor(Math.random() * 43) + 8
            let kryptoInverted = document.createElement('div')
            kryptoInverted.className = 'kryptoBlock'
            kryptoInverted.style.top = kryptoPosition - 70 + 'vh'
            kryptoInverted.style.left = '100vw'

            document.body.appendChild(kryptoInverted)
            let kryptoBlock = document.createElement('div')
            kryptoBlock.className = 'kryptoBlock'
            kryptoBlock.style.top = kryptoPosition + kryptoGap + 'vh'
            kryptoBlock.style.left = '100vw'
            kryptoBlock.increaseScore = '1'

            document.body.appendChild(kryptoBlock)
        }
        kryptoSeparation++
        requestAnimationFrame(createBlock)
    }
    requestAnimationFrame(createBlock)
}