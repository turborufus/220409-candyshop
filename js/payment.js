'use strict';

(function () {
  var payment = document.querySelector('.payment');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var paymentCash = payment.querySelector('.payment__cash-wrap');
  var cardStatus = paymentCard.querySelector('.payment__card-status');

  var isCardNumberValid = function (cardNumber) {
    var cardNumberDigits = cardNumber.replace(/\D+/g, '');
    var sum = 0;
    var arrLength = cardNumberDigits.length;
    if (arrLength === 16) {
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

  var onValueChange = function () {
    var isNumberValid = isCardNumberValid(cardNumberInput.value);
    var isCardValid = cardNumberInput.validity.valid && cardDateInput.validity.valid && cardCvcInput.validity.valid && cardholderInput.validity.valid && isNumberValid;

    var statusText = 'Неизвестен';
    if (isCardValid) {
      statusText = 'Одобрен';
    }
    cardStatus.textContent = statusText;
  };

  var cardNumberInput = paymentCard.querySelector('#payment__card-number');
  var cardDateInput = paymentCard.querySelector('#payment__card-date');
  var cardCvcInput = paymentCard.querySelector('#payment__card-cvc');
  var cardholderInput = paymentCard.querySelector('#payment__cardholder');

  cardNumberInput.addEventListener('change', function () {
    if (cardNumberInput.validity.tooShort || cardNumberInput.validity.tooLong) {
      cardNumberInput.setCustomValidity('Номер карты должен состоять из 16 цифр');
    } else if (cardNumberInput.validity.valueMissing) {
      cardNumberInput.setCustomValidity('Поле обязательно к заполнению');
    } else if (cardNumberInput.validity.patternMismatch) {
      cardNumberInput.setCustomValidity('Номер карты состоит из 16 цифр');
    } else if (!isCardNumberValid(cardNumberInput.value)) {
      cardNumberInput.setCustomValidity('Проверьте правильность указанного номера');
    } else {
      cardNumberInput.setCustomValidity('');
    }
    onValueChange();
  });

  cardDateInput.addEventListener('change', function () {
    if (cardDateInput.validity.tooShort || cardDateInput.validity.tooLong || cardDateInput.validity.patternMismatch) {
      cardDateInput.setCustomValidity('Срок действия карты должен быть указан в формате ММ/ГГ');
    } else if (cardDateInput.validity.valueMissing) {
      cardDateInput.setCustomValidity('Поле обязательно к заполнению');
    } else {
      cardDateInput.setCustomValidity('');
    }
    onValueChange();
  });

  cardCvcInput.addEventListener('change', function () {
    if (cardCvcInput.validity.tooShort || cardCvcInput.validity.tooLong || cardCvcInput.validity.patternMismatch) {
      cardCvcInput.setCustomValidity('Поле должно содержать 3 цифры');
    } else if (cardCvcInput.validity.valueMissing) {
      cardCvcInput.setCustomValidity('Поле обязательно к заполнению');
    } else {
      cardCvcInput.setCustomValidity('');
    }
    onValueChange();
  });

  cardholderInput.addEventListener('change', function () {
    if (cardholderInput.validity.patternMismatch) {
      cardholderInput.setCustomValidity('Поле должно содержать только латинские буквы');
    } else if (cardholderInput.validity.valueMissing) {
      cardholderInput.setCustomValidity('Поле обязательно к заполнению');
    } else {
      cardholderInput.setCustomValidity('');
    }
    onValueChange();
  });

  var setPaymentCardFormDisabled = function (disabled) {
    paymentCard.querySelector('#payment__card-number').disabled = disabled;
    paymentCard.querySelector('#payment__card-date').disabled = disabled;
    paymentCard.querySelector('#payment__card-cvc').disabled = disabled;
    paymentCard.querySelector('#payment__cardholder').disabled = disabled;
    
    console.log('setPaymentCardFormDisabled ' + disabled);
  };

  var onPaymentSectionClick = function (evt) {
    var target = evt.target;

    var hiddenClass = 'visually-hidden';

    if (target.id === 'payment__card') {
      paymentCard.classList.remove(hiddenClass);
      setPaymentCardFormDisabled(window.cart.isEmpty()); // если корзина пустая, то форма оставется неактивной

      paymentCash.classList.add(hiddenClass);
    } else if (target.id === 'payment__cash') {
      paymentCard.classList.add(hiddenClass);
      setPaymentCardFormDisabled(true);

      paymentCash.classList.remove(hiddenClass);
    }
  };

  payment.addEventListener('click', onPaymentSectionClick);

  window.payment = {
    cardForm: paymentCard,
    cashForm: paymentCash,
    setCardFormDisabled: setPaymentCardFormDisabled
  };

})();
