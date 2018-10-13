'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var HIDDEN_CLASSNAME = 'visually-hidden';

  var onlyNumber = function (formElement) {
    formElement.value = formElement.value.replace(/\D+/g, '');
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
    var i = 0;
    var isFound = false;
    var index = -1;
    while (i < goodsArray.length && !isFound) {
      if (goodsArray[i].name === title) {
        isFound = true;
        index = i;
      }
      i += 1;
    }
    return index;
  };

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getIndexByTitle: getIndexByTitle,
    numDecline: numDecline,
    onlyNumber: onlyNumber,
    debounce: debounce,
    HIDDEN_CLASSNAME: HIDDEN_CLASSNAME
  };
})();
