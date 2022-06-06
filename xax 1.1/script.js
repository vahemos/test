const img = {
  rabbit: { name: "rabbit", src: "./img/rabbit.png", id: 1 },
  wolf: { name: "wolf", src: "./img/gamewolf.png", id: 2 },
  ban: { name: "ban", src: "./img/ban.png", id: 3 },
  house: { name: "house", src: "./img/home.png", id: 4 },
};

const rabbit = img.rabbit.name;
const house = img.house.name;
const wolf = img.wolf.name;
const ban = img.ban.name;

const freebox = "0";

function getArray() {
  const value = parseInt(document.getElementById("select").value);
  const place = new Array(value)
    .fill(freebox)
    .map(() => new Array(value).fill(freebox));

  return place;
}

function freeCoordinates(arr) {
  const x = Math.floor(Math.random() * arr.length);
  const y = Math.floor(Math.random() * arr.length);

  if (arr[x][y] === freebox) {
    return [x, y];
  } else {
    return freeCoordinates(arr);
  }
}

function setCharacter(gameMember, arr) {
  const [x, y] = freeCoordinates(arr);
  arr[x][y] = gameMember;
}

function memberCount(count, arr, gameMember) {
  for (let i = 0; i < count; i++) {
    setCharacter(gameMember, arr);
  }
}

function getMemberPosition(arr, gameMember) {
  const findeposs = function (accum, row, x) {
    row.forEach((item, y) => {
      if (item === gameMember) {
        accum.push([x, y]);
      }
    });
    return accum;
  };

  return arr.reduce(findeposs, []);
}

//move left

function arrowLeft(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let yAfterWalk = y - 1;
  if (y === 0) {
    yAfterWalk = arr.length - 1;
  }
  if (arr[x][yAfterWalk] === freebox) {
    arr[x][yAfterWalk] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[x][yAfterWalk] === wolf) {
    console.log("game over");
  } else if (arr[x][yAfterWalk] === house) {
    // arr[x][yAfterWalk] = rabbit
    arr[x][y] = freebox;
    alert("you won");
    clearGameZone();
    console.log("you won");
  }
}

//move Up
function arrowUp(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let xAfterWalk = x - 1;
  if (x === 0) {
    xAfterWalk = arr.length - 1;
  }
  if (arr[xAfterWalk][y] === freebox) {
    arr[xAfterWalk][y] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[xAfterWalk][y] === wolf) {
    console.log("game over");
  } else if (arr[xAfterWalk][y] === house) {
    // arr[xAfterWalk][y] = rabbit
    arr[x][y] = freebox;
    alert("you won");
    clearGameZone();
    console.log("you won");
  }
}

//move right
function arrowRight(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let yAfterWalk = y + 1;
  if (y === arr.length - 1) {
    yAfterWalk = 0;
  }
  if (arr[x][yAfterWalk] === freebox) {
    arr[x][yAfterWalk] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[x][yAfterWalk] === wolf) {
    console.log("game over");
  } else if (arr[x][yAfterWalk] === house) {
    // arr[x][yAfterWalk] = rabbit
    arr[x][y] = freebox;
    clearGameZone();
    alert("you won");
  }
}

//move down
function arrowDown(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let xAfterWalk = x + 1;
  if (x === arr.length - 1) {
    xAfterWalk = 0;
  }
  if (arr[xAfterWalk][y] === freebox) {
    arr[xAfterWalk][y] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[xAfterWalk][y] === wolf) {
    console.log("game over");
  } else if (arr[xAfterWalk][y] === house) {
    // arr[xAfterWalk][y] = rabbit
    arr[x][y] = freebox;
    clearGameZone();
    alert("you won");
  }
}

function getCordinat(arr, [x, y]) {
  const cells = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  const result = cells.filter((item) => checkIsEmpty(arr, item));
  return result;
}

function checkIsEmpty(arr, [x, y]) {
  return x >= 0 && x < arr.length && y >= 0 && y < arr.length;
}

function freePossitionsAroundWolves(arr, member) {
  let wolvesCorrentPossition = getMemberPosition(arr, member);

  wolvesCorrentPossition.forEach((item) => {
    const cells = getCordinat(arr, item);
    const freeCells = rabbitOrFreebox(arr, cells);
    const distanceArray = getClosestCell(freeCells, arr);
    const closestCell = getMinDistance(distanceArray, freeCells);
    moaveSingleWolfToNewPosition(closestCell, item, arr);
  });
}

