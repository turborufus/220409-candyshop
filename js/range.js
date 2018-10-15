'use strict';

(function () {
  var range = document.querySelector('.range');
  var rangeFilterBar = range.querySelector('.range__filter');
  var rangeButtonRight = range.querySelector('.range__btn--right');
  var rangeButtonLeft = range.querySelector('.range__btn--left');
  var priceMin = range.querySelector('.range__price--min');
  var priceMax = range.querySelector('.range__price--max');
  var rangeFillLine = range.querySelector('.range__fill-line');

  var rangeButtonWidth = rangeButtonRight.offsetWidth;
  var rangeFilterBarWidth = rangeFilterBar.offsetWidth - rangeButtonWidth;
  var leftEdge = rangeFilterBar.getBoundingClientRect().left;
  var rightEdge = rangeFilterBar.getBoundingClientRect().right - rangeButtonWidth;
  var positionBtnLeft = 0;
  var positionBtnRight = rightEdge - leftEdge;

  var clearRangeFilter = function () {
    positionBtnLeft = 0;
    positionBtnRight = rightEdge - leftEdge;

    rangeButtonRight.style.left = positionBtnRight + 'px';
    rangeButtonLeft.style.left = positionBtnLeft + 'px';

    priceMin.textContent = calcPriceValue(rangeButtonLeft);
    priceMax.textContent = calcPriceValue(rangeButtonRight);

    renderFillLine();

    rangeButtonRight.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      onRangeButtonMouseDown(evt, rangeButtonRight, positionBtnLeft, rangeFilterBarWidth, priceMax, false);
    });
    rangeButtonLeft.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      onRangeButtonMouseDown(evt, rangeButtonLeft, 0, positionBtnRight, priceMin, true);
    });
  };

  var renderFillLine = function () {
    rangeFillLine.style.left = (rangeButtonLeft.offsetLeft + rangeButtonWidth) + 'px';
    rangeFillLine.style.right = (rangeFilterBarWidth - rangeButtonRight.offsetLeft) + 'px';
  };

  var calcPriceValue = function (positionBtn) {
    var maxWidth = rangeFilterBarWidth;
    var offset = positionBtn.offsetLeft;
    return Math.round((offset / maxWidth) * 100);
  };

  var onRangeButtonMouseDown = function (evt, rangeButton, minLeft, maxRight, priceLabel, isLeftBtn) {
    var shiftX = evt.clientX - rangeButton.getBoundingClientRect().left;

    var onMouseMove = function (evtMove) {
      var newX = evtMove.clientX - shiftX - leftEdge;

      if (newX < minLeft) {
        newX = minLeft;
      } else if (newX > maxRight) {
        newX = maxRight;
      }

      rangeButton.style.left = newX + 'px';
      priceLabel.textContent = calcPriceValue(rangeButton);

      if (isLeftBtn) {
        positionBtnLeft = newX;
      } else {
        positionBtnRight = newX;
      }

      renderFillLine();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.util.debounce(window.filters.update(window.data.goods));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.range = {
    clearFilter: clearRangeFilter
  };

})();
