'use strict';

var GOODS_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
  'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн',
  'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке',
  'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение',
  'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var GOODS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона',
  'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля',
  'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var GOODS_PICTURES = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg',
  'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg',
  'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg',
  'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg',
  'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var GOODS_NUMBER = 26; // размер массива объектов

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomIndexes = function (arrayLength) {
  var randomIndexes = [];
  for (var i = 0; i < arrayLength; i++) { // заполняем массив
    randomIndexes.push(i);
  }

  for (i = arrayLength - 1; i > 0; i--) { // перемешиваем элементы
    var j = getRandomInt(0, i);
    var temp = randomIndexes[j];
    randomIndexes[j] = randomIndexes[i];
    randomIndexes[i] = temp;
  }

  return randomIndexes;
};

var numDecline = function (num, nominative, genitiveSingular, genitivePlural) {
  if (num > 100 && (Math.round((num % 100) / 10)) == 1){
    return genitivePlural;
  } else {
    num = num % 10;
    if (num == 1) {
      return nominative;
    }
    if (num >= 2 && num <= 4) {
      return genitiveSingular;
    }
    if (num > 5 || num == 0) {
      return genitivePlural;
    }
  }
};

var findGoodByTitle = function (goods, title) {
  var isFound = false;
  var step = 0;
  var good = null;
  while (step < goods.length && !isFound) {
    if (goods[step].name === title) {
      isFound = true;
      good = goods[step];
      break;
    }
    step += 1;
  }

  return good;
};

var createGoodsObjects = function (goodsNumber) {
  var goodsObjects = [];

  var randomNameIndexes = createRandomIndexes(GOODS_NAMES.length);
  var randomPictureIndexes = createRandomIndexes(GOODS_PICTURES.length);
  var randomContentsIndexes = createRandomIndexes(GOODS_CONTENTS.length);

  for (var i = 0; i < goodsNumber; i++) {
    var goodItem = {
      name: '', // случайное значение из GOODS_NAMES
      picture: '', // случайное изображение из 'img/cards' + GOODS_PICTURES
      amount: 0, // количество, число от 0 до 20
      price: 0, // стоимость, от 100 до 1500
      weight: 0, // вес в граммах, от 30 до 300
      rating: {
        value: 0, // оценка: целое число от 1 до 5;
        number: 0 // количество оценок: целое число от 10 до 900
      },
      nutritionFacts: {
        sugar: false, // содержание сахара. Значение генерируется случайным образом
        energy: 0, // энергетическая ценность: целое число от 70 до 500
        contents: '' // состав: сгенерированная случайным образом строка. Генерируется из строк массива GOODS_CONTENTS
      }
    };

    goodItem.name = GOODS_NAMES[randomNameIndexes[i]];
    goodItem.amount = getRandomInt(0, 20);
    goodItem.picture = 'img/cards/' + GOODS_PICTURES[randomPictureIndexes[i]];
    goodItem.price = getRandomInt(100, 1500);
    goodItem.weight = getRandomInt(30, 300);
    goodItem.rating.value = getRandomInt(1, 5);
    goodItem.rating.number = getRandomInt(10, 900);

    var hasSugar = false;
    if (Math.round(Math.random())) {
      hasSugar = true;
    }
    goodItem.nutritionFacts.sugar = hasSugar;
    goodItem.nutritionFacts.energy = getRandomInt(70, 500);

    var contentsAmount = getRandomInt(2, 7);
    var minIndex = getRandomInt(0, GOODS_CONTENTS.length - contentsAmount);
    for (var j = minIndex; j < minIndex + contentsAmount; j++) {
      if (j === minIndex) {
        goodItem.nutritionFacts.contents = GOODS_CONTENTS[randomContentsIndexes[j]];
      } else {
        goodItem.nutritionFacts.contents += ', ';
        goodItem.nutritionFacts.contents += GOODS_CONTENTS[randomContentsIndexes[j]];
      }
    }

    goodsObjects.push(goodItem);
  }

  return goodsObjects;
};

