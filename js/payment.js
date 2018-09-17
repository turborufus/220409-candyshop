'use strict';

var isCardNumberValid = function (cardNumber) {
  var isNumberValid = false;
  var cardNumberDigits = cardNumber.split('');
  var sum = 0;
  var arrLength = cardNumberDigits.length;
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
  if (sum % 10 === 0) {
    isNumberValid = true;
  }

  return isNumberValid;
};

var paymentCard = document.querySelector('.payment__card-wrap');
var cardStatus = paymentCard.querySelector('.payment__card-status');

var onValueChange = function () {
  var isCardValid = cardNumberInput.validity.valid && cardDateInput.validity.valid && cardCvcInput.validity.valid && cardholderInput.validity.valid && isCardNumberValid(cardNumberInput.value);

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

cardNumberInput.addEventListener('invalid', function () {
  if (cardNumberInput.validity.tooShort || cardNumberInput.validity.tooLong) {
    cardNumberInput.setCustomValidity('Номер карты должен состоять из 16 цифр');
  } else if (cardNumberInput.validity.valueMissing) {
    cardNumberInput.setCustomValidity('Поле обязательно к заполнению');
  } else if (cardNumberInput.validity.patternMismatch) {
    cardNumberInput.setCustomValidity('Номер карты состоит только из цифр');
  } else {
    cardNumberInput.setCustomValidity('');
  }
});

cardDateInput.addEventListener('invalid', function () {
  if (cardDateInput.validity.tooShort || cardDateInput.validity.tooLong || cardDateInput.validity.patternMismatch) {
    cardDateInput.setCustomValidity('Срок действия карты должен быть указан в формате ММ/ГГ');
  } else if (cardDateInput.validity.valueMissing) {
    cardDateInput.setCustomValidity('Поле обязательно к заполнению');
  } else {
    cardDateInput.setCustomValidity('');
  }
});

cardCvcInput.addEventListener('invalid', function () {
  if (cardCvcInput.validity.tooShort || cardCvcInput.validity.tooLong || cardCvcInput.validity.patternMismatch) {
    cardCvcInput.setCustomValidity('Поле должно содержать 3 цифры');
  } else if (cardCvcInput.validity.valueMissing) {
    cardCvcInput.setCustomValidity('Поле обязательно к заполнению');
  } else {
    cardCvcInput.setCustomValidity('');
  }
});

cardholderInput.addEventListener('invalid', function () {
  if (cardholderInput.validity.patternMismatch) {
    cardholderInput.setCustomValidity('Поле должно содержать только латинские буквы');
  } else if (cardholderInput.validity.valueMissing) {
    cardholderInput.setCustomValidity('Поле обязательно к заполнению');
  } else {
    cardholderInput.setCustomValidity('');
  }
});

cardNumberInput.addEventListener('change', function () {
  if (!isCardNumberValid(cardNumberInput.value)) {
    cardNumberInput.setCustomValidity('Проверьте правильность указанного номера');
  } else {
    cardNumberInput.setCustomValidity('');
  }
  onValueChange();
});

cardDateInput.addEventListener('change', function () {
  onValueChange();
});

cardCvcInput.addEventListener('change', function () {
  onValueChange();
});

cardholderInput.addEventListener('change', function () {
  onValueChange();
});