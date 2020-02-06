function change_Score () {
    info.changeScoreBy(1)
}
function Meteor () {
    meteor = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . 2 2 2 2 2 2 2 . . . . . . 
. . 2 d 4 d d d d d 2 . . . . . 
. 2 d d d d d 4 d d d 2 . . . . 
. 2 d d 4 d 4 d d 4 d 2 . . . . 
. 2 d 4 d d d d d d d 2 . . . . 
. 2 d d d d 4 d d d d 2 . . . . 
. 2 d 4 d d d d d 4 d 2 . . . . 
. 2 d d d 4 d d 4 d d 2 . . . . 
. 2 d d d d d d d 4 d 2 . . . . 
. . 2 4 d d d d d d 2 . . . . . 
. . . 2 2 2 2 2 2 2 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
    meteor.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
}
function game_Over () {
    game.over(false)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let extra_Velocity = 0
let meteor: Sprite = null
let spaceship = sprites.create(img`
. . . . . 7 1 1 7 . . . . . . . 
. . . . 7 1 1 1 1 7 . . . . . . 
. . . . 7 1 1 1 1 7 . . . . . . 
. . . 7 1 1 1 1 1 1 7 . . . . . 
. . . 7 1 1 1 1 1 1 7 . . . . . 
. . . 7 1 1 1 1 1 1 7 . . . . . 
. . . 7 1 1 1 1 1 1 7 . . . . . 
. . . 7 1 1 1 1 1 1 7 . . . . . 
. . . 7 1 1 1 1 1 1 7 . . . . . 
. . . . 7 1 1 1 1 7 . . . . . . 
. . . . 7 1 1 1 1 7 . . . . . . 
. . . 7 2 4 2 2 4 2 7 . . . . . 
. . 7 4 2 2 4 4 2 2 4 7 . . . . 
. . . 4 2 2 4 4 2 2 4 . . . . . 
. . 2 4 4 2 4 4 2 4 4 2 . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
controller.moveSprite(spaceship)
spaceship.x = 8
spaceship.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
Meteor()
change_Score()
// Meteor
game.onUpdateInterval(350, function () {
    meteor = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . 2 2 2 2 2 2 2 . . . . . . 
. . 2 d 4 d d d d d 2 . . . . . 
. 2 d d d d d 4 d d d 2 . . . . 
. 2 d d 4 d 4 d d 4 d 2 . . . . 
. 2 d 4 d d d d d d d 2 . . . . 
. 2 d d d d 4 d d d d 2 . . . . 
. 2 d 4 d d d d d 4 d 2 . . . . 
. 2 d d d 4 d d 4 d d 2 . . . . 
. 2 d d d d d d d 4 d 2 . . . . 
. . 2 4 d d d d d d 2 . . . . . 
. . . 2 2 2 2 2 2 2 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
    meteor.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
    extra_Velocity = 0
    if (Math.percentChance(20)) {
        extra_Velocity = Math.randomRange(0, 50)
    } else {
        extra_Velocity = Math.randomRange(-16, 16)
    }
    meteor.setVelocity(-50 - 5 * extra_Velocity, 0)
    if (info.score() <= 20) {
        controller.moveSprite(spaceship, 100 - 2 * info.score(), 100 - 2 * info.score())
    }
})
// Score
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
