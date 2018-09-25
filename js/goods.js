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

var createGoodsList = function (goodsNumber) {
  var goodsList = [];

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

    goodsList.push(goodItem);
  }

  return goodsList;
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

  var title = goodElement.querySelector('.card__title');
  title.textContent = goodObject.name;

  var picture = goodElement.querySelector('.card__img');
  picture.src = goodObject.picture;
  picture.alt = goodObject.name;

  var price = goodElement.querySelector('.card__price');
  price.firstChild.textContent = goodObject.price;

  var weight = goodElement.querySelector('.card__weight');
  weight.textContent = '/ ' + goodObject.weight + ' Г';

  var rating = goodElement.querySelector('.stars__rating');
  var ratingClass = '';
  var ratingText = goodObject.rating.value;
  switch (goodObject.rating.value) {
    case 1:
      ratingClass = 'stars__rating--one';
      ratingText += ' звезда';
      break;
    case 2:
      ratingClass = 'stars__rating--two';
      ratingText += ' звезды';
      break;
    case 3:
      ratingClass = 'stars__rating--three';
      ratingText += ' звезды';
      break;
    case 4:
      ratingClass = 'stars__rating--four';
      ratingText += ' звезды';
      break;
    case 5:
      ratingClass = 'stars__rating--five';
      ratingText += ' звёзд';
      break;
    default:
      ratingClass = '';
      break;
  }
  rating.textContent = ratingText;
  rating.classList.add(ratingClass);

  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = goodObject.rating.number;

  var sugarText = 'Без сахара. ';
  if (goodObject.nutritionFacts.sugar) {
    sugarText = 'Содержит сахар. ';
  }
  var characteristic = goodElement.querySelector('.card__characteristic');
  characteristic.textContent = sugarText + goodObject.nutritionFacts.energy + ' ккал';

  var compositionList = goodElement.querySelector('.card__composition-list');
  compositionList.textContent = goodObject.nutritionFacts.contents;

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
  catalogCards.appendChild(fragmentOfCards);
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
  if (goodObject.orderedAmount < 0) {
    goodObject.orderedAmount = 0;
  }
  updateCardInCartElement(goodElement, goodObject);
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
    addCardElementInCart(cardsInCart, addedGood);
  } else { // товар в корзине есть
    var cardInCartElement = findCardInCartByTitle(cardsInCart, title);
    increaseAmountOfGood(cardInCartElement, goodInCartObject);
  }
};

var processCatalogEvent = function (eventString, target) {
  while (target !== catalogCards) {
    if (target.classList.contains('catalog__card')) {
      var title = target.querySelector('.card__title').textContent;

      if (eventString === 'favorite') {
        doFavoriteGood(target);
      } else if (eventString === 'add_in_cart') {
        addGoodInCart(title);
      }
    }
    target = target.parentNode;
  }
};

var onCatalogCardsClick = function (evt) {
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
  while (target !== cardsInCart) {
    if (target.classList.contains('goods_card')) {
      var title = target.querySelector('.card-order__title').textContent;
      var goodInCartObject = findGoodByTitle(goodsInCartList, title);

      if (eventName === 'increase') {
        increaseAmountOfGood(target, goodInCartObject);
      } else if (eventName === 'decrease') {
        decreaseAmountOfGood(target, goodInCartObject);
      } else if (eventName === 'remove') {
        goodsInCartList.pop(goodInCartObject);
        removeCardElementFromCart(cardsInCart, target);
      }
    }
    target = target.parentNode;
  }
};

var onCartCardsClick = function (evt) {
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

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var cardsInCart = document.querySelector('.goods__cards');
var cardInCartTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var goodsList = createGoodsList(GOODS_NUMBER);
var goodsInCartList = [];

fillCatalogByCards(goodsList);
catalogCards.addEventListener('click', onCatalogCardsClick);
cardsInCart.addEventListener('click', onCartCardsClick);

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

if (cardsInCart.classList.contains('goods__cards--empty')) {
  setBuyingFormDisabled(true);
}

var onRangeButtonMouseUp = function (evt) {
  var target = evt.target;
  var maxWidth = target.offsetParent.offsetWidth;
  var leftOffset = target.offsetLeft;
  var offsetInPercent = Math.round((leftOffset / maxWidth) * 100);

  if (target === leftRangeButton) {
    priceMin.textContent = offsetInPercent;
  } else if (target === rightRangeButton) {
    priceMax.textContent = offsetInPercent;
  }
};

var range = document.querySelector('.range');
var rightRangeButton = range.querySelector('.range__btn--right');
var leftRangeButton = range.querySelector('.range__btn--left');
var priceMin = range.querySelector('.range__price--min');
var priceMax = range.querySelector('.range__price--max');

rightRangeButton.addEventListener('mouseup', onRangeButtonMouseUp);
leftRangeButton.addEventListener('mouseup', onRangeButtonMouseUp);
