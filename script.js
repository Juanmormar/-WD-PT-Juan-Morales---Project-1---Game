let moveSpeed = 3
let grativy = 0.5
let superman = document.querySelector('.superman')
let img = document.getElementById('superman-1')

let supemanInPlace = superman.getBoundingClientRect()


let background = document.querySelector('.background').getBoundingClientRect()

let scoreValue = document.querySelector('.score_val')
let gameMessage = document.querySelector('.gameMessage')
let scoreTitle = document.querySelector('.score_title')

let gameScreen = 'Start'
img.style.display = 'none'
gameMessage.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && gameScreen != 'Game'){
        document.querySelectorAll('.kryptoBlocks').forEach((e) => {
            e.remove()
        })
        img.style.display = 'block'
        superman.style.top = '40vh'
        gameScreen= 'Game'
        gameMessage.innerHTML = ''
        scoreTitle.innerHTML = 'Score : '
        scoreValue.innerHTML = '0'
        gameMessage.classList.remove('messageStyle')
        game();
    }
}) 

function game(){
    function move(){
        if(gameScreen != `Game`) return
        let kryptoBlocks = document.querySelector(`.kryptoblocks`)
        kryptoBlocks.forEach((element)=>{
            let kryptoBlocksInPlace = element.getBoundingClientRect()
            supemanInPlace = superman.getBoundingClientRect()

            if(kryptoBlocksInPlace.right <= 0){
                element.remove()
            }else{
                if(supemanInPlace.left < kryptoBlocksInPlace.left + kryptoBlocksInPlace.width &&
                    supemanInPlace.left + supemanInPlace.width > kryptoBlocksInPlace.left && 
                    supemanInPlace.top < kryptoBlocksInPlace.top + kryptoBlocksInPlace.heigth &&
                    supemanInPlace.top + supemanInPlace.height  > kryptoBlocksInPlace.height){
                        gameScreen = `GameOver`
                        gameMessage.innerHTML = `Game Over`.fontcolor(`lawngreen`) + 
                        `<br>Enter To Try Again`
                        gameMessage.classList.add(`messageStyle`)
                        img.style.display = `none`
                        return
                    }else{
                        if(kryptoBlocksInPlace.right < supemanInPlace.left && 
                            kryptoBlocksInPlace.right + moveSpeed >= supemanInPlace.left
                            && element.increaseScore == `1` ){
                                scoreValue.innerHTML=+ scoreValue.innerHTML + 1
                            }
                            element.style.left = kryptoBlocksInPlace.left - moveSpeed + `px`
                    }

            }
        })
        requestAnimationFrame(move)
    }
    requestAnimationFrame(move)
    let supermanGrav = 0
    function addGrativy(){
        if(gameScreen != `Game`) return
        supermanGrav = supermanGrav + grativy
        document.addEventListener(`keydown`, (e) => {
            if(e.key == `ArrowUp` || e.key == ` `){
                img.src == `images/superman2.png`
                supermanGrav = -7.6
            }
        })

        document.addEventListener(`keyup`,(e) => {
            if(e.key == `ArrowUp` || e.key == ` `){
                img.src = `images/superman1.png`
            }
        })
if(supemanInPlace.top <=0 || supemanInPlace.bottom >= background.bottom){
    gameScreen = `GameOver`
    gameMessage.style.left= `28vw`
    window.location.reload()
    gameMessage.classList.remove(`messageStyle`)
    return
}
superman.style.top = supemanInPlace.top + supermanGrav + `px`
supemanInPlace = superman.getBoundingClientRect()
requestAnimationFrame(addGrativy)
    }
requestAnimationFrame(addGrativy)
let blockSeparation = 0
let blocksGap = 35

function createBlock(){
    if(gameScreen != `Game`) return

    if(blockSeparation > 115){
        blockSeparation = 0
        let blockPosition = Math.floor(Math.random()*43) + 8
        let kryptoBlocksInverted = document.createElement(`div`)
        kryptoBlocksInverted.className = `kryptoBlocks`
        kryptoBlocksInverted.style.top = blockPosition - 70 + `vh`
        kryptoBlocksInverted.style.left = `100vw`

        document.body.appendChild(kryptoBlocksInverted)
        let kryptoBlocks = document.createElement (`div`)
        kryptoBlocks.className = `kryptoBlocks`
        kryptoBlocks.style.top = blockPosition + blocksGap + `vh`
        kryptoBlocks.style.left = `100vw` 
        kryptoBlocks.increaseScore = `1`

        document.body.appendChild(kryptoBlocks)

    }
    blockSeparation++
    requestAnimationFrame(createBlock)
}
requestAnimationFrame(createBlock)
  
}

