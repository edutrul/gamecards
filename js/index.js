window.onload = 
  function() {
  var gameArray = [[0,0,0,0,0],
                   [0,0,0,0,0],
                   [0,1,1,1,0],
                   [0,2,0,1,0],
                   [0,0,0,3,0],
                   [0,0,0,0,0],
                   [0,0,0,0,0],
                   [0,0,0,0,0]],
      wall=0,
      moveable=1,
      player=2,
      goal=3,
      playerOnGoal=4,
      steps=0,
      playable=true,
      x,y,i=0,j=0,newX,newY,
      tileWidth=50,
      tileHeight=50,
      temp,
      playerPos = [],
      renderTile = function(cX,cY) {
        console.log(cX);
        console.log(cY);
        temp = document.createElement('b');
        temp.style.width = tileWidth + 'px';
        temp.style.height = tileHeight + 'px'; 
        temp.style.top = cY*tileWidth+'px';
        temp.style.left = cX*tileHeight + 'px';

        switch (gameArray[cY][cX]) {
          case wall:
            temp.style.backgroundImage = "url('images/maderacubo.png'), url('images/pasto.png')";
            temp.style.backgroundRepeat = "no-repeat";
            break;
          case moveable:
            temp.style.backgroundImage = "url('images/pasto.png')";
            break;
          case player:
            temp.style.backgroundImage = "url('images/angrybird.gif'), url('images/pasto.png')";
            temp.style.backgroundSize = "50px";
            temp.style.border = '0px solid #000';
            playerPos[i] = {x:cX,y:cY};
            i++
            break;
          case goal:
            temp.style.backgroundImage = "url('https://studio.code.org/blockly/media/skins/birds/goalIdle.gif'), url('images/pasto.png')";            
            temp.style.backgroundSize = "50px";
            temp.style.border = '0px solid #000';
            break;
          case playerOnGoal:
            temp.style.background = '#ff';
            temp.style.border = '0px solid #ff0';
            playerPos[i] = {x:cX,y:cY};
            i++
            break;
          default:
            break;
        };
        console.log(temp);
        document.getElementById('gamecontainer').appendChild(temp);
      }, // End render tile 
      renderSteps = function() {
        document.getElementById('steps').innerHTML = "";
        temp = document.createElement('b');
        temp.style.width = tileWidth*2 + 'px';
        temp.style.height = tileHeight + 'px';
        temp.style.right = '0px';
        temp.style.top = '0px';
        temp.appendChild(document.createTextNode('STEPS: ' + steps)); 
        document.getElementById('steps').appendChild(temp);
      },
      renderWorld = function() {
        if(playable) {
          i=0;
          document.getElementById('gamecontainer').innerHTML = "";
          //Draw World
          for(y=0;y<gameArray.length;y++){
            for(x=0;x<gameArray[y].length;x++){
              renderTile(x,y);
            }
          };
          renderSteps();
        } else {
          console.log("NEXT-LEVEL");
          document.getElementById('gamecontainer').innerHTML = "WIN!";
        }
      },
      move = function (direction) {
        if(playable) {
          for(i=0;i<playerPos.length;i++) {
            switch(direction) {
              case 0: // UP
                newX = playerPos[i].x;
                newY = playerPos[i].y-1;
                break;
              case 1: // RIGHT
                newX = playerPos[i].x+1;
                newY = playerPos[i].y;
                break;
              case 2: // DOWN
                newX = playerPos[i].x;
                newY = playerPos[i].y+1;
                break;
              case 3: // LEFT
                newX = playerPos[i].x-1;
                newY = playerPos[i].y;
                break;
              default:
                break;
            };   

            // Neue und alte Position
            switch(gameArray[newY][newX]) {
              case moveable:
                if (gameArray[playerPos[i].y][playerPos[i].x] == playerOnGoal) {
                  gameArray[playerPos[i].y][playerPos[i].x] = goal;
                  j--;
                } else {
                  gameArray[playerPos[i].y][playerPos[i].x] = moveable;
                }
                gameArray[newY][newX] = player;
                break;
              case goal:
                if (gameArray[playerPos[i].y][playerPos[i].x] == playerOnGoal) {
                  gameArray[playerPos[i].y][playerPos[i].x] = goal;
                } else {
                  gameArray[playerPos[i].y][playerPos[i].x] = moveable;
                }
                gameArray[newY][newX] = playerOnGoal;
                j++;

                break;                
              default:
                break;
            };
          }
          if (j==playerPos.length) {
            playable=false;
          }
          steps++;
          renderWorld();
        } 
      },// END MOVE  
      init= function(){
        document.addEventListener("keydown", function(event) {input(event);});
        renderWorld();
        window.focus();
      },
      map = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // Vim up
        76: 1, // Vim right
        74: 2, // Vim down
        72: 3, // Vim left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3  // A
      },//inputmanager
      input = function (event) {

        var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        var mapped    = map[event.which];

        if (!modifiers) {
          if (mapped !== undefined) {
            // Deaktiviert Standard Verhalten
            event.preventDefault();
            move(mapped);
          }
        }
        // R key restarts the game
        if (!modifiers && event.which === 82) {
          //self.restart.call(self, event);
        }
      };
  init();
  
  $.ajax({
    type: "POST",
    url: '/data.php',
    success: function(response) {
      if (response.data != 'undefined') {
        console.log(response);
        console.log(response.data);
        //movements = [0, 1, 1, 2, 2];
        movements = response.data.split(',').map(Number);
        delayTime = 1000;
        for (var i = movements.length-1; i >= 0; i--) {
          $('#gamecontainer').after('<img class="arrows" src="images/arrow_' + movements[i] + '.png">');
        }
        console.log('hello');
        i = 0;
        makeMovements(i);
      }
    }
  });
  
  function makeMovements(i) {
    setInterval(function() {
      move(movements[i]);
      i++;
    }, delayTime);
  }
  
  /**
   * 
   * Sleeps for a certain time.
   * 
   * @param int milliseconds
   *   Milliseconds (e.g: 1000).
   */
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

};//End onload