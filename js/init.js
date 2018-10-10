'use strict';

(function () {
  var onLoadSuccessHandle = function (goods) {
    window.data.goods = goods;
    goods.forEach(function (goodObject) {
      goodObject.favorite = false; // добавляем новое поле для фильтрации по Извранным
    });
    window.catalog.render(window.data.goods);
    window.range.init();
    window.filters.updateItemCountLabels(window.data.goods);

    window.catalog.hideLoadMessage();
  };

  var onLoadErrorHandle = function (errorMessage) {
    window.modal.showError(errorMessage);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);
})();
