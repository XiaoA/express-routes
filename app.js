const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(request, response, next) {
  if (!request.query.nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }
  let numbersAsStrings = request.query.nums.split(',');

  let numbers = convertAndValidateNumsArray(numbersAsStrings);
  if (numbers instanceof Error) {
    throw new ExpressError(numbers.message);
  }


  let result = {
    operation: "mean",
    result: findMean(numbers)
  }

  return response.send(result);
});

app.get('/median', function(request, response, next) {
  if (!request.query.numbers) {
    throw new ExpressError('You must pass a query key of numbers with a comma-separated list of numbers.', 400)
  }
  let numbersAsStrings = request.query.numbers.split(',');
  // check if anything bad was put in
  let numbers = convertAndValidateNumbersArray(numbersAsStrings);
  if (numbers instanceof Error) {
    throw new ExpressError(numbers.message);
  }

  let result = {
    operation: "median",
    result: findMedian(numbers)
  }

  return response.send(result);
  
});

app.get('/mode', function(request, response, next) {
  if (!request.query.numbers) {
    throw new ExpressError('You must pass a query key of numbers with a comma-separated list of numberbers.', 400)
  }
  let numbersAsStrings = request.query.numbers.split(',');

  let numbers = convertAndValidateNumbersArray(numbersAsStrings);
  if (numbers instanceof Error) {
    throw new ExpressError(numbers.message);
  }

  let result = {
    operation: "mode",
    result: findMode(numbers)
  }

  return response.send(result);

 
});

app.use(function (request, response, next) {
  const error = new ExpressError("Not Found",404);

  return next(error);
});

app.use(function (error, request, response, next) {
  response.status(error.status || 500);

  return response.json({
    error: error,
    message: error.message
  });
});


app.listen(3000, function() {
  console.log(`Server starting on port 3000`);
});
