window.onload = 
  function(){
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
        temp = document.createElement('b');
        temp.style.width = tileWidth + 'px';
        temp.style.height = tileHeight + 'px'; 
        temp.style.top = cY*tileWidth+'px';
        temp.style.left = cX*tileHeight + 'px';

        switch (gameArray[cY][cX]) {
          case wall:
            temp.style.background = '#fff';
            break;
          case moveable:
            temp.style.background = 'none';
            break;
          case player:
            temp.style.background = '#f00';
            temp.style.border = '1px solid #000';
            console.log("player: "+ i);
            playerPos[i] = {x:cX,y:cY};
            i++
            break;
          case goal:
            temp.style.background = '#0f0';
            temp.style.border = '1px solid #000';
            break;
          case playerOnGoal:
            temp.style.background = '#ff0';
            temp.style.border = '1px solid #000';
            console.log("player: "+ i);
            playerPos[i] = {x:cX,y:cY};
            i++
            break;
          default:
            break;
        };
        temp.appendChild(document.createTextNode(cX + '|' +cY +'='+gameArray[cY][cX])); document.getElementById('gamecontainer').appendChild(temp);
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
            console.log("myY:"+y);
            for(x=0;x<gameArray[y].length;x++){
              console.log("myx:"+x);
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
          console.log(playerPos.length);
          for(i=0;i<playerPos.length;i++) {
            console.log("move: "+ i);
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

};//End onload