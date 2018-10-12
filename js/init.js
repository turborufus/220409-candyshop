'use strict';

(function () {
  var onLoadSuccessHandle = function (goods) {
    window.data.goods = goods;
    goods.forEach(function (goodObject) {
      goodObject.favorite = false; // добавляем новое поле для фильтрации по Извранным
    });
    window.catalog.render(window.data.goods);
    window.range.init();
    window.filters.initItemCountLabels(window.data.goods);

    window.catalog.hideLoadMessage();

    if (window.cart.isEmpty()) {
      window.order.setBuyingFormDisabled(true);
    }
  };

  var onLoadErrorHandle = function (errorMessage) {
    window.modal.showError(errorMessage);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);
})();
