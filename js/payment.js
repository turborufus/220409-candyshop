'use strict';

(function () {
  var CARD_NUMBER_LENGTH = 16;

  var payment = document.querySelector('.payment');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var paymentCash = payment.querySelector('.payment__cash-wrap');
  var cardStatus = paymentCard.querySelector('.payment__card-status');
  var cardNumber = paymentCard.querySelector('#payment__card-number');
  var cardDate = paymentCard.querySelector('#payment__card-date');
  var cardCVC = paymentCard.querySelector('#payment__card-cvc');
  var cardHolder = paymentCard.querySelector('#payment__cardholder');

  var isCardNumberValid = function (cardNumberValue) {
    var cardNumberDigits = cardNumberValue.replace(/\D+/g, '');
    var sum = 0;
    var arrLength = cardNumberDigits.length;
    if (arrLength === CARD_NUMBER_LENGTH) {
      for (var i = 0; i < arrLength; i++) {
        var digit = parseInt(cardNumberDigits[arrLength - i - 1], 10);
        if (i % 2 === 1) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
      }
      return (sum % 10 === 0);
    }
    return false;
  };

  var changeCardStatus = function () {
    var isNumberValid = isCardNumberValid(cardNumber.value);
    var isCardValid = cardNumber.validity.valid && cardDate.validity.valid && cardCVC.validity.valid && cardHolder.validity.valid && isNumberValid;

    var statusText = 'Неизвестен';
    if (isCardValid) {
      statusText = 'Одобрен';
    }
    cardStatus.textContent = statusText;
  };

  var onCardNumberChange = function () {
    if (cardNumber.validity.tooShort || cardNumber.validity.tooLong) {
      cardNumber.setCustomValidity('Номер карты должен состоять из 16 цифр');
    } else if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity('Поле обязательно к заполнению');
    } else if (cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity('Номер карты состоит из 16 цифр');
    } else if (!isCardNumberValid(cardNumber.value)) {
      cardNumber.setCustomValidity('Проверьте правильность указанного номера');
    } else {
      cardNumber.setCustomValidity('');
    }
    changeCardStatus();
  };

  var onCardDateChange = function () {
    if (cardDate.validity.tooShort || cardDate.validity.tooLong || cardDate.validity.patternMismatch) {
      cardDate.setCustomValidity('Срок действия карты должен быть указан в формате ММ/ГГ');
    } else if (cardDate.validity.valueMissing) {
      cardDate.setCustomValidity('Поле обязательно к заполнению');
    } else {
      cardDate.setCustomValidity('');
    }
    changeCardStatus();
  };

  var onCardCVCChange = function () {
    if (cardCVC.validity.tooShort || cardCVC.validity.tooLong || cardCVC.validity.patternMismatch) {
      cardCVC.setCustomValidity('Поле должно содержать 3 цифры');
    } else if (cardCVC.validity.valueMissing) {
      cardCVC.setCustomValidity('Поле обязательно к заполнению');
    } else {
      cardCVC.setCustomValidity('');
    }
    changeCardStatus();
  };

  var onCardHolderChange = function () {
    if (cardHolder.validity.patternMismatch) {
      cardHolder.setCustomValidity('Поле должно содержать только латинские буквы');
    } else if (cardHolder.validity.valueMissing) {
      cardHolder.setCustomValidity('Поле обязательно к заполнению');
    } else {
      cardHolder.setCustomValidity('');
    }
    changeCardStatus();
  };

  var setPaymentCardFormDisabled = function (disabled) {
    paymentCard.querySelector('#payment__card-number').disabled = disabled;
    paymentCard.querySelector('#payment__card-date').disabled = disabled;
    paymentCard.querySelector('#payment__card-cvc').disabled = disabled;
    paymentCard.querySelector('#payment__cardholder').disabled = disabled;
  };

  var onPaymentSectionClick = function (evt) {
    var target = evt.target;

    if (target.id === 'payment__card') {
      paymentCard.classList.remove(window.util.HIDDEN_CLASSNAME);
      setPaymentCardFormDisabled(window.cart.isEmpty()); // если корзина пустая, то форма оставется неактивной

      paymentCash.classList.add(window.util.HIDDEN_CLASSNAME);
    }
    if (target.id === 'payment__cash') {
      paymentCard.classList.add(window.util.HIDDEN_CLASSNAME);
      setPaymentCardFormDisabled(true);

      paymentCash.classList.remove(window.util.HIDDEN_CLASSNAME);
    }
  };

  cardNumber.addEventListener('change', onCardNumberChange);
  cardDate.addEventListener('change', onCardDateChange);
  cardCVC.addEventListener('change', onCardCVCChange);
  cardHolder.addEventListener('change', onCardHolderChange);
  payment.addEventListener('click', onPaymentSectionClick);

  window.payment = {
    cardForm: paymentCard,
    cashForm: paymentCash,
    setCardFormDisabled: setPaymentCardFormDisabled
  };

})();
