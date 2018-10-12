'use strict';

(function () {
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

  var debounce = function (fun) {
    var DEBOUNCE_INTERVAL = 500;
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
    isFormHidden: isFormHidden,
    debounce: debounce
  };
})();
