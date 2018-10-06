'use strict';

(function () {
  var orderForm = document.querySelector('.buy').querySelector('form');
  var order = orderForm.querySelector('.order');
  var deliver = order.querySelector('.deliver');
  var deliverStoreForm = deliver.querySelector('.deliver__store');
  var deliverCourierForm = deliver.querySelector('.deliver__courier');
  var submitButton = orderForm.querySelector('.buy__submit-btn');

  // disabled = true / false
  var setCourierFormDisabled = function (disabled) {
    deliverCourierForm.querySelector('#deliver__street').disabled = disabled;
    deliverCourierForm.querySelector('#deliver__house').disabled = disabled;
    deliverCourierForm.querySelector('#deliver__floor').disabled = disabled;
    deliverCourierForm.querySelector('#deliver__room').disabled = disabled;
    deliverCourierForm.querySelector('.deliver__textarea').disabled = disabled;
  };

  var setStoreFormDisabled = function (disabled) {
    var storeInputs = deliverStoreForm.querySelectorAll('[name="store"]');
    for (var i = 0; i < storeInputs.length; i++) {
      storeInputs[i].disabled = disabled;
    }
  };

  var onDeliverSectionClick = function (evt) {
    var target = evt.target;
    var hiddenClass = 'visually-hidden';

    if (target.id === 'deliver__store') {
      deliverCourierForm.classList.add(hiddenClass);
      setCourierFormDisabled(true); // дизейблим скрываемую форму

      deliverStoreForm.classList.remove(hiddenClass);
      setStoreFormDisabled(window.cart.isEmpty()); // если корзина пустая, то форма остается неактивной
    } else if (target.id === 'deliver__courier') {
      deliverStoreForm.classList.add(hiddenClass);
      setStoreFormDisabled(true); // дизейблим скрываемую форму

      deliverCourierForm.classList.remove(hiddenClass);
      setCourierFormDisabled(window.cart.isEmpty()); // если корзина пустая, то форма остается неактивной
    }
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
    window.payment.setCardFormDisabled(disabled || window.util.isFormHidden(window.payment.cardForm));
    setCourierFormDisabled(disabled || window.util.isFormHidden(deliverCourierForm));
    setStoreFormDisabled(disabled || window.util.isFormHidden(deliverStoreForm));
    submitButton.disabled = disabled;
  };

  var onUploadSuccessHandler = function () {
    window.modal.showSuccess();
  };

  var onUploadErrorHandler = function (errorMessage) {
    window.modal.showError(errorMessage);
  };

  deliver.addEventListener('click', onDeliverSectionClick);

  orderForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(orderForm), onUploadSuccessHandler, onUploadErrorHandler);
    evt.preventDefault();
  });

  window.order = {
    setBuyingFormDisabled: setBuyingFormDisabled
  };
})();