function rabbitOrFreebox(matrix, emptyCellsArr) {
  const massiv = [];
  emptyCellsArr.forEach((item) => {
    const [x, y] = item;
    if(matrix[x][y] === rabbit && matrix[x][y] !== house) {
      alert("game over");
    }
    if (matrix[x][y] === freebox) {
      massiv.push([x, y]);
    }
  });
  return massiv;
}

function getClosestCell(freeBoxes, arr) {
  const rabbitCords = getMemberPosition(arr, rabbit);

  const distaceArray = [];
  freeBoxes.forEach((cord) => {
    const distanceSingle = distance(cord, rabbitCords[0]);
    distaceArray.push(distanceSingle);
  });
  return distaceArray;
}

function getMinDistance(distaceArray, freeBoxes) {
  const min = Math.min(...distaceArray);
  const index = distaceArray.indexOf(min);
  return freeBoxes[index];
}

function distance(wolf, rabbit) {
  const [x, y] = wolf;
  const [z, k] = rabbit;

  return Math.round(Math.sqrt(Math.pow(x - z, 2) + Math.pow(y - k, 2)));
}

function moaveSingleWolfToNewPosition([x, y], [z, k], array) {
  array[x][y] = wolf;
  array[z][k] = freebox;
}

function checkDoesKeyPressed(arr, herro) {
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
      arrowLeft(arr, herro);
      freePossitionsAroundWolves(arr, wolf);
      clearGameZone();
      createGameBoard(arr);
    } //left
    else if (event.keyCode === 38) {
      arrowUp(arr, herro);
      freePossitionsAroundWolves(arr, wolf);
      clearGameZone();
      createGameBoard(arr);
    } //up
    else if (event.keyCode === 39) {
      arrowRight(arr, herro);
      freePossitionsAroundWolves(arr, wolf);
      clearGameZone();
      createGameBoard(arr);
    } //right
    else if (event.keyCode === 40) {
      arrowDown(arr, herro);
      freePossitionsAroundWolves(arr, wolf);
      clearGameZone();
      createGameBoard(arr);
    } //down
  });
}


//drow
document.querySelector(".btn ").onclick = () => {
  const selectValue = parseInt(document.getElementById("select").value);
  gameZoneSize(selectValue);
  const matrix = getArray();

  const napoCount = 1;
  const homeCount = 1;
  const wolvesCount = Math.ceil(
    (60 * document.querySelector(".select").value) / 100
  );
  const banersCount = Math.ceil(
    (40 * document.querySelector(".select").value) / 100
  );

  memberCount(napoCount, matrix, rabbit);
  memberCount(homeCount, matrix, house);
  memberCount(wolvesCount, matrix, wolf);
  memberCount(banersCount, matrix, ban);

  getMemberPosition(matrix, rabbit);
  getMemberPosition(matrix, house);
  getMemberPosition(matrix, wolf);
  getMemberPosition(matrix, ban);

  clearGameZone();
  createGameBoard(matrix);

  checkDoesKeyPressed(matrix, rabbit);

  console.log(matrix, "matrix");
};

function gameZoneSize(selectValue) {
  const gameZone = document.getElementById("game_zone");
  const gameZoneSize = selectValue * 60 + 20 + "px";
  gameZone.style.width = gameZoneSize;
}

function createInnerDivs(id) {
  const mainDiv = document.getElementById("game_zone");
  const innerDiv = document.createElement("div");
  innerDiv.setAttribute("id", id);
  mainDiv.append(innerDiv);
}
function createImg(id, character) {
  const mainDiv = document.getElementById(id);
  const innerImg = document.createElement("img");
  innerImg.setAttribute("src", character);
  mainDiv.append(innerImg);
}

function createGameBoard(matrix) {
  matrix.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const id = rowIndex.toString() + columnIndex.toString();
      if (column === freebox) {
        createInnerDivs(id);
      }
      if (column === wolf) {
        createInnerDivs(id);
        createImg(id, img.wolf.src);
      }
      if (column === ban) {
        createInnerDivs(id);
        createImg(id, img.ban.src);
      }
      if (column === house) {
        createInnerDivs(id);
        createImg(id, img.house.src);
      }
      if (column === rabbit) {
        createInnerDivs(id);
        createImg(id, img.rabbit.src);
      }
    });
  });
}
function clearGameZone() {
  const mainDiv = document.getElementById("game_zone");
  mainDiv.innerHTML = "";
}