// создание карточки товара
var createCard = function (cardTemplate, goodObject) {
  var goodElement = cardTemplate.cloneNode(true);

  var amount = goodObject.amount;
  var availabilityClass = 'card--in-stock';
  if (amount === 0) {
    availabilityClass = 'card--soon';
  } else if ((amount >= 1) && (amount <= 5)) {
    availabilityClass = 'card--little';
  }
  goodElement.classList.add(availabilityClass);

  goodElement.querySelector('.card__title').textContent = goodObject.name;
  goodElement.querySelector('.card__img').src = goodObject.picture;
  goodElement.querySelector('.card__img').alt = goodObject.name;

  var price = goodElement.querySelector('.card__price');
  price.firstChild.textContent = goodObject.price;

  goodElement.querySelector('.card__weight').textContent = '/ ' + goodObject.weight + ' Г';

  var rating = goodElement.querySelector('.stars__rating');
  rating.classList.remove('stars__rating--five');
  var ratingValue = goodObject.rating.value;
  var ratingClass = '';
  var ratingText = goodObject.rating.value;
  switch (ratingValue) {
    case 1:
      ratingClass = 'one';
      break;
    case 2:
      ratingClass = 'two';
      break;
    case 3:
      ratingClass = 'three';
      break;
    case 4:
      ratingClass = 'four';
      break;
    case 5:
      ratingClass = 'five';
      break;
    default:
      ratingClass = '';
      break;
  }
  rating.textContent = ratingValue + ' ' + numDecline(ratingValue, 'звезда', 'звёзд', 'звезды');
  rating.classList.add('stars__rating--' + ratingClass);

  goodElement.querySelector('.star__count').textContent = goodObject.rating.number;

  var sugarText = 'Без сахара. ';
  if (goodObject.nutritionFacts.sugar) {
    sugarText = 'Содержит сахар. ';
  }
  goodElement.querySelector('.card__characteristic').textContent = sugarText + goodObject.nutritionFacts.energy + ' ккал';
  goodElement.querySelector('.card__composition-list').textContent = goodObject.nutritionFacts.contents;

  return goodElement;
};

// создание карточки в корзине
var createCardInCart = function (cardInCartTemplate, goodObject) {
  var goodElement = cardInCartTemplate.cloneNode(true);

  goodElement = updateCardInCartElement(goodElement, goodObject);

  return goodElement;
};

var fillCatalogByCards = function (goodsList) {
  var fragmentOfCards = document.createDocumentFragment();
  for (var i = 0; i < goodsList.length; i++) {
    var goodElement = createCard(cardTemplate, goodsList[i]);
    fragmentOfCards.appendChild(goodElement);
  }
  catalogElements.appendChild(fragmentOfCards);
};

var addCardElementInCart = function (cardsInCart, addedGood) {
  var addedGoodCard = createCardInCart(cardInCartTemplate, addedGood);
  if (cardsInCart.classList.contains('goods__cards--empty')) {
    cardsInCart.classList.remove('goods__cards--empty');
    var cardEmpty = cardsInCart.querySelector('.goods__card-empty');
    cardEmpty.classList.add('visually-hidden');
    setBuyingFormDisabled(false);
  }
  cardsInCart.appendChild(addedGoodCard);
};

var removeCardElementFromCart = function (cardsInCart, removedCardElement) {
  cardsInCart.removeChild(removedCardElement);
  if (cardsInCart.querySelectorAll('.goods_card').length === 0) {
    var cardEmpty = cardsInCart.querySelector('.goods__card-empty');
    cardEmpty.classList.remove('visually-hidden');
    cardsInCart.classList.add('goods__cards--empty');
    setBuyingFormDisabled(true);
  }
};

var findCardInCartByTitle = function (cardsInCart, title) {
  var allElements = cardsInCart.querySelectorAll('.goods_card');
  var element = null;
  var step = 0;
  var elementTitle = '';
  while (step < allElements.length) {
    elementTitle = allElements[step].querySelector('.card-order__title').textContent;
    if (elementTitle === title) {
      element = allElements[step];
      break;
    }
    step += 1;
  }

  return element;
};

var updateCardInCartElement = function (cardInCartElement, goodObject) {
  var title = cardInCartElement.querySelector('.card-order__title');
  if (title.textContent !== goodObject.name) {
    title.textContent = goodObject.name;
  }
  var picture = cardInCartElement.querySelector('.card-order__img');
  if (picture.src !== goodObject.picture) {
    picture.src = goodObject.picture;
  }
  if (picture.alt !== goodObject.name) {
    picture.alt = goodObject.name;
  }
  var price = cardInCartElement.querySelector('.card-order__price');
  if (price.textContent !== goodObject.price + ' ₽') {
    price.textContent = goodObject.price + ' ₽';
  }
  var orderedAmount = cardInCartElement.querySelector('.card-order__count');
  if (orderedAmount.value !== goodObject.orderedAmount) {
    orderedAmount.value = goodObject.orderedAmount;
  }

  return cardInCartElement;
};

// обработчик события кнопки добавления в Избранное
var doFavoriteGood = function (cardElement) {
  cardElement.classList.toggle('card__btn-favorite--selected');
  cardElement.querySelector('.card__btn-favorite').blur();
};

var increaseAmountOfGood = function (goodElement, goodObject) {
  goodObject.orderedAmount += 1;
  updateCardInCartElement(goodElement, goodObject);
};

