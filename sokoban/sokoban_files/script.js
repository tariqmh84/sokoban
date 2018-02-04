/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
	Wall: "tile-wall",
	Space: "tile-space",
	Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
	Character: "entity-player",
	Block: "entity-block",
	BlockDone: "entity-block-goal"
};

/*  Legend
W = Wall
B = Movable block
P = Player starting position
G = Goal area for the blocks
 */
var mapsArray = {
	width: 19,
	height: 14,
	mapGrid: [

		[[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
		[['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
		[['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
		[['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
		[[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
		[[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
		[[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
	]
};

// Variables
var box = document.getElementById("box");
var tile = "";
var IDNum = 0;
var x = 0, y = 0, z = 0;
var goalTileAtTarget = 0;

var playerPosition = {
	xPos: 0,
	yPos: 0
}

// Position object to define the player position
function Position(x, y) {
	this.x = x;
	this.y = y;
	this.xx = x + x;
	this.yy = y + y;
}

// Drawing the game map form
function addTiles() {
	for (x = 0; x < mapsArray.mapGrid.length; x++) {
		for (y = 0; y < mapsArray.mapGrid[x].length; y++) {
			var elem = document.createElement("div");
			//  console.log(mapsArray.mapGrid[x][y]);
			switch (mapsArray.mapGrid[x][y][z]) {
			case 'W':
				tile = Tiles.Wall;
				break;
			case 'G':
				tile = Tiles.Goal;
				goalTileAtTarget++;
				break;
			case 'B':
				tile = Entities.Block;
				break;
			case 'P':
				tile = Entities.Character;
				playerPosition.xPos = x;
				playerPosition.yPos = y;
				break;
			default:
				tile = Tiles.Space;
				break;
			}

			elem.className = "tile " + tile;
			elem.id = x + "and" + y;
			box.appendChild(elem);
		}
	}
}
addTiles();


// Win function
function onWin() {
	var goalDone = document.getElementsByClassName(Entities.BlockDone);

	if (goalDone.length == goalTileAtTarget) {
		document.getElementById("overlay").style.display = "block";
	}
}

function offWin() {
	document.getElementById("overlay").style.display = "none";
	document.getElementById("box").style.display = "block";
}



// Handling arrow key event 
function moveSelection(evt) {
	switch (evt.keyCode) {
	case 37:
		evt.preventDefault();
		var tilePosition = new Position(0, -1);
		currentPosition(tilePosition);
		break;
	case 38:
		evt.preventDefault();
		var tilePosition = new Position(-1, 0);
		currentPosition(tilePosition);
		break;
	case 39:
		evt.preventDefault();
		var tilePosition = new Position(0, 1);
		currentPosition(tilePosition);
		break;
	case 40:
		evt.preventDefault();
		var tilePosition = new Position(1, 0);
		currentPosition(tilePosition);
		break;
	default:
		return;
	}
};

var arrow_keys_handler = function (e) {
	switch (e.keyCode) {
	case 37:
	case 39:
	case 38:
	case 40: // Arrow keys
	case 32:
		e.preventDefault();
		break; // Space
	default:
		break; // do not block other keys
	}
};

window.addEventListener("keydown", arrow_keys_handler, false);

// Track current player position and update it
function currentPosition(tilePosition) {
	var nextTile = document.getElementById((playerPosition.xPos + tilePosition.x) + "and" + (playerPosition.yPos + tilePosition.y));
	if (nextTile.classList.contains(Tiles.Wall)) {
		return;
	} else if (nextTile.classList.contains(Entities.Block)) {
		var afterNextTile = document.getElementById((playerPosition.xPos + tilePosition.xx) + "and" + (playerPosition.yPos + tilePosition.yy));

		if (afterNextTile.classList.contains(Tiles.Wall) || afterNextTile.classList.contains(Entities.Block)) {
			return;
		} else {
			moveTile(nextTile, afterNextTile);
			movePlayer(tilePosition);
		}

	} else {
		movePlayer(tilePosition);
	}

}
function updatePlayerPosition(tilePosition) {
	playerPosition.xPos += tilePosition.x;
	playerPosition.yPos += tilePosition.y;
}

function moveTile(nextTile, afterNextTile) {
	nextTile.classList.remove(Entities.Block);

	if (nextTile.classList.contains(Tiles.Goal)) {
		nextTile.classList.remove(Entities.BlockDone);
	}
	afterNextTile.classList.add(Entities.Block);
	afterNextTile.classList.remove(Tiles.Space);

	if (afterNextTile.classList.contains(Tiles.Goal)) {
		afterNextTile.classList.add(Entities.BlockDone);
		onWin();
	}

}

function movePlayer(tilePosition) {
	var playerPos = document.getElementsByTagName('div');
	for (var i = 0; i < playerPos.length; i++) {
		if (playerPos[i].classList.contains("entity-player")) {
			playerPos[i].classList.add(Tiles.Space);
			playerPos[i].classList.remove(Entities.Character);
			updatePlayerPosition(tilePosition);
		}
	}

	var playerNewPosition = document.getElementById(playerPosition.xPos + "and" + playerPosition.yPos);
	playerNewPosition.classList.add(Entities.Character);
	playerNewPosition.classList.add(Tiles.Space);

}

function docReady() {

	window.addEventListener('keydown', moveSelection);
}



