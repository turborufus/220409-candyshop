'use strict';

(function () {
  var renderFillLine = function () {
    rangeFillLine.style.left = leftRangeButton.offsetLeft + 'px';
    rangeFillLine.style.right = (rightRangeButton.offsetParent.offsetWidth - rightRangeButton.offsetLeft) + 'px';
  };

  var countOffsetInPercent = function (element) {
    var maxWidth = element.offsetParent.offsetWidth;
    var offset = element.offsetLeft + (element.clientWidth / 2);
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
    if (newX < leftRangeButton.offsetLeft + rightButton.clientWidth / 2) {
      newX = leftRangeButton.offsetLeft + Math.ceil(rightButton.clientWidth / 2);
    } else if (newX > rightButton.offsetParent.offsetWidth - rightButton.clientWidth / 2) {
      newX = rightButton.offsetParent.offsetWidth - Math.round(rightButton.clientWidth / 2);
    }
    rightButton.style.left = newX + 'px';
  };

  var moveLeftRangeButton = function (leftButton, rightButton, shift) {
    var newX = leftButton.offsetLeft - shift;
    if (newX < 0) {
      newX = 0 - Math.round(leftButton.clientWidth / 2);
    } else if (newX > rightRangeButton.offsetLeft - leftButton.clientWidth / 2) {
      newX = rightRangeButton.offsetLeft - Math.round(leftButton.clientWidth / 2);
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

      countOffsetInPercent(moveTarget);
    };

    var onRangeButtonMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var upTarget = upEvt.target;
      countOffsetInPercent(upTarget);

      upTarget.removeEventListener('mousemove', onRangeButtonMouseMove);
      upTarget.removeEventListener('mouseup', onRangeButtonMouseUp);
    };

    target.addEventListener('mousemove', onRangeButtonMouseMove);
    target.addEventListener('mouseup', onRangeButtonMouseUp);
  };

  var range = document.querySelector('.range');
  var rightRangeButton = range.querySelector('.range__btn--right');
  var leftRangeButton = range.querySelector('.range__btn--left');
  var priceMin = range.querySelector('.range__price--min');
  var priceMax = range.querySelector('.range__price--max');
  var rangeFillLine = range.querySelector('.range__fill-line');
  countOffsetInPercent(rightRangeButton);
  countOffsetInPercent(leftRangeButton);

  rightRangeButton.addEventListener('mousedown', onRangeButtonMouseDown);
  leftRangeButton.addEventListener('mousedown', onRangeButtonMouseDown);
})();
