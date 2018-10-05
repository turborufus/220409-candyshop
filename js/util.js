'use strict';

(function () {
  var onlyNumber = function (formElement) {
    formElement.value = formElement.value.replace(/\D+/g, '');
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createRandomIndexes = function (arrayLength) {
    var randomIndexes = [];
    for (var i = 0; i < arrayLength; i++) { // заполняем массив
      randomIndexes.push(i);
    }

    for (i = arrayLength - 1; i > 0; i--) { // перемешиваем элементы
      var j = getRandomInt(0, i);
      var temp = randomIndexes[j];
      randomIndexes[j] = randomIndexes[i];
      randomIndexes[i] = temp;
    }

    return randomIndexes;
  };

  var numDecline = function (num, nominative, genitiveSingular, genitivePlural) {
    if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
      return genitivePlural;
    } else {
      num = num % 10;
      if (num === 1) {
        return nominative;
      }
      if (num >= 2 && num <= 4) {
        return genitiveSingular;
      }
      if (num > 5 || num === 0) {
        return genitivePlural;
      }
    }
    return genitivePlural;
  };

  var getIndexByTitle = function (goodsArray, title) {
    for (var i = 0; i < goodsArray.length; i++) {
      if (goodsArray[i].name === title) {
        return i;
      }
    }
    return -1;
  };

  var isFormHidden = function (formElement) {
    return (formElement.classList.contains('visually-hidden'));
  };

  window.util = {
    getIndexByTitle: getIndexByTitle,
    numDecline: numDecline,
    createRandomIndexes: createRandomIndexes,
    getRandomInt: getRandomInt,
    onlyNumber: onlyNumber,
    isFormHidden: isFormHidden
  };
})();
