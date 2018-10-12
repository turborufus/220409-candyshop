'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MODAL_HIDDEN_CLASS = 'modal--hidden';
  var modalError = document.querySelector('.modal--error');
  var modalSuccess = document.querySelector('.modal--success');

  var getOpenedModal = function () {
    if (!modalError.classList.contains(MODAL_HIDDEN_CLASS)) {
      return modalError;
    } else if (!modalSuccess.classList.contains(MODAL_HIDDEN_CLASS)) {
      return modalSuccess;
    }
    return null;
  };

  var showModal = function (modal) {
    var modalClose = modal.querySelector('.modal__close');
    modal.classList.remove(MODAL_HIDDEN_CLASS);
    modalClose.addEventListener('click', onModalCloseClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  var closeModal = function (modal) {
    var modalClose = modal.querySelector('.modal__close');
    modal.classList.add(MODAL_HIDDEN_CLASS);
    document.removeEventListener('keydown', onModalEscPress);
    modalClose.removeEventListener('click', onModalCloseClick);
  };

  var showModalError = function (errorMessage) {
    modalError.querySelector('.modal__message').textContent = errorMessage;
    showModal(modalError);
  };

  var showModalSuccess = function () {
    showModal(modalSuccess);
  };

  var onModalEscPress = function (evt) {
    var openedModal = getOpenedModal();
    if (evt.keyCode === ESC_KEYCODE && openedModal !== null) {
      closeModal(openedModal);
    }
  };

  var onModalCloseClick = function (evt) {
    var target = evt.target;
    var targetParent = target.parentNode;
    while (!targetParent.classList.contains('modal')) {
      targetParent = targetParent.parentNode;
    }
    closeModal(targetParent);
  };

  window.modal = {
    showError: showModalError,
    showSuccess: showModalSuccess
  };
})();
