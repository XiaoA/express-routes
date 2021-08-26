function createFrequencyCounter(array) {
  return array.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function findMode(arr) {
  let freqencyCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqencyCounter) {
    if (freqencyCounter[key] > count) {
      mostFrequent = key;
      count = freqencyCounter[key];
    }
  }

  return +mostFrequent;
}

function convertAndValidateNumsArray(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let valToNumber = Number(numsAsStrings[i]);

    if (Number.isNaN(valToNumber)) {
      return new Error(
        `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
      );
    }

    result.push(valToNumber);
  }
  return result;
}

function findMean(numbers){
  if(numbers.length === 0) return 0;
  return numbers.reduce(function (acc, cur) {
    return acc + cur;
  }) / numbers.length
}

function findMedian(numbers){

  numbers.sort((a, b) => a - b);

  let middleIndex = Math.floor(numbers.length / 2);
  let median;

  if (numbers.length % 2 === 0) {
    median = (numbers[middleIndex] + numbers[middleIndex - 1]) / 2;
  } else {
    median = numbers[middleIndex];
  }
  return median
}



module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray
};