var decreaseAmountOfGood = function (goodElement, goodObject) {
  goodObject.orderedAmount -= 1;
  if (goodObject.orderedAmount <= 0) {
    goodsInCartList.pop(goodObject);
    removeCardElementFromCart(cartElements, goodElement);
  } else {
    updateCardInCartElement(goodElement, goodObject);
  }
};

// обработчик добавления в корзину
var addGoodInCart = function (title) {
  var goodInCatalogObject = findGoodByTitle(goodsList, title);
  var goodInCartObject = findGoodByTitle(goodsInCartList, title);
  // товара в корзине нет
  if (goodInCartObject === null) {
    var addedGood = Object.assign({}, goodInCatalogObject, {orderedAmount: 1});
    delete addedGood.amount;
    delete addedGood.weight;
    delete addedGood.nutritionFacts;
    delete addedGood.rating;
    goodsInCartList.push(addedGood);
    addCardElementInCart(cartElements, addedGood);
  } else { // товар в корзине есть
    var cardInCartElement = findCardInCartByTitle(cartElements, title);
    increaseAmountOfGood(cardInCartElement, goodInCartObject);
  }
};

var processCatalogEvent = function (eventString, target) {
  while (target !== catalogElements) {
    if (target.classList.contains('catalog__card')) {
      var title = target.querySelector('.card__title').textContent;

      if (eventString === 'favorite') {
        doFavoriteGood(target);
        break;
      } else if (eventString === 'add_in_cart') {
        addGoodInCart(title);
        break;
      }
    }
    target = target.parentNode;
  }
};

var onCatalogCardsClick = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.classList.contains('card__btn-favorite')) {
    // обработка события добавления/удаления из Избранного
    processCatalogEvent('favorite', target);
  } else if (target.classList.contains('card__btn')) {
    // добавление товара в корзину
    processCatalogEvent('add_in_cart', target);
  }
};

var processCartEvent = function (eventName, target) {
  while (target !== cartElements) {
    if (target.classList.contains('goods_card')) {
      var title = target.querySelector('.card-order__title').textContent;
      var goodInCartObject = findGoodByTitle(goodsInCartList, title);

      if (eventName === 'increase') {
        increaseAmountOfGood(target, goodInCartObject);
        break;
      } else if (eventName === 'decrease') {
        decreaseAmountOfGood(target, goodInCartObject);
        break;
      } else if (eventName === 'remove') {
        goodsInCartList.pop(goodInCartObject);
        removeCardElementFromCart(cartElements, target);
        break;
      }
    }
    target = target.parentNode;
  }
};

var onCartCardsClick = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.classList.contains('card-order__btn--increase')) {
    processCartEvent('increase', target);
  } else if (target.classList.contains('card-order__btn--decrease')) {
    processCartEvent('decrease', target);
  } else if (target.classList.contains('card-order__close')) {
    processCartEvent('remove', target);
  }
};

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
    setCourierFormDisabled(true);

    deliverStoreForm.classList.remove(hiddenClass);
    setStoreFormDisabled(false);
  } else if (target.id === 'deliver__courier') {
    deliverStoreForm.classList.add(hiddenClass);
    setStoreFormDisabled(true);

    deliverCourierForm.classList.remove(hiddenClass);
    setCourierFormDisabled(false);
  }
};

var setContactDataFormDisabled = function (disabled) {
  order.querySelector('#contact-data__name').disabled = disabled;
  order.querySelector('#contact-data__tel').disabled = disabled;
  order.querySelector('#contact-data__email').disabled = disabled;
};

var setPaymentCardFormDisabled = function (disabled) {
  paymentCard.querySelector('#payment__card-number').disabled = disabled;
  paymentCard.querySelector('#payment__card-date').disabled = disabled;
  paymentCard.querySelector('#payment__card-cvc').disabled = disabled;
  paymentCard.querySelector('#payment__cardholder').disabled = disabled;
};

var onPaymentSectionClick = function (evt) {
  var target = evt.target;
  var hiddenClass = 'visually-hidden';

  if (target.id === 'payment__card') {
    paymentCard.classList.remove(hiddenClass);
    setPaymentCardFormDisabled(false);

    paymentCash.classList.add(hiddenClass);
  } else if (target.id === 'payment__cash') {
    paymentCard.classList.add(hiddenClass);
    setPaymentCardFormDisabled(true);

    paymentCash.classList.remove(hiddenClass);
  }
};

var isFormHidden = function (formElement) {
  var isHidden = false;
  if (formElement.classList.contains('visually-hidden')) {
    isHidden = true;
  }
  return isHidden;
};

