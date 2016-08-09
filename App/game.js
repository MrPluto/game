var TOTAL_PIECE = 16; // should be A Perfect Square number

//生成一组参考答案数组。
exports.createAnswerSequence = function(a,c){
  var target = parseInt(a || 0, 10);
  var count = parseInt(c || 2, 10);
  if (typeof target !== 'number' || typeof target !== 'number') {
    throw new Error('parameters should be a NUMBER ');
  }
  if (target < 5) {
    throw new Error('target should beyond 5');
  }

  var randomPositions = [], i = 0;
  while (i < count) {
    var tmp = Math.floor(Math.random() * target);
    if (randomPositions.indexOf(tmp) < 0 && tmp !== 0) {
      randomPositions.push(tmp);
      ++i;
    }
  }
  var sortRandomPositions = randomPositions.sort((_a,_b) => _a - _b);
  var targetAnswers = [];
  sortRandomPositions.reduce((p,n) => {
    targetAnswers.push(n - p);
    return n;
  },0);
  targetAnswers.push(target - sortRandomPositions[sortRandomPositions.length - 1]);
  return targetAnswers;
}

exports.createAllPieceValue = function(target) {
  var i = 0, arr = [];
  while (i < TOTAL_PIECE) {
    var tmp = Math.floor(Math.random() * 10);
    if (tmp === target) {
      continue;
    }
    arr.push(tmp);
    ++i;
  }
  return arr;
}

function isNearBy(center,b,rowLength) {

  var minus = Math.abs(center - b);
  if (minus !== 1 && minus !== 4 && minus !== 0) {
    return false;
  }

  if (center % rowLength === 0 && b === (center - 1)) {
    return false;
  }

  if (center % rowLength === (rowLength - 1) && b === (center + 1)) {
    return false;
  }

  return true;
}

exports.isNearBy = isNearBy;

function getAvailableIndexes(index, rowLength) {
  var allIndexes = [index - rowLength, index + rowLength, index - 1, index + 1];
  var availableIndexes = [];
  allIndexes.forEach( value => {
    if (value >= 0 && value <= (rowLength * rowLength - 1)) {
      if (isNearBy(index, value,rowLength)) {
        availableIndexes.push(value);
      }
    }
  });
  return availableIndexes;
}

exports.createAnswerIndexes = function(count){
  var indexesArray = [];
  var rowLength = Math.sqrt(TOTAL_PIECE);

  var initialPosition = Math.floor(Math.random() * TOTAL_PIECE);


  var i = 0;
  var availableIndexes = getAvailableIndexes(initialPosition,rowLength);
  while (i < count) {

    if (indexesArray.indexOf(initialPosition) < 0) {
      indexesArray.push(initialPosition);
      availableIndexes = getAvailableIndexes(initialPosition,rowLength);
      ++i;
    }
    initialPosition = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  }
  return indexesArray;
}