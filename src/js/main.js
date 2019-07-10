var game = (function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var player = {
      x:0,
      y:475,
      h: 25,
      w: 25,
      fill: '#fff',
      dir: 'right',
      speed: 5
  }

  var playerTwo = {
    x:775,
    y:475,
    h: 25,
    w: 25,
    fill: 'pink',
    dir: 'left',
    speed: 5
}

  var spawn = {
    x: 50,
    y: 0,
    h: 10,
    w: 10,
    fill: '#ff0',
    speed: 5
  }

  var head = {
    r: 10
  }

  var spawns = {}

  var spawner = null;

  var animation  = null;

  var gameOver = false;

  var scoreP1 = 0;

  var scoreP2 = 0;

  function launchSpawns(){
    spawner = setInterval(()=>{
        //4. Use psuedo-random strings to name the new spawns
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
        spawns[text] = {
            x:Math.floor(Math.random()*this.canvas.width),
            y:spawn.y,
            h:spawn.h,
            w:spawn.w,
            fill:spawn.fill,
            // speed:spawn.speed,
            // speed:Math.floor(Math.random() * 7),
            speed:5,
        }
    
        },400);
  }

  function moveSpawns(){

    if(Object.keys(spawns).length>0){
      for(let spawn in spawns){

        if(spawns[spawn].y<=canvas.height){

          ctx.fillStyle = spawns[spawn].fill;

          ctx.save();

          ctx.clearRect(
            spawns[spawn].x-1,
            spawns[spawn].y-spawns[spawn].speed,
            spawns[spawn].w+2,
            spawns[spawn].h+2
          );

          ctx.fillRect(
            spawns[spawn].x,
            spawns[spawn].y = (spawns[spawn].y+spawns[spawn].speed),
            spawns[spawn].w,
            spawns[spawn].h
          );

          ctx.restore();
          

          if (
            player.x < spawns[spawn].x + spawns[spawn].w &&
            spawns[spawn].x > player.x && spawns[spawn].x < (player.x + player.w) &&
            player.y < spawns[spawn].y + spawns[spawn].h &&
            player.y + player.h > spawns[spawn].y
          ){
            gameOver = true;
            cancelAnimationFrame(animation);
            clearInterval(spawner);
          }

        }else{
          scoreP1 = scoreP1 + 10;
          document.getElementById('scoreP1').innerHTML = 'Player 1: ' + scoreP1;
          delete spawns[spawn];
        }
      }
    }

  }
  


        function movePlayerTwo(){
            ctx.fillStyle=playerTwo.fill;

            if(playerTwo.dir === 'right'){

                ctx.beginPath();

                ctx.clearRect(
                    // player.x-1,
                    playerTwo.x-playerTwo.speed,
                    playerTwo.y-1,
                    playerTwo.w+2,
                    playerTwo.h+2
                );

                ctx.fillRect(
                    // player.x++,
                    playerTwo.x = (playerTwo.x + playerTwo.speed), 
                    playerTwo.y, 
                    playerTwo.w, 
                    playerTwo.h
                    );

                // ctx.beginPath();
                ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
                // ctx.moveTo(110, 75);
                // ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
                // ctx.moveTo(65, 65);
                // ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
                // ctx.moveTo(95, 65);
                // ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
                // ctx.stroke();
                ctx.closePath();

                if((playerTwo.x + playerTwo.w) >= canvas.width){
                    playerTwo.dir = 'left';
                }
    
            }else{

            ctx.clearRect(
                playerTwo.x+playerTwo.speed,
                playerTwo.y-1,
                playerTwo.w+2,
                playerTwo.h+2
            );
    
            ctx.fillRect(
                // player.x--,
                playerTwo.x = (playerTwo.x - playerTwo.speed),
                playerTwo.y,
                playerTwo.w,
                playerTwo.h
            );
        
            if(playerTwo.x <= 0){
                playerTwo.dir = 'right';
            }
        }
      }

      function movePlayer(){
        ctx.fillStyle=player.fill;

        if(player.dir === 'right'){

            ctx.clearRect(
                // player.x-1,
                player.x-player.speed,
                player.y-1,
                player.w+2,
                player.h+2
            );

            ctx.fillRect(
                // player.x++,
                player.x = (player.x + player.speed), 
                player.y, 
                player.w, 
                player.h
                );

            if((player.x + player.w) >= canvas.width){
                player.dir = 'left';
            }

        }else{

        ctx.clearRect(
            player.x+player.speed,
            player.y-1,
            player.w+2,
            player.h+2
        );

        ctx.fillRect(
            // player.x--,
            player.x = (player.x - player.speed),
            player.y,
            player.w,
            player.h
        );
    
        if(player.x <= 0){
            player.dir = 'right';
        }
    }
  }

      function animate(){

        movePlayer();
        movePlayerTwo();
        moveSpawns();
        if(gameOver===false){
            animation = window.requestAnimationFrame(animate.bind(animation));
        }
    }

    return {

      
    changeDirection: function(){

      switch (event.key) {
        case "ArrowLeft":
            // Left pressed
            playerTwo.dir = 'left';
            break;
        case "ArrowRight":
            // Right pressed
            playerTwo.dir = 'right';
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;

        case "a":
            // d (Left) pressed
            player.dir = 'left';
            break;
          case "d":
              // d (Right) pressed
              player.dir = 'right';
              break;
          case "w":
              // w (Up) pressed
              break;
          case "s":
              // s (Down) pressed
              break;
    }

        // if(player.dir === 'left'){
        //   player.dir = 'right';
        // }else if(player.dir === 'right'){
        //   player.dir = 'left';
        // }
      },

      init: function(){
        canvas.height = 600;
        canvas.width = 800;

        document.getElementById('scoreP1').innerHTML = 'Player 1: ' + scoreP1;
        document.getElementById('scoreP2').innerHTML = 'Player 2: ' + scoreP2;

        launchSpawns();
        animate();
      }
    }
})();

game.init();
//any key listener
// window.addEventListener('keyup', function(){
//     game.changeDirection();
//   });

window.addEventListener('keydown', function(event) {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  game.changeDirection();
  console.log(event.key);
});