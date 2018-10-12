'use strict';

(function () {
  var range = document.querySelector('.range');
  var rightRangeButton = range.querySelector('.range__btn--right');
  var leftRangeButton = range.querySelector('.range__btn--left');
  var priceMin = range.querySelector('.range__price--min');
  var priceMax = range.querySelector('.range__price--max');
  var rangeFillLine = range.querySelector('.range__fill-line');

  var initRange = function () {
    rightRangeButton.style.left = rightRangeButton.offsetParent.offsetWidth + 'px';
    leftRangeButton.style.left = 0 + 'px';

    countPriceRange(rightRangeButton);
    countPriceRange(leftRangeButton);

    rightRangeButton.addEventListener('mousedown', onRangeButtonMouseDown);
    leftRangeButton.addEventListener('mousedown', onRangeButtonMouseDown);
  };

  var renderFillLine = function () {
    rangeFillLine.style.left = (leftRangeButton.offsetLeft + leftRangeButton.clientWidth) + 'px';
    rangeFillLine.style.right = (rightRangeButton.offsetParent.offsetWidth - rightRangeButton.offsetLeft) + 'px';
  };

  var countPriceRange = function (element) {
    var maxWidth = element.offsetParent.offsetWidth;
    var offset = element.offsetLeft;
    var offsetInPercent = Math.round((offset / maxWidth) * 100);

    if (element === leftRangeButton) {
      priceMin.textContent = offsetInPercent;
    } else if (element === rightRangeButton) {
      priceMax.textContent = offsetInPercent;
    }

    renderFillLine();
  };

  var moveRightRangeButton = function (rightButton, leftButton, shift) {
    var newX = rightButton.offsetLeft - shift;
    if (newX < leftRangeButton.offsetLeft) {
      newX = leftRangeButton.offsetLeft;
    } else if (newX > rightButton.offsetParent.offsetWidth) {
      newX = rightButton.offsetParent.offsetWidth;
    }
    rightButton.style.left = newX + 'px';
  };

  var moveLeftRangeButton = function (leftButton, rightButton, shift) {
    var newX = leftButton.offsetLeft - shift;
    if (newX < 0) {
      newX = 0;
    } else if (newX > rightRangeButton.offsetLeft) {
      newX = rightRangeButton.offsetLeft;
    }
    leftButton.style.left = newX + 'px';
  };

  var onRangeButtonMouseDown = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    var startX = evt.clientX;

    var onRangeButtonMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var moveTarget = moveEvt.target;

      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;

      if (moveTarget === leftRangeButton) {
        moveLeftRangeButton(moveTarget, rightRangeButton, shiftX);
      } else if (moveTarget === rightRangeButton) {
        moveRightRangeButton(moveTarget, leftRangeButton, shiftX);
      }

      countPriceRange(moveTarget);
    };

    var onRangeButtonMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var upTarget = upEvt.target;
      countPriceRange(upTarget);

      upTarget.removeEventListener('mousemove', onRangeButtonMouseMove);
      upTarget.removeEventListener('mouseup', onRangeButtonMouseUp);
      window.util.debounce(window.filters.update(window.data.goods));
    };

    target.addEventListener('mousemove', onRangeButtonMouseMove);
    target.addEventListener('mouseup', onRangeButtonMouseUp);
  };

  window.range = {
    init: initRange
  };

})();
