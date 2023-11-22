let canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d"),
  ballRadius = 9,
  x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
  y = canvas.height - 40,
  dx = 2,
  dy = -2;

let paddleHeight = 12;
paddleWidth = 72;

// the starting position of Paddle:
let paddleX = (canvas.width - paddleWidth) / 2;

//bricks
let rowCount = 5,
  columnCount = 9,
  brickWidth = 54,
  brickHeight = 18,
  brickPadding = 12,
  topOffset = 40,
  leftOffset = 33,
  score = 0;

//bricks array
let bricks = [];
for (let i = 0; i < columnCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < rowCount; j++) {
    //set bricks positions
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

//basically the entire mouse-moving situation
document.addEventListener("mousemove", mouseMouseHandler, false);

//move paddle
function mouseMouseHandler(e){
    var relX = e.clientX - canvas.offsetLeft;
    if(relX > 0 && relX < canvas.width) {
        paddleX = relX - paddleWidth/2;
    }
}
//draw paddle function
function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#ffa69e';
    ctx.fill();
    ctx.closePath();
}

//draw ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffa69e';
    ctx.fill();
    ctx.closePath();
}

//draw bricks
function drawBricks(){
    for (let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++) {
            if(bricks[i][j].status === 1){
                let brickX = (i * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (j * (brickHeight + brickPadding)) + topOffset;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#e29578';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//track score
function trackScore(){
    ctx.font = 'bold 16px sans-serif';
    ctx.filStyle = '#333';
    ctx.fillText('Score : ' + score, 8, 24);
}

//check when ball hits bricks
function hitDetection(){
    for (let i = 0; i < columnCount; i++){
        for (let j = 0; j < rowCount; j++){
            let b = bricks[i][j];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    //check if won
                    if(score === rowCount * columnCount){
                        alert('You Win!');
                        document.location.reload();

                    }
                }
            }
        }
    }
}

//main function
function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    //detect left and right walls
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    //detect top wall
    if(y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius){
        //detect paddle hits
        if(x > paddleX && y < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // if the ball doesn't hit the paddle
            alert('Game Over :(');
            document.location.reload();
        }
    }

    //detect bottom wall
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }

    //move the ball
    x += dx;
    y += dy;
}

setInterval(init, 10); 
