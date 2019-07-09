var game = (function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
  
    //1. Create the player object
    // Define all argument that will be used by fillRect()
    var player = {
        x:0,
        y:475,
        h: 25,
        w: 25,
        fill: '#fff',
        //1. Add a default direction for player movement.
        dir: 'right',
        //1. Add a speed property to the player this is the number of pixels 
        //the player will move each frame
        speed: 5
    }

  //1. Define an enemy spawn
  var spawn = {
    x: 50,
    y: 0,
    h: 10,
    w: 10,
    fill: '#ff0',
    speed: 5
  }

  //2. Create a method for launching spawns
  // this iteration will launch a single spawn
  function launchSpawns(){
    ctx.fillStyle=spawn.fill;

    ctx.clearRect(
      spawn.x-1,
      spawn.y-spawn.speed,
      spawn.w+2,
      spawn.h+2
    );

    ctx.fillRect(
      spawn.x,
      spawn.y = (spawn.y + spawn.speed),
      spawn.w,
      spawn.h
    );
  }

    return {

        //2. Draw the player to the canvas
        player: function(){
            ctx.fillStyle=player.fill;

            if(player.dir === 'right'){

            //2. Change x-1 to player.x-player.speed

            //1. Define how many pixels the player
            // should move each frame (i.e. speed)
            ctx.clearRect(
                // player.x-1,
                player.x-player.speed,
                player.y-1,
                player.w+2,
                player.h+2
            );

            //2. Add x pixels to move the player to the right
            // if(player.dir === 'right'){
                //3. Change player.x++ to player.x = (player.x + player.speed)
                ctx.fillRect(
                    // player.x++,
                    player.x = (player.x + player.speed), 
                    player.y, 
                    player.w, 
                    player.h
                    );
            //3. Change the player direction when the player touches the edge 
            //of the canvas.
            if((player.x + player.w) >= canvas.width){
                player.dir = 'left';
            }
    
            }else{

            //4. Change player.x+1 to player.x+player.speed
            ctx.clearRect(
                player.x+player.speed,
                player.y-1,
                player.w+2,
                player.h+2
            );
    
                //4. Subtract x pixels to move the player to the left
                //5. Change player.x-- to player.x = (player.x - player.speed),
                ctx.fillRect(
                    // player.x--,
                    player.x = (player.x - player.speed),
                    player.y,
                    player.w,
                    player.h
                );
        
                //5. Change the player direction when the player touches the edge 
                //of the canvas.
                if(player.x <= 0){
                    player.dir = 'right';
                }
            }
      },

    //1. Create a setter for changing the current direction of the user.
    changeDirection: function(){
        if(player.dir === 'left'){
          player.dir = 'right';
        }else if(player.dir === 'right'){
          player.dir = 'left';
        }
      },

        //2. Create an animation frame
        //3. Redraw the player every time a frame is executed
        animate: function(){
            this.player();
            //3. Animate the spawns
            launchSpawns();
            window.requestAnimationFrame(this.animate.bind(this));
        },

      init: function(){
        canvas.height = 600;
        canvas.width = 800;

        // this.player();
        this.animate();
      }
    }
})();

game.init();

//2. Add a listener to allow the  user to change the direction
//of the player sprite
window.addEventListener('keyup', function(){
    game.changeDirection();
  });