'use strict';

(function () {
  var MAP_IMG_PATH = 'img/map/';

  var orderIsActive = false;

  var orderForm = document.querySelector('.buy').querySelector('form');
  var order = orderForm.querySelector('.order');
  var deliver = order.querySelector('.deliver');
  var storeForm = deliver.querySelector('.deliver__store');
  var courierForm = deliver.querySelector('.deliver__courier');
  var submitButton = orderForm.querySelector('.buy__submit-btn');
  var storeItems = storeForm.querySelectorAll('input[name="store"]');
  var storeMapImage = deliver.querySelector('.deliver__store-map-img');

  var isFormHidden = function (form) {
    return (form.classList.contains(window.util.HIDDEN_CLASSNAME));
  };

  var setCourierFormDisabled = function (disabled) {
    courierForm.querySelector('#deliver__street').disabled = disabled;
    courierForm.querySelector('#deliver__house').disabled = disabled;
    courierForm.querySelector('#deliver__floor').disabled = disabled;
    courierForm.querySelector('#deliver__room').disabled = disabled;
    courierForm.querySelector('.deliver__textarea').disabled = disabled;
  };

  var setStoreFormDisabled = function (disabled) {
    storeItems.forEach(function (inputItem) {
      inputItem.disabled = disabled;
    });
  };

  var setContactDataFormDisabled = function (disabled) {
    order.querySelector('#contact-data__name').disabled = disabled;
    order.querySelector('#contact-data__tel').disabled = disabled;
    order.querySelector('#contact-data__email').disabled = disabled;
  };

  var setBuyingFormDisabled = function (disabled) {
    setContactDataFormDisabled(disabled);
    // форма активна когда disabled и hidden === false
    // форма неактивна когда хотя бы один из флагов === true
    window.payment.setCardFormDisabled(disabled || isFormHidden(window.payment.cardForm));
    setCourierFormDisabled(disabled || isFormHidden(courierForm));
    setStoreFormDisabled(disabled || isFormHidden(storeForm));
    submitButton.disabled = disabled;
  };

  var showStoreForm = function () {
    courierForm.classList.add(window.util.HIDDEN_CLASSNAME);
    storeForm.classList.remove(window.util.HIDDEN_CLASSNAME);

    setCourierFormDisabled(true); // дизейблим скрываемую форму
    setStoreFormDisabled(!orderIsActive);
  };

  var showCourierForm = function () {
    storeForm.classList.add(window.util.HIDDEN_CLASSNAME);
    courierForm.classList.remove(window.util.HIDDEN_CLASSNAME);
    setStoreFormDisabled(true); // дизейблим скрываемую форму
    setCourierFormDisabled(!orderIsActive);
  };

  var onDeliverSectionClick = function (evt) {
    var target = evt.target;

    if (target.id === 'deliver__store') {
      showStoreForm();
    }
    if (target.id === 'deliver__courier') {
      showCourierForm();
    }
  };

  var onStoreItemChange = function (evt) {
    var target = evt.target;
    var itemValue = target.value;
    storeMapImage.src = MAP_IMG_PATH + itemValue + '.jpg';
    storeMapImage.alt = target.labels[0].textContent;
  };

  var acivateOrder = function (isActive) {
    orderIsActive = isActive;
    setBuyingFormDisabled(!isActive);
  };

  var onUploadSuccess = function () {
    window.modal.showSuccess();
  };

  var onUploadError = function (errorMessage) {
    window.modal.showError(errorMessage);
  };

  deliver.addEventListener('click', onDeliverSectionClick);

  storeItems.forEach(function (store) {
    store.addEventListener('change', onStoreItemChange);
  });

  orderForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(orderForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  });

  window.order = {
    activate: acivateOrder
  };
})();
