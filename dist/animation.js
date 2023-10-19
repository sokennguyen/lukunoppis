const aniCtrl = {
    speed: 20,
    framesPerRow: 8,
    frameWidth: 200,
    frameHeight: 200,
    totalFrames: 16,
    currentFrame: 0,
    myDestination: "Not yet"
};


// createUIPlayer is object that animates the specidic player on screen 
function createUIPlayer(selectedColor, x ,y) {
    //Start position of pawn
    let startPixel = convertToPixels(87, 5);
    if (x != null & y != null) { startPixel = convertToPixels(x, y);  }
    
    let xPosition = startPixel.x;
    let yPosition = startPixel.y;

    let colorULR = getColourURL(selectedColor);
    let myColor = selectedColor;

    //�nit canvas and spritesheet 
    let canvas = document.getElementById('canvas' + selectedColor);
    console.log(canvas)
    console.log('canvas' + selectedColor)
    let ctx = canvas.getContext('2d');


    let scale = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    ctx.scale(scale, scale);


    function convertToPixels(targetPercentX, targetPercentY) {

        //Size of square
        let adjustX = 8;
        let adjustY = 7;

        targetPercentX += adjustX;
        targetPercentY += adjustY;
        let fixitX = 100 - targetPercentX;
        let windowWidthPixels = window.innerWidth;
        let windowHeightPixels = window.innerHeight;

        let targetX = (fixitX / 100) * windowWidthPixels;
        let targetY = (targetPercentY / 100) * windowHeightPixels;

        return {
            x: targetX,
            y: targetY
        };
    }

    function drawPawn(y, x) {

        let XandY = convertToPixels(y, x)
        let targetX = XandY.x;
        let targetY = XandY.y;

        let distanceX = targetX - xPosition;
        let distanceY = targetY - yPosition;
        let frames = Math.sqrt(distanceX ** 2 + distanceY ** 2) / aniCtrl.speed;
        let speedX = distanceX / frames;
        let speedY = distanceY / frames;


        let img = new Image();

        img.src = colorULR;


        let animationId; // To keep track of the animation frame ID

        img.onload = function () {
            animationId = requestAnimationFrame(animateSprite);
        };


        function animateSprite() {
            // Movement towards target logic
            if (Math.abs(targetX - xPosition) > Math.abs(speedX) || Math.abs(targetY - yPosition) > Math.abs(speedY)) {
                xPosition += speedX;
                yPosition += speedY;
                animationId = requestAnimationFrame(animateSprite);
            } else {
                // Once the target is reached, reset to the first frame
                aniCtrl.currentFrame = 0;
                cancelAnimationFrame(animationId); // Stop the animation once the target is reached
                //console.log('Animation finished!');
                animationOn = false;
                refreshTable(players[previousPlayer]);
                if (playerMove) {
                    bigBookOnCss(true)
                    playerMove = false
                }

            }

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate current row and column for animation
            let currentRow = Math.floor(aniCtrl.currentFrame / aniCtrl.framesPerRow);
            let currentCol = aniCtrl.currentFrame % aniCtrl.framesPerRow;

            let desiredWidth = aniCtrl.frameWidth * 0.2;
            let desiredHeight = aniCtrl.frameHeight * 0.2;

            // Draw the sprite frame at the current position
            ctx.drawImage(img, currentCol * aniCtrl.frameWidth, currentRow * aniCtrl.frameHeight, aniCtrl.frameWidth, aniCtrl.frameHeight, xPosition, yPosition, desiredWidth, desiredHeight);

            // Move to the next frame for sprite animation
            aniCtrl.currentFrame = (aniCtrl.currentFrame + 1) % aniCtrl.totalFrames;
        }

    }

    return {
            sendPawn(des) {
                //console.log(" destination t.sendpawn " + des)
                let desPos = positions[des];
                let x = desPos[1];
                let y = desPos[0];
                drawPawn(y, x);
            },
    }
}