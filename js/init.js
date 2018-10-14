'use strict';

(function () {
  var onLoadSuccessHandle = function (goods) {
    window.data.goods = goods;
    goods.forEach(function (goodObject) {
      goodObject.favorite = false; // добавляем новое поле для фильтрации по Извранным
    });
    window.catalog.render(window.data.goods);
    window.range.clearFilter();
    window.filters.initItemCountLabels(window.data.goods);

    window.catalog.hideLoadMessage();
    window.order.activate(false);
  };

  var onLoadErrorHandle = function (errorMessage) {
    window.modal.showError(errorMessage);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);
})();