var setBuyingFormDisabled = function (disabled) {
  setContactDataFormDisabled(disabled);
  // форма активна когда disabled и hidden === false
  // форма неактивна когда хотя бы один из флагов === true
  setPaymentCardFormDisabled(disabled || isFormHidden(paymentCard));
  setCourierFormDisabled(disabled || isFormHidden(deliverCourierForm));
  setStoreFormDisabled(disabled || isFormHidden(deliverStoreForm));
  submitButton.disabled = disabled;
};

var catalogElements = document.querySelector('.catalog__cards');
catalogElements.classList.remove('catalog__cards--load');
var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var cartElements = document.querySelector('.goods__cards');
var cardInCartTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

var catalogLoad = catalogElements.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var goodsList = createGoodsObjects(GOODS_NUMBER);
var goodsInCartList = [];

fillCatalogByCards(goodsList);
catalogElements.addEventListener('click', onCatalogCardsClick);
cartElements.addEventListener('click', onCartCardsClick);

var order = document.querySelector('.order');

var payment = order.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');
payment.addEventListener('click', onPaymentSectionClick);

var deliver = order.querySelector('.deliver');
var deliverStoreForm = deliver.querySelector('.deliver__store');
var deliverCourierForm = deliver.querySelector('.deliver__courier');
deliver.addEventListener('click', onDeliverSectionClick);

var submitButton = document.querySelector('.buy__submit-btn');

if (cartElements.classList.contains('goods__cards--empty')) {
  setBuyingFormDisabled(true);
}

var countOffsetInPercent = function (element) {
  var maxWidth = element.offsetParent.offsetWidth;
  var offset = element.offsetLeft + (element.clientWidth / 2);
  var offsetInPercent = Math.round((offset / maxWidth) * 100);

  if (element === leftRangeButton) {
    priceMin.textContent = offsetInPercent;
  } else if (element === rightRangeButton) {
    priceMax.textContent = offsetInPercent;
  }
};

var moveRightRangeButton = function (rightButton, leftButton, shift) {
  var newX = rightButton.offsetLeft - shift;
  if (newX < leftRangeButton.offsetLeft + rightButton.clientWidth / 2) {
    newX = leftRangeButton.offsetLeft + Math.ceil(rightButton.clientWidth / 2);
  } else if (newX > rightButton.offsetParent.offsetWidth - rightButton.clientWidth / 2) {
    newX = rightButton.offsetParent.offsetWidth - Math.round(rightButton.clientWidth / 2);
  }
  rightButton.style.left = newX + 'px';
};

var moveLeftRangeButton = function (leftButton, rightButton, shift) {
  var newX = leftButton.offsetLeft - shift;
  if (newX < 0) {
    newX = 0 - Math.round(leftButton.clientWidth / 2);
  } else if (newX > rightRangeButton.offsetLeft - leftButton.clientWidth / 2) {
    newX = rightRangeButton.offsetLeft - Math.round(leftButton.clientWidth / 2);
  }
  leftButton.style.left = newX + 'px';
};

var onRangeButtonMouseDown = function (evt) {
  evt.preventDefault();
  var target = evt.target;

  var startX = evt.clientX;

  var onRangeButtonMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var moveTarget = moveEvt.target;

    var shiftX = startX - moveEvt.clientX;
    startX = moveEvt.clientX;

    if (moveTarget === leftRangeButton) {
      moveLeftRangeButton(moveTarget, rightRangeButton, shiftX);
    } else if (moveTarget === rightRangeButton) {
      moveRightRangeButton(moveTarget, leftRangeButton, shiftX);
    }

    countOffsetInPercent(moveTarget);
  };

  var onRangeButtonMouseUp = function (upEvt) {
    upEvt.preventDefault();

    var upTarget = upEvt.target;
    countOffsetInPercent(upTarget);
    rangeFillLine.style.left = leftRangeButton.offsetLeft + 'px';
    rangeFillLine.style.right = (rightRangeButton.offsetParent.offsetWidth - rightRangeButton.offsetLeft) + 'px';

    upTarget.removeEventListener('mousemove', onRangeButtonMouseMove);
    upTarget.removeEventListener('mouseup', onRangeButtonMouseUp);
  };

  target.addEventListener('mousemove', onRangeButtonMouseMove);
  target.addEventListener('mouseup', onRangeButtonMouseUp);
};

var range = document.querySelector('.range');
var rightRangeButton = range.querySelector('.range__btn--right');
var leftRangeButton = range.querySelector('.range__btn--left');
var priceMin = range.querySelector('.range__price--min');
var priceMax = range.querySelector('.range__price--max');
var rangeFillLine = range.querySelector('.range__fill-line');
countOffsetInPercent(rightRangeButton);
countOffsetInPercent(leftRangeButton);

rightRangeButton.addEventListener('mousedown', onRangeButtonMouseDown);
leftRangeButton.addEventListener('mousedown', onRangeButtonMouseDown);
