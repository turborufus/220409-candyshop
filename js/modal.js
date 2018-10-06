'use strict';

(function () {
  var modalError = document.querySelector('.modal--error');
  var modalSuccess = document.querySelector('.modal--success');

  var showModal = function (modal) {
    var modalClose = modal.querySelector('.modal__close');
    modalClose.addEventListener('click', onModalCloseClick);
    modal.classList.remove('modal--hidden');
  };

  var showModalError = function (errorMessage) {
    modalError.querySelector('.modal__message').textContent = errorMessage;
    showModal(modalError);
  };

  var showModalSuccess = function () {
    showModal(modalSuccess);
  };

  var onModalCloseClick = function (evt) {
    var target = evt.target;
    var targetParent = target.parentNode;
    while (!targetParent.classList.contains('modal')) {
      targetParent = targetParent.parentNode;
    }
    targetParent.classList.add('modal--hidden');
    target.removeEventListener('click', onModalCloseClick);
  };

  window.modal = {
    showError: showModalError,
    showSuccess: showModalSuccess
  };
})();
